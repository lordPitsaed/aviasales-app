import { SearchId, TicketPack } from "./react-app-env";

class AviasalesService {
  private _baseUrl = `https://aviasales-test-api.kata.academy`;
  private async getResource(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = (await res.json()) as SearchId | TicketPack;
    return body;
  }

  async getTicketPack(searchId: string) {
    const res = (await this.getResource(
      `${this._baseUrl}/tickets?searchId=${searchId}`
    )) as TicketPack;
    return res;
  }

  async getSearchId() {
    const res = (await this.getResource(`${this._baseUrl}/search`)) as SearchId;
    return res.searchId;
  }
}

export default new AviasalesService();
