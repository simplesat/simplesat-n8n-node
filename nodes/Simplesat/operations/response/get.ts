import { IExecuteFunctions } from 'n8n-workflow';

export async function executeGet(this: IExecuteFunctions, i: number) {
	const responseId = this.getNodeParameter('responseId', i) as number;

	return await this.helpers.httpRequestWithAuthentication.call(
		this,
		'simplesatApi',
		{
			method: 'GET',
			url: `https://api.simplesat.io/api/v1/responses/${responseId}`,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
	);
}
