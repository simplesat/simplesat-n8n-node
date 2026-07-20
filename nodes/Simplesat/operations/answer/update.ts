import { IExecuteFunctions } from 'n8n-workflow';

export async function executeUpdate(this: IExecuteFunctions, i: number) {
	const answerId = this.getNodeParameter('updateAnswerId', i) as number;
	const choice = this.getNodeParameter('updateChoice', i) as string;
	const choices = this.getNodeParameter('updateChoices', i) as string;
	const comment = this.getNodeParameter('updateComment', i) as string;
	const followUpAnswer = this.getNodeParameter('updateFollowUpAnswer', i) as string;
	const followUpAnswerChoice = this.getNodeParameter('updateFollowUpAnswerChoice', i) as string;
	const followUpAnswerChoices = this.getNodeParameter('updateFollowUpAnswerChoices', i) as string;

	const body: {
		choice?: string;
		choices?: string[];
		comment?: string | null;
		follow_up_answer?: string | null;
		follow_up_answer_choice?: string | null;
		follow_up_answer_choices?: string[];
	} = {};

	if (choice) body.choice = choice;
	if (choices) body.choices = choices.split(',').map(value => value.trim()).filter(value => value);
	if (comment) body.comment = comment;
	if (followUpAnswer) body.follow_up_answer = followUpAnswer;
	if (followUpAnswerChoice) body.follow_up_answer_choice = followUpAnswerChoice;
	if (followUpAnswerChoices) {
		body.follow_up_answer_choices = followUpAnswerChoices
			.split(',')
			.map(value => value.trim())
			.filter(value => value);
	}

	return await this.helpers.httpRequestWithAuthentication.call(
		this,
		'simplesatApi',
		{
			method: 'PUT',
			url: `https://api.simplesat.io/api/v1/answers/${answerId}`,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		},
	);
}
