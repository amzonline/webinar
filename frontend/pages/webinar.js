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
import WebinarFooter from "components/Footer/WebinarFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import Player from "components/Video/IvsPlayer.js"

// sections for this page
import SectionDescription from "pages-sections/presentation-page/SectionDescription.js";
import SectionComponents from "pages-sections/presentation-page/SectionComponents.js";
import SectionCards from "pages-sections/presentation-page/SectionCards.js";
import SectionContent from "pages-sections/presentation-page/SectionContent.js";
import SectionSections from "pages-sections/presentation-page/SectionSections.js";
import SectionExamples from "pages-sections/presentation-page/SectionExamples.js";
import SectionFreeDemo from "pages-sections/presentation-page/SectionFreeDemo.js";
import SectionOverview from "pages-sections/presentation-page/SectionOverview.js";
import SectionPricing from "pages-sections/presentation-page/SectionPricing.js";

import SectionBoard from "pages-sections/components/SectionBoard.js";
import SectionWebinarComments from "pages-sections/components/SectionWebinarComments.js";

import presentationStyle from "assets/jss/nextjs-material-kit-pro/pages/webinarXStyle.js";

const useStyles = makeStyles(presentationStyle);

export default function PresentationPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="AWS"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
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
  );
}
