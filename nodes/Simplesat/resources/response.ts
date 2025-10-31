import { INodeProperties } from 'n8n-workflow';

export const responseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['response'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get response by ID',
				action: 'Get response by ID',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search responses',
				action: 'Search responses',
			},
		],
		default: 'get',
	},
	// Response Get parameters
	{
		displayName: 'Response ID',
		name: 'responseId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the response to retrieve',
	},
	// Response Search parameters
	{
		displayName: 'Created Start Date',
		name: 'createdStartDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Start date for created date range',
	},
	{
		displayName: 'Created End Date',
		name: 'createdEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'End date for created date range',
	},
	{
		displayName: 'Modified Start Date',
		name: 'modifiedStartDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Start date for modified date range',
	},
	{
		displayName: 'Modified End Date',
		name: 'modifiedEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'End date for modified date range',
	},
	{
		displayName: 'Operator',
		name: 'operator',
		type: 'options',
		options: [
			{
				name: 'And',
				value: 'and',
			},
			{
				name: 'Or',
				value: 'or',
			},
		],
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
			},
		},
		default: 'and',
		description: 'Logical operator for combining filters',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
			},
		},
		default: {},
		options: [
			{
				name: 'filter',
				displayName: 'Filter',
				values: [
					{
						displayName: 'Attribute',
						name: 'attribute',
						type: 'string',
						default: '',
						description: 'The attribute name to filter by',
						displayOptions: {
							show: {
								key: ['customer.attribute', 'ticket.attribute'],
							},
						},
					},
					{
						displayName: 'Comparison',
						name: 'comparison',
						type: 'options',
						options: [
							{
								name: 'Contains',
								value: 'contains',
							},
							{
								name: 'Does Not Contain',
								value: 'does_not_contain',
							},
							{
								name: 'Has Any Value',
								value: 'has_any_value',
							},
							{
								name: 'Is',
								value: 'is',
							},
							{
								name: 'Is Not',
								value: 'is_not',
							},
							{
								name: 'Is Unknown',
								value: 'is_unknown',
							},
						],
						default: 'is',
						description: 'The comparison operator',
					},
					{
						displayName: 'Key',
						name: 'key',
						type: 'options',
						options: [
							{
								name: 'Choice Value',
								value: 'choice_value',
							},
							{
								name: 'Collaborator',
								value: 'collaborator',
							},
							{
								name: 'Comment',
								value: 'comment',
							},
							{
								name: 'Company',
								value: 'company',
							},
							{
								name: 'Customer (Name)',
								value: 'customer',
							},
							{
								name: 'Customer Attribute',
								value: 'customer.attribute',
							},
							{
								name: 'Customer Email',
								value: 'customer.email',
							},
							{
								name: 'IP',
								value: 'ip',
							},
							{
								name: 'Metric',
								value: 'metric',
							},
							{
								name: 'Sentiment',
								value: 'sentiment',
							},
							{
								name: 'Source',
								value: 'source',
							},
							{
								name: 'Survey (Token)',
								value: 'survey',
							},
							{
								name: 'Tag',
								value: 'tag',
							},
							{
								name: 'Team Member (Name)',
								value: 'team_member',
							},
							{
								name: 'Team Member Email',
								value: 'team_member.email',
							},
							{
								name: 'Team Member ID (External ID)',
								value: 'team_member.id',
							},
							{
								name: 'Ticket Attribute',
								value: 'ticket.attribute',
							},
							{
								name: 'Ticket ID (External ID)',
								value: 'ticket_id',
							},
						],
						default: 'sentiment',
						description: 'The field to filter by',
					},
					{
						displayName: 'Sentiment',
						name: 'sentimentValue',
						type: 'options',
						options: [
							{
								name: 'Positive',
								value: 'positive',
							},
							{
								name: 'Neutral',
								value: 'neutral',
							},
							{
								name: 'Negative',
								value: 'negative',
							},
						],
						default: 'positive',
						displayOptions: {
							show: {
								key: ['sentiment'],
							},
						},
						description: 'Sentiment value to filter by',
					},
					{
						displayName: 'Survey Name or ID',
						name: 'surveyName',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getAllSurveysForSearch',
						},
						default: '',
						displayOptions: {
							show: {
								key: ['survey'],
							},
						},
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
					{
						displayName: 'Values',
						name: 'values',
						type: 'string',
						default: '',
						description: 'Comma-separated values to filter by',
						displayOptions: {
							hide: {
								key: ['sentiment', 'survey'],
							},
						},
					},
				],
			},
		],
		description: 'Filters to apply to the search',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['response'],
				operation: ['search'],
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
				resource: ['response'],
				operation: ['search'],
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
];
