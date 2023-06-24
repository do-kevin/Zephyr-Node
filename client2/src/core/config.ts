import { injectable } from "inversify";

@injectable()
export class Config {
  apiURL: string;

  constructor() {
    this.apiURL = "/api";
  }
}
