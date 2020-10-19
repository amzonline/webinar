/*eslint-disable*/
import React from "react";
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

import loginPageStyle from "assets/jss/nextjs-material-kit-pro/pages/loginPageStyle.js";

import image from "assets/img/summit-background.png";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>로그인</h4>

                  </CardHeader>
                  <CardBody signup>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Email...",
                        type: "email",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button simple color="primary" size="lg">
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
