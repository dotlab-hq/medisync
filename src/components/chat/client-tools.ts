import { toolDefinition } from '@tanstack/ai'

/**
 * Client-side tool for getting the user's GPS location via the browser's
 * Geolocation API. This runs entirely in the browser — the execute function
 * is called by the TanStack AI chat client, not the server.
 */
export const getUserLocationDef = toolDefinition({
  name: 'get_user_location',
  description:
    "Get the user's current GPS location. Runs in the browser using the Geolocation API. Returns latitude, longitude and accuracy in metres. Use this before sending SOS emergency messages that need location data.",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      latitude: { type: 'number', description: 'Latitude in decimal degrees.' },
      longitude: {
        type: 'number',
        description: 'Longitude in decimal degrees.',
      },
      accuracy: { type: 'number', description: 'Accuracy in metres' },
    },
    required: ['latitude', 'longitude', 'accuracy'],
    additionalProperties: false,
  },
})

/**
 * Client-side tool instance with execution logic.
 * Pass this to `useChat({ tools: [getUserLocationTool] })`.
 */
export const getUserLocationTool = getUserLocationDef.client(
  () =>
    new Promise<{ latitude: number; longitude: number; accuracy: number }>(
      (resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser.'))
          return
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            })
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error('Location permission denied by user.'))
                break
              case error.POSITION_UNAVAILABLE:
                reject(new Error('Location information is unavailable.'))
                break
              case error.TIMEOUT:
                reject(new Error('Location request timed out.'))
                break
              default:
                reject(new Error('An unknown error occurred getting location.'))
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10_000,
            maximumAge: 60_000,
          },
        )
      },
    ),
)
