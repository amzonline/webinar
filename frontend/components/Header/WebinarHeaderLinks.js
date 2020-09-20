/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/nextjs-material-kit-pro/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function WebinarHeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
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
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://aws.amazon.com/ko/"
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
          href="https://aws.amazon.com/ko/"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>unarchive</Icon> 
          <Typography variant="subtitle1" className={classes.title}>설문조사</Typography>
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
          <Typography variant="subtitle1" className={classes.title}>세션 설문</Typography>
        </Button>
      </ListItem>
    </List>
  );
}