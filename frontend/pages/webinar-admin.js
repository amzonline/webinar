/*eslint-disable*/
import React, { Component, useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/WebinarXHeader.js";
import HeaderLinks from "components/Header/WebinarXHeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";


import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../core/aws-exports';
Amplify.configure(awsconfig);

import SectionWebinarAdminComments from "pages-sections/components/SectionWebinarAdminComments.js";

import presentationStyle from "assets/jss/nextjs-material-kit-pro/pages/webinarXStyle.js";

import { useRouter } from 'next/router';


const useStyles = makeStyles(presentationStyle);

function Webinar(props) {
  const classes = useStyles();
  const router = useRouter();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    
  });
  
  return (
    <>
      <div>
        <Header
          brand="AWS"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 100,
            color: "dark"
          }}
        />
        <Parallax
          image={require("assets/img/builders-bg.png")}
          className={classes.parallax}
        >

        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          {/* <Player /> */}
          <SnackbarContent
            message={
                <span>
                  <b>참여자의 질문에 실시간 답변이 가능합니다.</b> 
                </span>
            }
            color="warning"
            icon="info_outline"
          />
          <SectionWebinarAdminComments/>
        </div>
        <Footer
          theme="white"
          content={
            <div>
              <div className={classes.left}>
                <a
                  href="https://aws.amazon.com/"
                  target="_blank"
                  className={classes.footerBrand}
                >
                  Amazon Web Services
                </a>
              </div>
              <div className={classes.rightLinks}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://aws.amazon.com/"
                      target="_blank"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://aws.amazon.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://aws.amazon.com/"
                      target="_blank"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
            </div>
          }
        />
      </div>
    
    </>
  );
}


export default Webinar;