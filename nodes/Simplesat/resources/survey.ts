import { INodeProperties } from 'n8n-workflow';

export const surveyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['survey'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List surveys',
				action: 'List surveys',
			},
			{
				name: 'Send by Email',
				value: 'sendByEmail',
				description: 'Send survey by email',
				action: 'Send survey by email',
			},
		],
		default: 'list',
	},
	// Survey List parameters
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['list'],
			},
		},
		default: true,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	// Survey Send by Email parameters
	{
		displayName: 'Survey Name or ID',
		name: 'surveyToken',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getEventBasedEmailSurveys',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Choose from the list. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Customer Email',
		name: 'customerEmail',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Email address of the customer',
	},
	{
		displayName: 'Customer Name',
		name: 'customerName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Full name of the customer',
	},
	{
		displayName: 'Customer Company',
		name: 'customerCompany',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Company associated with the customer',
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'External ID of the customer',
	},
	{
		displayName: 'Customer Custom Attributes',
		name: 'customerCustomAttributes',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '{}',
		description: 'Custom attributes for the customer (JSON object)',
	},
	{
		displayName: 'Team Member ID',
		name: 'teamMemberId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'External ID of the team member',
	},
	{
		displayName: 'Team Member Email',
		name: 'teamMemberEmail',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Email address of the team member',
	},
	{
		displayName: 'Team Member Name',
		name: 'teamMemberName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Full name of the team member',
	},
	{
		displayName: 'Team Member Custom Attributes',
		name: 'teamMemberCustomAttributes',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '{}',
		description: 'Custom attributes for the team member (JSON object)',
	},
	{
		displayName: 'Ticket ID',
		name: 'ticketId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'External ID of the ticket',
	},
	{
		displayName: 'Ticket Subject',
		name: 'ticketSubject',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '',
		description: 'Subject or title of the ticket',
	},
	{
		displayName: 'Ticket Custom Attributes',
		name: 'ticketCustomAttributes',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['sendByEmail'],
			},
		},
		default: '{}',
		description: 'Custom attributes for the ticket (JSON object)',
	},
];

