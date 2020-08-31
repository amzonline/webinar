/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://aws.amazon.com/"
                className={classes.block}
                target="_blank"
              >
                Amazon Web Services Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://aws.amazon.com/privacy"
                className={classes.block}
                target="_blank"
              >
                Privacy Policy
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://aws.amazon.com/terms/"
                className={classes.block}
                target="_blank"
              >
                Site Terms
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; 2020, Amazon Web Services, Inc. or its Affiliates. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
