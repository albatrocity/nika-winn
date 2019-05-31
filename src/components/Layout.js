import React from "react";
import { Grommet, Box } from "grommet";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Header from "../components/Header";
import theme from "../lib/theme";

const Layout = ({ children }) => {
  return (
    <Grommet theme={theme}>
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content="#fff" />
      </Helmet>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Grommet>
  );
};

export default Layout;
