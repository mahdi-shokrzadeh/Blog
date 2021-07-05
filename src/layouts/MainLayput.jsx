import React, { Fragment } from "react";
import  LoadingBar  from "react-redux-loading-bar";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const MainLayout = (props) => {
  return (
    <Fragment>
      <Header />
      <LoadingBar style={{backgroundColor:"lime" , height:"3px"}}/>
      <main id="home-page">
        <div className="container">{props.children}</div>
      </main>

      <Footer />
    </Fragment>
  );
};

export default MainLayout;
