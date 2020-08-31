import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionBoard() {
  return (
    <GridItem md={12}>
      <Typography>Board Area</Typography>
    </GridItem>
  );
}