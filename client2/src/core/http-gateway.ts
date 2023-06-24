import { inject, injectable } from "inversify";
import { Config } from "./config";

@injectable()
export class HttpGateway {
  @inject(Config) config!: Config;

  get = async (path: string) => {
    const response = await fetch(this.config.apiURL + path);
    return response;
  };
}
