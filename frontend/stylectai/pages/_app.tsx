import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper, store } from "../store";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);