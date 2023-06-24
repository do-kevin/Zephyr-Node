import { HttpGateway } from "src/core/http-gateway";
import { IocBase } from "./ioc-base";
import { Types } from "src/core/types";

export const container = new IocBase().init();

container.bind(Types.IDataGateway).to(HttpGateway);
