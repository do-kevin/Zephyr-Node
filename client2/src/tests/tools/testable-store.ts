// import { Config } from "src/core/config";
import { FakeHttpGateway } from "src/core/fake-http-gateway";
import { HttpGateway } from "src/core/http-gateway";
import createStore from "src/core/store";

export let store: any = null;

export const initStore = async (
  httpGateway:
    | InstanceType<typeof HttpGateway>
    | InstanceType<typeof FakeHttpGateway>
) => {
  // const config = new Config();
  // const httpGateway = new HttpGateway(config);

  store = createStore(httpGateway);
};

export const dispatch = async (func: unknown) => {
  await store.dispatch(func);
};

export const select = (func: any) => {
  return func(store.getState());
};
