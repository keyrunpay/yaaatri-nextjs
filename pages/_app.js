// import "typeface-poppins";
// import "typeface-montserrat";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import GlobalStyle from "../src/core/globals/style.global";
import NavBar from "../src/core/ui/NavBar";
import Footer from "../src/core/ui/Footer";
import "antd/dist/antd.css";
import "../src/core/globals/ckEditor.css";
import "../src/core/globals/slider.css";
import store from "../src/redux/store";
import useLogin from "../src/core/hooks/useLogin";

function MyApp({ Component, pageProps }) {
  const { setToReduxFromLS } = useLogin();

  React.useEffect(() => {
    setToReduxFromLS();
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Head>
        <title>Travellers Social Network</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Provider store={store}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </React.Fragment>
  );
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
