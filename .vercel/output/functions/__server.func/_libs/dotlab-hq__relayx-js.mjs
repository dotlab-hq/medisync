var DEFAULT_ENDPOINT = "https://relayx.wpsadi.dev/api/send-sms";
var RelayX = class {
  apiKey;
  endpoint;
  /**
   * Create a new RelayX client.
   *
   * @param apiKey  Your RelayX API key. Omit to fall back to the
   *                `RELAYX_API_KEY` environment variable.
   * @param options Optional configuration.
   */
  constructor(apiKey, options) {
    const resolvedKey = apiKey ?? process.env["RELAYX_API_KEY"];
    if (!resolvedKey) {
      throw new Error(
        "RelayX: API key is required. Pass it as the first argument or set the RELAYX_API_KEY environment variable."
      );
    }
    this.apiKey = resolvedKey;
    this.endpoint = options?.endpoint ?? DEFAULT_ENDPOINT;
  }
  /**
   * Send an SMS message.
   *
   * @param params  `phoneNumber` (with country code) and `message`.
   * @returns       The API response.
   * @throws        On network errors or non-2xx HTTP responses.
   */
  async sendSMS(params) {
    const { phoneNumber, message } = params;
    if (!phoneNumber || typeof phoneNumber !== "string") {
      throw new TypeError(
        "RelayX: `phoneNumber` must be a non-empty string with a country code."
      );
    }
    if (!message || typeof message !== "string") {
      throw new TypeError("RelayX: `message` must be a non-empty string.");
    }
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey
      },
      body: JSON.stringify({ phoneNumber, message })
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "(empty)");
      throw new Error(`RelayX: API error ${response.status} – ${body}`);
    }
    return await response.json();
  }
};
export {
  RelayX as R
};
