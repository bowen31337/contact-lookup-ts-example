import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { ContactContext } from "./context";
import { MemoryRouter, Route } from "react-router-dom";

const initContextValue = {
  contacts: [],
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const render = (
  ui: ReactElement,
  { contextValue = {}, route = "/", ...renderOptions } = {}
) => {
  const Wrapper = ({ children }: { children: ReactElement }) => (
    <MemoryRouter initialEntries={[route]}>
      <ContactContext.Provider value={{ ...initContextValue, ...contextValue }}>
        {children}
      </ContactContext.Provider>
    </MemoryRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { render };
