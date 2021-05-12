import "typeface-poppins";
import "typeface-montserrat";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import GlobalStyle from "../core/globals/style.global";
import NavBar from "../core/ui/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Head>
        <title>Yaaatri | Travellers Social Network</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
