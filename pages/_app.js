// import "typeface-poppins";
// import "typeface-montserrat";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import GlobalStyle from "../core/globals/style.global";
import NavBar from "../core/ui/NavBar";
import Footer from "../core/ui/Footer";
import useLogin from "../core/hooks/useLogin";
import "antd/dist/antd.css";
import "../styles/ckEditor.css";
import "../styles/slider.css";

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
