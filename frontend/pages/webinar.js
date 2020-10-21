/*eslint-disable*/
import React, { Component, useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/WebinarXStaticHeader.js";
import HeaderLinks from "components/Header/WebinarXHeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Favorite from "@material-ui/icons/Favorite";

import Footer from "components/Footer/WebinarXFooter.js";

import Player from "components/Video/IvsPlayerNew.js"

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../core/aws-exports';
Amplify.configure(awsconfig);

import BoardService from "../services/BoardService";

import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import SectionWebinarComments from "pages-sections/components/SectionWebinarXComments.js";

import presentationStyle from "assets/jss/nextjs-material-kit-pro/pages/webinarYStyle.js";

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
      <div className={classes.gridRoot}>
        <Grid container direction="row" justify="center" spacing={3} alignItems="stretch" alignContent="stretch" >
          <Grid item xs={12}>
            <Header
              brand="AWS"
              links={<HeaderLinks dropdownHoverColor="info" />}
              color="dark"
            />
          </Grid>
          <Grid item xs={9} className={classes.videoPlayer}>
            <Player />
          </Grid>
          <Grid item xs={3} className={classes.comments}>
              <SectionWebinarComments />
          </Grid>
          <Grid item xs={12}>
            <Footer
              theme="transparent"
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
          </Grid>
        </Grid>

      </div>
    
    </>
  );
}

const mapStateToProps = state => ({
  eventName: selectEventName(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Webinar);