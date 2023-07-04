import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class Config {
  apiURL: string;

  constructor() {
    this.apiURL = "/api";
  }
}
