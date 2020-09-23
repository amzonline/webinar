import React, { Component, useEffect } from "react";
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
// import { Header } from 'components/Header/WebinarXHeader'
// import Header from "components/Header/WebinarXHeader.js";
import Webinar from "pages/webinar";
import LoginPage from "pages/webinar-login";
// import SignIn from "pages/auth/signin";

export default function Page() {
  const router = useRouter();
  const [ session, loading ] = useSession();

  return <>
    {session && <Webinar />}
    {!session && <LoginPage  />}
  </>
}


// export default class Index extends Component {
//   componentDidMount = () => {
//     Router.push("/webinar");
//     // Router.push("/webinar-login");
//   };

//   render() {
//     return <div />;
//   }
// }
