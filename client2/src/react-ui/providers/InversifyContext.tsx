import { createContext } from "react";
import { Container } from "inversify";

export const InversifyContext = createContext<{
  container: Container | null;
}>({
  container: null,
});
