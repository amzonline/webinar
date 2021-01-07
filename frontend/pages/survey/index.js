import React, { Component, useEffect } from "react";
import Webinar from "pages/webinar";
import LoginPage from "pages/webinar-login";

import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../core/aws-exports";
Amplify.configure(awsExports);

export default function Survey({ data }) {
  React.useEffect(() => {
    checkSession();
  });

  async function checkSession() {
    try {
      const session = await Auth.currentSession();
      if (!session.isValid()) {
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

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    // TODO - lambda 호출해서 survey 관련 JSON 을 조회해 올 것... lambda endpoint 정보 관리는 어디서??
    const res = await fetch("https://tmuckaup10.execute-api.ap-northeast-2.amazonaws.com/Prod/survey/admin/2020_seoul_summit")
    const data = await res.json()
    console.log('survey data:' + JSON.stringify(data))
  
    // Pass data to the page via props
    return { props: { data } }
}