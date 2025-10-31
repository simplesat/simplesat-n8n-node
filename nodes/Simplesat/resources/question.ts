import { INodeProperties } from 'n8n-workflow';

export const questionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['question'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List questions',
				action: 'List questions',
			},
		],
		default: 'list',
	},
	// Question List parameters
	{
		displayName: 'Survey ID',
		name: 'surveyId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['question'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter questions by survey ID',
	},
	{
		displayName: 'Metric',
		name: 'metric',
		type: 'options',
		options: [
			{
				name: '5-Star',
				value: '5-star',
			},
			{
				name: 'CES',
				value: 'ces',
			},
			{
				name: 'CSAT',
				value: 'csat',
			},
			{
				name: 'Custom',
				value: 'custom',
			},
			{
				name: 'Not Set',
				value: '',
			},
			{
				name: 'NPS',
				value: 'nps',
			},
		],
		displayOptions: {
			show: {
				resource: ['question'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter questions by metric type',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['question'],
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
				resource: ['question'],
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
];

