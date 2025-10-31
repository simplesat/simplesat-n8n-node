import { IExecuteFunctions } from 'n8n-workflow';
import { FilterItem, FiltersCollection, SimplesatResponse } from '../../types';

export async function executeSearch(this: IExecuteFunctions, i: number) {
	const createdStartDate = this.getNodeParameter('createdStartDate', i) as string;
	const createdEndDate = this.getNodeParameter('createdEndDate', i) as string;
	const modifiedStartDate = this.getNodeParameter('modifiedStartDate', i) as string;
	const modifiedEndDate = this.getNodeParameter('modifiedEndDate', i) as string;
	const operator = this.getNodeParameter('operator', i) as string;
	const filters = this.getNodeParameter('filters', i) as FiltersCollection;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const pageSize = returnAll ? 250 : Math.min(limit || 250, 250);

	const body: {
		created_start_date?: string;
		created_end_date?: string;
		modified_start_date?: string;
		modified_end_date?: string;
		operator: string;
		filters: Array<{
			key: string;
			values: string[];
			comparison: string;
		}>;
	} = {
		operator: operator,
		filters: [],
	};

	if (createdStartDate) body.created_start_date = createdStartDate;
	if (createdEndDate) body.created_end_date = createdEndDate;
	if (modifiedStartDate) body.modified_start_date = modifiedStartDate;
	if (modifiedEndDate) body.modified_end_date = modifiedEndDate;

	// Process filters
	if (filters && filters.filter && Array.isArray(filters.filter)) {
		body.filters = filters.filter.map((filter: FilterItem) => {
			let values: string[] = [];
			
			if (filter.key === 'sentiment' && filter.sentimentValue) {
				values = [filter.sentimentValue];
			} else if (filter.key === 'survey' && filter.surveyName) {
				values = [filter.surveyName];
			} else if (filter.values) {
				values = filter.values.split(',').map((v: string) => v.trim());
			}
			
			const filterObj: {
				key: string;
				values: string[];
				comparison: string;
				attribute?: string;
			} = {
				key: filter.key,
				values: values,
				comparison: filter.comparison,
			};
			
			// Include attribute field for customer.attribute and ticket.attribute keys
			if ((filter.key === 'customer.attribute' || filter.key === 'ticket.attribute') && filter.attribute) {
				filterObj.attribute = filter.attribute;
			}
			
			return filterObj;
		});
	}

	if (returnAll) {
		// Fetch all results using the 'next' URL from Simplesat API
		const allResults: unknown[] = [];
		let nextUrl: string | null = 'https://api.simplesat.io/api/v1/responses/search';

		while (nextUrl) {
			const response: SimplesatResponse = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'simplesatApi',
				{
					method: 'POST',
					url: nextUrl,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body,
				qs: nextUrl === 'https://api.simplesat.io/api/v1/responses/search' ? {
					page_size: pageSize,
					page: 1,
				} : undefined,
				},
			);

			if (response.responses && Array.isArray(response.responses)) {
				allResults.push(...response.responses);
			}

			// Get next URL from response
			nextUrl = response.next || null;
		}

		return { responses: allResults };
	} else {
		// Fetch only the specified limit
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'simplesatApi',
			{
				method: 'POST',
				url: 'https://api.simplesat.io/api/v1/responses/search',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body,
				qs: {
					page_size: pageSize,
					page: 1,
				},
			},
		);
	}
}
