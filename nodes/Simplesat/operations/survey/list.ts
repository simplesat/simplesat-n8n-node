import { IExecuteFunctions } from 'n8n-workflow';

export async function executeList(this: IExecuteFunctions, i: number) {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const pageSize = returnAll ? 250 : Math.min(limit || 250, 250);

	if (returnAll) {
		// Fetch all results using pagination
		const allResults: unknown[] = [];
		let page = 1;
		let hasMore = true;

		while (hasMore) {
			const qs = {
				page_size: pageSize,
				page: page,
			};

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'simplesatApi',
				{
					method: 'GET',
					url: 'https://api.simplesat.io/api/v1/surveys',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs,
				},
			);

			if (response.surveys && Array.isArray(response.surveys)) {
				allResults.push(...response.surveys);
				hasMore = response.surveys.length === pageSize;
			} else {
				hasMore = false;
			}
			page++;
		}

		return { surveys: allResults };
	} else {
		// Fetch only the specified limit
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'simplesatApi',
			{
				method: 'GET',
				url: 'https://api.simplesat.io/api/v1/surveys',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				qs: {
					page_size: pageSize,
					page: 1,
				},
			},
		);
	}
}
