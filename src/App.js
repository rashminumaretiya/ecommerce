import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./presentation/Auth/Auth";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import store from "./store";

const Home = lazy(() => import("./presentation/Home"));
const About = lazy(() => import("./presentation/About"));
const NotFound = lazy(() => import("./presentation/NotFound"));
const Login = lazy(() => import("./presentation/Auth/login"));
const Layout = lazy(() => import("./presentation/Layout"));
const Cart = lazy(() => import("./presentation/Cart"));
const Category = lazy(() => import("./presentation/Category"));

const routes = [
  {
    path: "/",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/about",
    element: (
      <Auth>
        <About />
      </Auth>
    ),
  },
  {
    path: "/login",
    element: (
      <Auth>
        <Login />
      </Auth>
    ),
  },
  {
    path: "/cart",
    element: (
      <Auth>
        <Cart />
      </Auth>
    ),
  },
  {
    path: "/category",
    element: (
      <Auth>
        <Category />
      </Auth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => {
  return (
    <Suspense fallback="loading...">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {routes.map((data, i) => (
                <Route key={i} path={data.path} element={data.element}></Route>
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
};

export default App;
