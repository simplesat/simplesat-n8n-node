import { IExecuteFunctions } from 'n8n-workflow';

export async function executeCreateOrUpdate(this: IExecuteFunctions, i: number) {
	const email = this.getNodeParameter('email', i) as string;
	const name = this.getNodeParameter('name', i) as string;
	const company = this.getNodeParameter('company', i) as string;
	const externalId = this.getNodeParameter('externalId', i) as string;
	const tags = this.getNodeParameter('tags', i) as string;
	const customAttributes = this.getNodeParameter('customAttributes', i) as string;

	const body: {
		email: string;
		name?: string;
		company?: string;
		external_id?: string;
		tags?: string[];
		custom_attributes?: Record<string, unknown>;
	} = {
		email: email,
	};

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
			method: 'POST',
			url: 'https://api.simplesat.io/api/v1/customers',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		},
	);
}
