import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ContactDetail, SearchBar } from "./components";
import "./App.css";

const routes = [
  { path: "/", name: "Home", Component: SearchBar },
  { path: "/contact/:id", name: "ContactDetail", Component: ContactDetail },
];

function App(): JSX.Element {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, name, Component }) => (
            <Route
              key={name}
              path={path}
              element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3}}
                >
                  <Component />
                </motion.div>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
