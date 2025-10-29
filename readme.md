# Getting Started

## Installation

Install the Scrptly package from npm:

```bash
npm install scrptly
# or using yarn
yarn add scrptly
```

## Authentication
Before you can interact with the Scrptly API, you need to configure your API key. Call `Scrptly.setApiSettings()` once at the top of your script:
```javascript
import Scrptly from 'scrptly';

Scrptly.setApiSettings({
  apiKey: 'YOUR_API_KEY_HERE',        // ← Replace with your real key
});
```
You can get your API key from the [Scrptly account page](https://scrptly.com/account) after signing up.  
Make sure you guard your API key (e.g. via environment variables) and rotate it if it ever gets exposed.

## Available APIs
Scrptly provides several APIs to interact with different services:
- **[AI Video-Agent API](/api/agent)**: Create entire videos using natural language prompts.
- **[MCP API](/api/mcp)**: Connect Scrptly with your prefered LLM via the MCP interface
- **[Video Development Kit API](/api/vdk)**: Programmatically create and customize videos using code.
