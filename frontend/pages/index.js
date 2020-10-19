import React, { Component, useEffect } from "react";
import { useRouter } from 'next/router';
// import { signIn, signOut, useSession } from 'next-auth/client'
// import { Header } from 'components/Header/WebinarXHeader'
// import Header from "components/Header/WebinarXHeader.js";
import Webinar from "pages/webinar";
import LoginPage from "pages/webinar-login";
// import SignIn from "pages/auth/signin";

import Amplify, { Auth } from "aws-amplify";
import awsExports from "../core/aws-exports";
Amplify.configure(awsExports);


export default function Page() {
  const router = useRouter();
  // const [ session, loading ] = useSession();

  React.useEffect(() => {
    checkSession();
  });

  function moveToLogin() {
    router.push("/webinar-login");
  }

  async function checkSession() {
    try {
      const session = await Auth.currentSession();
      if (session.isValid()) {
        console.log('token: ' + session.accessToken.jwtToken);
        router.push("/webinar");
      } else {
        moveToLogin();
      }
    } catch (error) {
      console.log(error.message);
      moveToLogin();
    }
    
  }

  return <>
    Loading...
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
