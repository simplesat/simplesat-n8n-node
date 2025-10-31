# Simplesat's n8n node

This is an n8n community node. It lets you connect to the Simplesat API in your n8n workflows to manage surveys, responses, answers, customers, and team members.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Usage](#usage)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Surveys

- **List** - Retrieve all surveys with pagination
- **Send by Email** - Send a survey to a customer via email with optional team member and ticket information

### Questions

- **List** - Get questions with filtering by survey ID and metric type (NPS, CSAT, 5-Star, CES, Custom)

### Responses

- **Get** - Retrieve a specific response by ID
- **Search** - Advanced search with date ranges, filters, and pagination

### Answers

- **Get** - Retrieve a specific answer by ID
- **Search** - Advanced search with date ranges, filters, and pagination

### Customers

- **List** - Get customers with date filtering and subscription status
- **Get** - Retrieve a specific customer by ID
- **Create or Update** - Create new customers or update existing ones

### Team Members

- **Get** - Retrieve a specific team member by ID
- **Create or Update** - Create new team members or update existing ones

## Credentials

To use this node, you need a Simplesat account with an API key:

1. Log into your Simplesat account
2. Navigate to [Workspace Settings](https://app.simplesat.io/settings/workspace/)
3. Copy your API key
4. Use the API key in the Simplesat API credentials in n8n

The node uses the `X-Simplesat-Token` header for authentication.

## Usage

For detailed usage information, API endpoints, and examples, please refer to the [Simplesat API documentation](https://developer.simplesat.io/api).

## Resources

- [Simplesat n8n help guide](https://help.simplesat.io/en/articles/12679403-simplesat-s-n8n-community-node)
- [Simplesat API Documentation](https://developer.simplesat.io/api)
- [Simplesat Website](https://simplesat.io/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
