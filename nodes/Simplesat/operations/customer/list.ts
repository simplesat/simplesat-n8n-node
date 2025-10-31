import { IExecuteFunctions } from 'n8n-workflow';

export async function executeList(this: IExecuteFunctions, i: number) {
	const createdAfter = this.getNodeParameter('createdAfter', i) as string;
	const createdBefore = this.getNodeParameter('createdBefore', i) as string;
	const modifiedAfter = this.getNodeParameter('modifiedAfter', i) as string;
	const modifiedBefore = this.getNodeParameter('modifiedBefore', i) as string;
	const subscribed = this.getNodeParameter('subscribed', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const pageSize = returnAll ? 250 : Math.min(limit || 250, 250);

	const baseQs: {
		created_after?: string;
		created_before?: string;
		modified_after?: string;
		modified_before?: string;
		subscribed?: string;
	} = {};

	if (createdAfter) baseQs.created_after = createdAfter;
	if (createdBefore) baseQs.created_before = createdBefore;
	if (modifiedAfter) baseQs.modified_after = modifiedAfter;
	if (modifiedBefore) baseQs.modified_before = modifiedBefore;
	if (subscribed) baseQs.subscribed = subscribed;

	if (returnAll) {
		// Fetch all results using pagination
		const allResults: unknown[] = [];
		let page = 1;
		let hasMore = true;

		while (hasMore) {
			const qs = {
				...baseQs,
				page_size: pageSize,
				page: page,
			};

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'simplesatApi',
				{
					method: 'GET',
					url: 'https://api.simplesat.io/api/v1/customers',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs,
				},
			);

			if (response.customers && Array.isArray(response.customers)) {
				allResults.push(...response.customers);
				hasMore = response.customers.length === pageSize;
			} else {
				hasMore = false;
			}
			page++;
		}

		return { customers: allResults };
	} else {
		// Fetch only the specified limit
		const qs = {
			...baseQs,
			page_size: pageSize,
			page: 1,
		};

		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'simplesatApi',
			{
				method: 'GET',
				url: 'https://api.simplesat.io/api/v1/customers',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				qs,
			},
		);
	}
}
