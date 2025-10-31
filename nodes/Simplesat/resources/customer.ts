import { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List customers',
				action: 'List customers',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get customer by ID',
				action: 'Get customer by ID',
			},
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				description: 'Create or update customer by email',
				action: 'Create or update customer by email',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update customer by ID',
				action: 'Update customer by ID',
			},
		],
		default: 'list',
	},
	// Customer List parameters
	{
		displayName: 'Created After',
		name: 'createdAfter',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter customers created after this date',
	},
	{
		displayName: 'Created Before',
		name: 'createdBefore',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter customers created before this date',
	},
	{
		displayName: 'Modified After',
		name: 'modifiedAfter',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter customers modified after this date',
	},
	{
		displayName: 'Modified Before',
		name: 'modifiedBefore',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter customers modified before this date',
	},
	{
		displayName: 'Subscribed',
		name: 'subscribed',
		type: 'options',
		options: [
			{
				name: 'Not Set',
				value: '',
			},
			{
				name: 'False',
				value: 'false',
			},
			{
				name: 'True',
				value: 'true',
			},
		],
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter customers by subscription status',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
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
	// Customer Get parameters
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the customer to retrieve',
	},
	// Customer Create or Update parameters
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'The ID of the customer',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'Email address of the customer',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'Full name of the customer',
	},
	{
		displayName: 'Company',
		name: 'company',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'Company associated with the customer',
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'External ID of the customer from your system',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '',
		description: 'Comma-separated list of tags for the customer',
	},
	{
		displayName: 'Custom Attributes',
		name: 'customAttributes',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createOrUpdate'],
			},
		},
		default: '{}',
		description: 'Custom attributes for the customer (JSON object)',
	},
	// Customer Update parameters
	{
		displayName: 'Customer ID',
		name: 'updateCustomerId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the customer to update',
	},
	{
		displayName: 'Name',
		name: 'updateName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Full name of the customer',
	},
	{
		displayName: 'Company',
		name: 'updateCompany',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Company name of the customer',
	},
	{
		displayName: 'External ID',
		name: 'updateExternalId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'External ID of the customer from your system',
	},
	{
		displayName: 'Tags',
		name: 'updateTags',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Comma-separated list of tags for the customer',
	},
	{
		displayName: 'Custom Attributes',
		name: 'updateCustomAttributes',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		default: '{}',
		description: 'Custom attributes for the customer (JSON object)',
	},
];
