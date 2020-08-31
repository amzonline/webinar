import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import WebinarHeader from "components/Header/WebinarHeader.js";
import WebinarHeaderLinks from "components/Header/WebinarHeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import SectionBoard from "pages-sections/Components-Sections/SectionBoard.js";

import ReactPlayer from 'react-player/youtube'

import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <WebinarHeader
        brand="AWS"
        rightLinks={<WebinarHeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/builders-bg.png")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>AWS Builders Livestream</h1>
                <h3 className={classes.subtitle}>
                  AWS를 빠르게 시작하는 방법
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.playerWrapper}>
          <ReactPlayer 
            className={classes.reactPlayer} width='100%' height='100%' loop='true' playing='true'
            url='https://www.youtube.com/watch?v=OdzaTbaQwTg' 
          />
        </div>
        <SectionBoard/>
        {/* <Container maxWidth="xl">          
        </Container> */}
        {/* <GridItem md={12} className={classes.textCenter}>
          <Link href="/login">
            <a className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Login Page
              </Button>
            </a>
          </Link>
        </GridItem> */}
      </div>
      <Footer />
    </div>
  );
}
