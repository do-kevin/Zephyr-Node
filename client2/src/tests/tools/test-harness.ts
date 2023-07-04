import { Types } from "src/core/types";
import { IocBase } from "src/inversion-of-control/ioc-base";
import { HttpGateway } from "src/core/http-gateway";

export class TestHarness {
  container: any;
  dataGateway: any;

  init() {
    this.container = new IocBase().init();
    this.container.bind(Types.IDataGateway).to(HttpGateway).inSingletonScope();
  }
}
