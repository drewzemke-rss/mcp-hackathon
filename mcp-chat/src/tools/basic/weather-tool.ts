import { jsonSchema, type Tool } from 'ai';
import { getWeather } from '../utils/get-weather.js';

// This is an example of a tool for an LLM that is not provided via MCP.

export const weatherTool: Tool = {
  // informs the LLM what the tool should be used for
  description: 'Get current weather for a location',

  // specifies what information (in this case, trip source and destination) need to be provided
  // by the LLM when it calls this tool.
  parameters: jsonSchema({
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The location to get weather for (city, region, country)',
      },
    },
    required: ['location'],
  }),

  // this is the function that runs when the LLM decides to call the tool.
  // the string it returns will be fed into the LLM's context
  execute: async (input) => {
    const weatherData = await getWeather(input.location);
    return weatherData;
  },
};
