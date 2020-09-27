/*eslint-disable*/
import React, { useState, useRef, createRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
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

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../core/aws-exports';
Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

import md5 from "md5";


import headersStyle from "assets/jss/nextjs-material-kit-pro/pages/sectionsSections/headersStyle.js";

// import { providers, signIn } from 'next-auth/client'

import backgroundImage from "assets/img/summit-background.png";
import office2 from "assets/img/examples/office2.jpg";

const useStyles = makeStyles(headersStyle);

function makeTempPassword(key) {
  return '!DUMMY@' + md5(key);
}

export default function LoginPage() {
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const { register, handleSubmit, watch, errors } = useForm();

  async function cognitoSignIn(email) {
    try {
      const cognitoUser = await Auth.signIn(email.replace(/[@.]/g, '|'), makeTempPassword(email));

      const session = cognitoUser.getSignInUserSession();
      console.log("!!! accessToken: " + session.getAccessToken().getJwtToken());
      console.log("!!! idToken: " + session.getIdToken().getJwtToken());
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
              <h1 className={classes.title}>AWS Builders Livestream</h1>
              <h4>
                AWS를 빠르게 시작하는 방법
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
                        placeholder: "Email...",
                        type: "email",
                        name: "email",
                        inputRef: register(),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor}  />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button type="submit" simple color="primary" size="lg">
                      시작하기
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
