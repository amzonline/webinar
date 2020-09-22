/*eslint-disable*/
import React from "react";
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

import headersStyle from "assets/jss/nextjs-material-kit-pro/pages/sectionsSections/headersStyle.js";

import backgroundImage from "assets/img/summit-background.png";
import office2 from "assets/img/examples/office2.jpg";

const useStyles = makeStyles(headersStyle);

export default function LoginPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
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
                <div className={classes.textCenter}>
                  <Button simple color="primary" size="lg" href="/api/auth/signin">
                    시작하기
                  </Button>
                </div>
                {/* <form className={classes.form}>
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
                </form> */}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
