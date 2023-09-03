import { version } from "./package.json";
import { Forms } from "./react/forms";

const baseUrl = process.env.FORMBASED_BASE_URL || "https://api.formbased.io";
const userAgent = process.env.FORMBASED_USER_AGENT || `formbased:${version}`;

export class Formbased {
  private readonly headers: Headers;

  readonly forms = new Forms(this);

  constructor(readonly apiKey?: string) {
    if (!apiKey) {
      this.apiKey = process.env.FORMBASED_API_KEY;

      if (!this.apiKey) {
        throw new Error("API key is required");
      }
    }

    this.headers = new Headers({
      Authorization: `Bearer ${this.apiKey}`,
      "User-Agent": userAgent,
      "Content-Type": "application/json",
    });
  }

  async fetchRequest(path: string, options = {}) {
    const response = await fetch(`${baseUrl}${path}`, options);

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    return await response.json();
  }

  async post<T>(path: string, body?: any, options = {}): Promise<T> {
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
      ...options,
    };

    return await this.fetchRequest(path, requestOptions);
  }

  async get<T>(path: string, options = {}): Promise<T> {
    const requestOptions = {
      method: "GET",
      headers: this.headers,
      ...options,
    };

    return await this.fetchRequest(path, requestOptions);
  }
}
