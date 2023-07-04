import { useContext } from "react";
import { interfaces } from "inversify";
import { InversifyContext } from "./InversifyContext";

export const withInjection = (identifiers: {
  [key: string]: interfaces.ServiceIdentifier<unknown>;
}) => {
  return (Component: any) => {
    return (props: any) => {
      const { container } = useContext(InversifyContext);

      if (!container) {
        throw new Error();
      }

      const finalProps = { ...props };

      for (const [key, value] of Object.entries(identifiers)) {
        finalProps[key] = container.get(value);
      }

      return <Component {...finalProps} />;
    };
  };
};
