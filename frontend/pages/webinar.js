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

import Player from "components/Video/IvsPlayer.js"

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../core/aws-exports';
Amplify.configure(awsconfig);

import BoardService from "../services/BoardService";

import SectionWebinarComments from "pages-sections/components/SectionWebinarComments.js";

import presentationStyle from "assets/jss/nextjs-material-kit-pro/pages/webinarXStyle.js";

import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { selectEventName, selectEventPlaybackUrl } from '../core/redux/event.selectors';


const useStyles = makeStyles(presentationStyle);

function Webinar(props) {
  const classes = useStyles();
  const router = useRouter();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    
    console.log(props.eventName);
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
            height: 200,
            color: "dark"
          }}
        />
        <Parallax
          image={require("assets/img/builders-bg.png")}
          className={classes.parallax}
        >

        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <Player />
          <SectionWebinarComments/>
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

const mapStateToProps = state => ({
  eventName: selectEventName(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Webinar);