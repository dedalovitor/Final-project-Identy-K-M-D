import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import injectContext from "./store/appContext";
import { Register } from "./pages/register";
import { Regionregister } from "./pages/regionregister";
import { Regionlogin } from "./pages/regionlogin";
import { Profileuserregion } from "./pages/profileuserregion";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Search } from "./component/search";
import { CardRegion } from "./component/cardregion";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Regionregister />} path="/regionregister" />
            <Route element={<Regionlogin />} path="/regionlogin" />
            <Route element={<Profileuserregion />} path="/profileuserregion" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Footer />} path="/" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
