import { IExecuteFunctions } from 'n8n-workflow';

export async function executeUpdate(this: IExecuteFunctions, i: number) {
	const customerId = this.getNodeParameter('updateCustomerId', i) as number;
	const name = this.getNodeParameter('updateName', i) as string;
	const company = this.getNodeParameter('updateCompany', i) as string;
	const externalId = this.getNodeParameter('updateExternalId', i) as string;
	const tags = this.getNodeParameter('updateTags', i) as string;
	const customAttributes = this.getNodeParameter('updateCustomAttributes', i) as string;

	const body: {
		name?: string;
		company?: string;
		external_id?: string;
		tags?: string[];
		custom_attributes?: Record<string, unknown>;
	} = {};

	if (name) body.name = name;
	if (company) body.company = company;
	if (externalId) body.external_id = externalId;
	if (tags) body.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
	
	if (customAttributes && customAttributes !== '{}') {
		try {
			body.custom_attributes = JSON.parse(customAttributes);
		} catch {
			// Ignore invalid JSON
		}
	}

	return await this.helpers.httpRequestWithAuthentication.call(
		this,
		'simplesatApi',
		{
			method: 'PUT',
			url: `https://api.simplesat.io/api/v1/customers/${customerId}`,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		},
	);
}
