import { INodeProperties } from 'n8n-workflow';

export const answerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['answer'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get answer by ID',
				action: 'Get answer by ID',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search answers',
				action: 'Search answers',
			},
		],
		default: 'get',
	},
	// Answer Get parameters
	{
		displayName: 'Answer ID',
		name: 'answerId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the answer to retrieve',
	},
	// Answer Search parameters
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Start date for the search range',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'End date for the search range',
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
				resource: ['answer'],
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
				resource: ['answer'],
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
								name: 'Comment',
								value: 'comment',
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
								name: 'Survey (Token)',
								value: 'survey',
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
				resource: ['answer'],
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
				resource: ['answer'],
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
