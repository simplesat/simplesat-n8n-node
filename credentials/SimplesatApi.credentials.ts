import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	Icon,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class SimplesatApi implements ICredentialType {
	name = 'simplesatApi';
	displayName = 'Simplesat API';
	icon: Icon = 'file:../icons/simplesat.svg';
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.simplesat.io',
			url: '/api/v1/surveys',
			method: 'GET',
		},
	};
	documentationUrl = 'https://developer.simplesat.io/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Simplesat-Token': '={{$credentials.apiToken}}',
			},
		},
	};
}