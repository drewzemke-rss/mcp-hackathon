import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// util function for the weather tools
export async function getWeather(location: string) {
  if (!location) {
    throw new Error('Location is required');
  }

  // encode the location properly for URL
  const encodedLocation = encodeURIComponent(location);

  try {
    // use curl to fetch weather data from wttr.in
    const { stdout } = await execAsync(
      `curl -s "wttr.in/${encodedLocation}?format=%l:+%C+%t+%h+%w&m"`,
    );

    return `Weather for ${location}:\n${stdout.trim()}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch weather data: ${errorMessage}`);
  }
}
