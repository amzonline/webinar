/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
// import Apps from "@material-ui/icons/Apps";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
import Build from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";
import People from "@material-ui/icons/People";
import Assignment from "@material-ui/icons/Assignment";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Chat from "@material-ui/icons/Chat";
import Call from "@material-ui/icons/Call";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccountBalance from "@material-ui/icons/AccountBalance";
import ArtTrack from "@material-ui/icons/ArtTrack";
import ViewQuilt from "@material-ui/icons/ViewQuilt";
import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Store from "@material-ui/icons/Store";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Layers from "@material-ui/icons/Layers";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LineStyle from "@material-ui/icons/LineStyle";
import Error from "@material-ui/icons/Error";
import Typography from '@material-ui/core/Typography';

// core components
import { connect } from 'react-redux';
import { selectDownloadUrl, selectFeedbackUrl } from '../../core/redux/event.selectors';


import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit-pro/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  console.log('WebinarXHeaderLinks\' props' + JSON.stringify(props));
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor } = props;
  const classes = useStyles();
  
  return (    
    <List className={classes.list + " " + classes.mlAuto}>
      {/* <ListItem className={classes.listItem}>
        <Button
          href="https://aws.amazon.com/ko/"
          color="transparent"
          target="_blank"
          size="lg"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>unarchive</Icon> 
          <Typography variant="subtitle1" className={classes.title}>세션 소개</Typography>
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          href="https://aws.amazon.com/ko/"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>unarchive</Icon> 
          <Typography variant="subtitle1" className={classes.title}>발표자 소개</Typography>
        </Button>
      </ListItem> */}

      <ListItem className={classes.listItem}>
        <Button
          href={props.downloadUrl}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> 
          <Typography variant="subtitle1" className={classes.title}>발표자료 다운로드</Typography>
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          href={props.feedbackUrl}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>unarchive</Icon> 
          <Typography variant="subtitle1" className={classes.title}>설문조사</Typography>
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

const mapStateToProps = state => ({
  downloadUrl: selectDownloadUrl(state),
  feedbackUrl: selectFeedbackUrl(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);

