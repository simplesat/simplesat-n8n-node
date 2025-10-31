import { INodeProperties } from 'n8n-workflow';

export const teamMemberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['teamMember'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get team member by ID',
				action: 'Get team member by ID',
			},
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				description: 'Create or update team member',
				action: 'Create or update team member',
			},
		],
		default: 'get',
	},
	// Team Member Get parameters
	{
		displayName: 'Team Member ID',
		name: 'teamMemberId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['teamMember'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the team member to retrieve',
	},
	// Team Member Create or Update parameters
	{
		displayName: 'Team Member ID',
		name: 'teamMemberId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['teamMember'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'The ID of the team member',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['teamMember'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'Email address of the team member',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['teamMember'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'Full name of the team member',
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['teamMember'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'External ID of the team member from your system',
	},
	{
		displayName: 'Custom Attributes',
		name: 'customAttributes',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['teamMember'],
				operation: ['createOrUpdate'],
			},
		},
		default: '{}',
		description: 'Custom attributes for the team member (JSON object)',
	},
];
