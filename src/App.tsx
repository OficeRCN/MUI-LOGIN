import { BrowserRouter, Routes, Route } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./config/Config";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuthStore } from "./store/auth";

export default function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map((item, index) => {
            return (
              <Route key={index} path={item.path} element={item.element} />
            );
          })}
          {/* Private routes */}
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            {privateRoutes.map((item, index) => {
              return (
                <Route key={index} path={item.path} element={item.element} />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
