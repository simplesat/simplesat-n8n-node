import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
} from 'n8n-workflow';

// Import resource definitions
import { surveyOperations } from './resources/survey';
import { questionOperations } from './resources/question';
import { responseOperations } from './resources/response';
import { answerOperations } from './resources/answer';
import { customerOperations } from './resources/customer';
import { teamMemberOperations } from './resources/teamMember';

// Import methods
import { getEventBasedEmailSurveys, getAllSurveysForSearch } from './methods/loadOptions';

// Import operations
import { executeList as executeSurveyList } from './operations/survey/list';
import { executeSendByEmail } from './operations/survey/sendByEmail';
import { executeList as executeQuestionList } from './operations/question/list';
import { executeGet as executeResponseGet } from './operations/response/get';
import { executeSearch as executeResponseSearch } from './operations/response/search';
import { executeGet as executeAnswerGet } from './operations/answer/get';
import { executeSearch as executeAnswerSearch } from './operations/answer/search';
import { executeList as executeCustomerList } from './operations/customer/list';
import { executeGet as executeCustomerGet } from './operations/customer/get';
import { executeCreateOrUpdate as executeCustomerCreateOrUpdate } from './operations/customer/createOrUpdate';
import { executeUpdate as executeCustomerUpdate } from './operations/customer/update';
import { executeGet as executeTeamMemberGet } from './operations/teamMember/get';
import { executeCreateOrUpdate as executeTeamMemberCreateOrUpdate } from './operations/teamMember/createOrUpdate';

export class Simplesat implements INodeType {
	usableAsTool = true;
	description: INodeTypeDescription = {
		displayName: 'Simplesat',
		name: 'simplesat',
		icon: 'file:../../icons/simplesat.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Connect to Simplesat API',
		defaults: {
			name: 'Simplesat',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'simplesatApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Answer',
						value: 'answer',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Question',
						value: 'question',
					},
					{
						name: 'Response',
						value: 'response',
					},
					{
						name: 'Survey',
						value: 'survey',
					},
					{
						name: 'Team Member',
						value: 'teamMember',
					},
				],
				default: 'survey',
			},
			// Import all resource operations
			...surveyOperations,
			...questionOperations,
			...responseOperations,
			...answerOperations,
			...customerOperations,
			...teamMemberOperations,
		],
		usableAsTool: true,
	};

	methods = {
		loadOptions: {
			getEventBasedEmailSurveys,
			getAllSurveysForSearch,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operationMap: Record<string, Record<string, (this: IExecuteFunctions, i: number) => Promise<unknown>>> = {
			survey: {
				list: executeSurveyList,
				sendByEmail: executeSendByEmail,
			},
			question: {
				list: executeQuestionList,
			},
			response: {
				get: executeResponseGet,
				search: executeResponseSearch,
			},
			answer: {
				get: executeAnswerGet,
				search: executeAnswerSearch,
			},
			customer: {
				list: executeCustomerList,
				get: executeCustomerGet,
				createOrUpdate: executeCustomerCreateOrUpdate,
				update: executeCustomerUpdate,
			},
			teamMember: {
				get: executeTeamMemberGet,
				createOrUpdate: executeTeamMemberCreateOrUpdate,
			},
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				const operationHandler = operationMap[resource]?.[operation];
				if (!operationHandler) {
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${resource}.${operation}`);
				}

				const responseData = await operationHandler.call(this, i);

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map(item => ({ json: item })));
				} else if (responseData !== undefined && responseData !== null) {
					returnData.push({ json: responseData as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
