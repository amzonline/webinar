/*eslint-disable*/
import React from "react";
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

import { ProtectRoute } from "contexts/auth"

import SectionWebinarComments from "pages-sections/components/SectionWebinarComments.js";

import presentationStyle from "assets/jss/nextjs-material-kit-pro/pages/webinarXStyle.js";

import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles(presentationStyle);

function Webinar() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

  });
  
  const classes = useStyles();
  const [ session, loading ] = useSession();
  const router = useRouter();

  return (
    <>
    {session && <>
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
      </>}
    </>
  );
}

export default Webinar
