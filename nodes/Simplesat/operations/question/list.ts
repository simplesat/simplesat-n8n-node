import { IExecuteFunctions } from 'n8n-workflow';

export async function executeList(this: IExecuteFunctions, i: number) {
	const surveyId = this.getNodeParameter('surveyId', i) as number;
	const metric = this.getNodeParameter('metric', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const pageSize = returnAll ? 250 : Math.min(limit || 250, 250);

	const baseQs: {
		survey_id?: number;
		metric?: string;
	} = {};

	if (surveyId) baseQs.survey_id = surveyId;
	if (metric) baseQs.metric = metric;

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
					url: 'https://api.simplesat.io/api/v1/questions',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs,
				},
			);

			if (response.questions && Array.isArray(response.questions)) {
				allResults.push(...response.questions);
				hasMore = response.questions.length === pageSize;
			} else {
				hasMore = false;
			}
			page++;
		}

		return { questions: allResults };
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
				url: 'https://api.simplesat.io/api/v1/questions',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				qs,
			},
		);
	}
}
