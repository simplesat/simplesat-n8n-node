import { IExecuteFunctions } from 'n8n-workflow';

export async function executeSendByEmail(this: IExecuteFunctions, i: number) {
	const surveyToken = this.getNodeParameter('surveyToken', i) as string;
	const customerEmail = this.getNodeParameter('customerEmail', i) as string;
	const customerName = this.getNodeParameter('customerName', i) as string;
	const customerCompany = this.getNodeParameter('customerCompany', i) as string;
	const customerId = this.getNodeParameter('customerId', i) as string;
	const customerCustomAttributes = this.getNodeParameter('customerCustomAttributes', i) as string;
	const teamMemberId = this.getNodeParameter('teamMemberId', i) as string;
	const teamMemberEmail = this.getNodeParameter('teamMemberEmail', i) as string;
	const teamMemberName = this.getNodeParameter('teamMemberName', i) as string;
	const teamMemberCustomAttributes = this.getNodeParameter('teamMemberCustomAttributes', i) as string;
	const ticketId = this.getNodeParameter('ticketId', i) as string;
	const ticketSubject = this.getNodeParameter('ticketSubject', i) as string;
	const ticketCustomAttributes = this.getNodeParameter('ticketCustomAttributes', i) as string;

	const body: {
		customer: {
			email: string;
			name?: string;
			company?: string;
			id?: string;
			custom_attributes?: Record<string, unknown>;
		};
		team_member?: {
			id?: string;
			email?: string;
			name?: string;
			custom_attributes?: Record<string, unknown>;
		};
		ticket?: {
			id?: string;
			subject?: string;
			custom_attributes?: Record<string, unknown>;
		};
	} = {
		customer: {
			email: customerEmail,
		},
	};

	// Add customer fields
	if (customerName) body.customer.name = customerName;
	if (customerCompany) body.customer.company = customerCompany;
	if (customerId) body.customer.id = customerId;
	if (customerCustomAttributes && customerCustomAttributes !== '{}') {
		try {
			body.customer.custom_attributes = JSON.parse(customerCustomAttributes);
		} catch {
			// If JSON parsing fails, ignore custom attributes
		}
	}

	// Add team member if any fields are provided
	if (teamMemberId || teamMemberEmail || teamMemberName || (teamMemberCustomAttributes && teamMemberCustomAttributes !== '{}')) {
		body.team_member = {};
		if (teamMemberId) body.team_member.id = teamMemberId;
		if (teamMemberEmail) body.team_member.email = teamMemberEmail;
		if (teamMemberName) body.team_member.name = teamMemberName;
		if (teamMemberCustomAttributes && teamMemberCustomAttributes !== '{}') {
			try {
				body.team_member.custom_attributes = JSON.parse(teamMemberCustomAttributes);
			} catch {
				// If JSON parsing fails, ignore custom attributes
			}
		}
	}

	// Add ticket if any fields are provided
	if (ticketId || ticketSubject || (ticketCustomAttributes && ticketCustomAttributes !== '{}')) {
		body.ticket = {};
		if (ticketId) body.ticket.id = ticketId;
		if (ticketSubject) body.ticket.subject = ticketSubject;
		if (ticketCustomAttributes && ticketCustomAttributes !== '{}') {
			try {
				body.ticket.custom_attributes = JSON.parse(ticketCustomAttributes);
			} catch {
				// If JSON parsing fails, ignore custom attributes
			}
		}
	}

	return await this.helpers.httpRequestWithAuthentication.call(
		this,
		'simplesatApi',
		{
			method: 'POST',
			url: `https://api.simplesat.io/api/v1/surveys/${surveyToken}/email`,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		},
	);
}
