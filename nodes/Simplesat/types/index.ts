export interface FilterItem {
	key: string;
	values?: string;
	comparison: string;
	attribute?: string;
	sentimentValue?: string;
	surveyName?: string;
}

export interface FiltersCollection {
	filter?: FilterItem[];
}

export interface SimplesatResponse {
	responses?: unknown[];
	answers?: unknown[];
	next?: string | null;
}
