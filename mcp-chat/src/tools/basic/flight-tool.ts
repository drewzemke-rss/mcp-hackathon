import { jsonSchema, type Tool } from 'ai';

export const bookFlightTool: [string, Tool] = [
  'book-flight',
  {
    description: 'Book a flight between two locations',

    parameters: jsonSchema({
      type: 'object',
      properties: {
        source: { type: 'string', description: 'The departure location' },
        destination: { type: 'string', description: 'The arrival location' },
      },
      required: ['source', 'destination'],
    }),

    execute: async (input) => {
      const { source, destination } = input;
      const flightDetails = `Flight booked from ${source} to ${destination}.`;

      // NOTE: in an actual implementation you'd hit some API here!

      return flightDetails;
    },
  },
];
