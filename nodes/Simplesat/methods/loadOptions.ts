import {
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

export async function getEventBasedEmailSurveys(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const credentials = await this.getCredentials('simplesatApi');
		
		if (!credentials) {
			return [];
		}

		// Fetch all surveys (max 1000)
		const responseData = await this.helpers.httpRequest({
			method: 'GET',
			url: 'https://api.simplesat.io/api/v1/surveys?page_size=1000',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Simplesat-Token': credentials.apiToken as string,
			},
		});

		const surveys = responseData?.surveys || [];
		
		// Filter for event-based surveys and map to options
		return surveys
			.filter((survey: { id: number; name: string; survey_token: string; survey_type: string }) => 
				survey.survey_type === 'event_based_email'
			)
			.map((survey: { id: number; name: string; survey_token: string }) => ({
				name: survey.name,
				value: survey.survey_token,
			}));

	} catch {
		// Return empty array on error
		return [];
	}
}

export async function getAllSurveysForSearch(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const credentials = await this.getCredentials('simplesatApi');
		
		if (!credentials) {
			return [];
		}

		// Fetch all surveys (max 1000)
		const responseData = await this.helpers.httpRequest({
			method: 'GET',
			url: 'https://api.simplesat.io/api/v1/surveys?page_size=1000',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Simplesat-Token': credentials.apiToken as string,
			},
		});

		const surveys = responseData?.surveys || [];

		return surveys.map((survey: { id: number; name: string; survey_token: string }) => ({
			name: survey.name,
			value: survey.survey_token,
		}));

	} catch {
		// Return empty array on error
		return [];
	}
}
