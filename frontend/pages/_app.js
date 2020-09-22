import React from "react";
import { Provider } from 'next-auth/client'

// import ReactDOM from "react-dom";
// import App from "next/app";
// import Head from "next/head";
// import Router from "next/router";

// import PageChange from "components/PageChange/PageChange.js";

import "assets/scss/nextjs-material-kit-pro.scss?v=1.1.0";


// import "assets/css/react-demo.css";

// import "animate.css/animate.min.css";

// Router.events.on("routeChangeStart", url => {
//   console.log(`Loading: ${url}`);
//   document.body.classList.add("body-page-transition");
//   ReactDOM.render(
//     <PageChange path={url} />,
//     document.getElementById("page-transition")
//   );
// });
// Router.events.on("routeChangeComplete", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
// Router.events.on("routeChangeError", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });

// export default class MyApp extends App {
//   static async getInitialProps({ Component, router, ctx }) {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return { pageProps };
//   }
//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <React.Fragment>
//         <Head>
//           <title>AWS Webinar-X</title>
//         </Head>
//         <Component {...pageProps} />
//       </React.Fragment>
//     );
//   }
// }

// export default class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props
//     return (
//         <Component {...pageProps} />
      
//     )
//   }
// }

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

