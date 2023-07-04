import { Config } from "./config";

export class HttpGateway {
  private config: InstanceType<typeof Config>;

  get = async (path: string) => {
    const response = await fetch(this.config.apiURL + path);
    return response;
  };

  constructor(config: InstanceType<typeof Config>) {
    this.config = config;
  }
}
