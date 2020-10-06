/*eslint-disable*/
import React, { useState, useEffect, createRef } from "react";
import { useRouter } from 'next/router'

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import AccountBox from "@material-ui/icons/AccountBox";
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useForm } from "react-hook-form";

import { connect } from 'react-redux';
import { registerEventMeta } from '../../core/redux/event.action';
import { selectEventName } from '../../core/redux/event.selectors';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../core/aws-exports';
Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

import md5 from "md5";


import headersStyle from "assets/jss/nextjs-material-kit-pro/pages/sectionsSections/headersStyle.js";

// import { providers, signIn } from 'next-auth/client'

import AdminService from "../../services/AdminService";

import backgroundImage from "assets/img/summit-background.png";
import office2 from "assets/img/examples/office2.jpg";

const useStyles = makeStyles(headersStyle);

function makeTempPassword(key) {
  return '!DUMMY@' + md5(key);
}

const LoginPage = ({ registerEventMeta }) => {

  const router = useRouter()
  const { eventid } = router.query;
  const { register, handleSubmit, setValue } = useForm();
  const [ eventName, setEventName ] = useState("Checking...") ;

  const dev = process.env.NODE_ENV !== 'production';
  
  // async function checkSession() {
  //   try {
  //     const session = await Auth.currentSession();
  //     if (session.isValid()) {
  //       console.log('token: ' + session.accessToken.jwtToken);
  //       accessToken = session.accessToken.jwtToken;
  //       setToken(accessToken);
  //     } else {
  //       moveToLogin();
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     moveToLogin();
  //   }
  // }


  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    getEventMeta();
  }, [eventid]);

  async function getEventMeta() {
    //TODO: change code to Provider
    let eventData;
    if(!dev) {
      const response = await AdminService.getEventMeta(eventid);
      eventData = response.data.message;
      console.log(response.data.message);
    } else {
      const dummy = {
        "message": {
              "eventNo": 7,
              "eventName": "[10/08] 새로운 웨비나 플랫폼 소개",
              "type": "L",
              "status": "READY",
              "siteOpen": "1",
              "needAuth": "0",
              "startDate": "2020-10-08 15:00:00",
              "endDate": "2020-10-08 17:00:00",
              "maxCapacity": 100,
              "obsUrl": "2",
              "playbackKey": "3",
              "playbackUrl": "https://0b377682ced3.us-west-2.playback.live-video.net/api/video/v1/us-west-2.223427183593.channel.wiHiuxdpsmEf.m3u8"
          }
      };
      eventData = dummy.message;
    }

    setEventName(eventData.eventName);
    registerEventMeta(eventData);

  }

  async function cognitoSignIn(email) {
    try {
      const cognitoUser = await Auth.signIn(email.replace(/[@.]/g, '|'), makeTempPassword(email));

      const session = cognitoUser.getSignInUserSession();
      // console.log("!!! accessToken: " + session.getAccessToken().getJwtToken());
      // console.log("!!! idToken: " + session.getIdToken().getJwtToken());
      
      router.push('/webinar');

    } catch (error) {
      console.log('error signing in', error);

      if (error.code === "UserNotConfirmedException") {
        alert('관리자에게 이용 승인을 요청하세요...');
      } else {
        alert('!!!! ' + error.message);
      }
    }

  }
  
  async function cognitoSignUp(email) {
    try {
      
      const params = {
        username: email.replace(/[@.]/g, '|'),
        password: makeTempPassword(email),
        attributes: {
            email: email
        },
        validationData: []
      };

      const data = await Auth.signUp(params);
      // const cognitoUser = await Auth.signIn("sjkim|amazon|com", "Tjdwls23@#");
      // const cognitoUser = await Auth.currentAuthenticatedUser();
      console.log('signed in: ' + data);
      console.log('signed in.........');
      // try login after signup
      cognitoSignIn(email);
    } catch (error) {
        console.log('error signing Un', error);

        if (error.code === "UsernameExistsException") {
          cognitoSignIn(email);
        } else {
          alert('!!!! ' + error.message);
        }
    }
  }

  const onSubmit = data => {
    console.log(data);

    //TODO: anonymous signup is not a good choice
    cognitoSignUp(data.email);
  };
  
  const [email, setEmail] = useState();
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  
  return (
    <div>
      <div
          className={classes.pageHeader}
          style={{ backgroundImage: `url("${office2}")` }}
        >
        <div className={classes.conatinerHeader2}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={10}
              md={10}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>{eventName}</h1>
              <h4>
                powered by <b>AWS Webinar-X</b>
              </h4>
            </GridItem>
            <GridItem
              xs={12}
              sm={4}
              md={4}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              <Card>
                {/* <div className={classes.textCenter}>
                  <Button simple color="primary" size="lg" onClick={signIn}>
                    시작하기
                  </Button>
                  
                </div> */}

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <CardBody signup>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "이메일을 입력해주세요...",
                        type: "email",
                        name: "email",
                        inputRef: register(),
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBox className={classes.inputIconsColor}  />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button type="submit" simple color="primary" size="lg">
                      참여하기
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  registerEventMeta: eventMeta => dispatch(registerEventMeta(eventMeta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);