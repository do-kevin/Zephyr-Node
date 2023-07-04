import { Container } from "inversify";
import { InversifyContext } from "./InversifyContext";

interface ProviderProps {
  children?: any;
  container: Container | null;
}

export const Provider = (props: ProviderProps) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  );
};
