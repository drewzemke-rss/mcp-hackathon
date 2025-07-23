import { jsonSchema, type Tool } from 'ai';

// EXERCISE 1B: Fill this in!

export const fileWriteTool: Tool = {
  // informs the LLM what the tool should be used for
  description: '???',

  // specifies what information need to be provided by the LLM when it calls this tool.
  parameters: jsonSchema({
    type: 'object',
    properties: {
      // stuff goes here!
    },
    required: [''],
  }),

  // this is the function that runs when the LLM decides to call the tool.
  // the string it returns will be fed into the LLM's context
  execute: async (_input) => {
    return '???';
  },
};
