import React, { useContext } from "react";
import { Container, interfaces } from "inversify";

const InversifyContext = React.createContext<{ container: Container | null }>({
  container: null,
});

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

// eslint-disable-next-line react-refresh/only-export-components
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
