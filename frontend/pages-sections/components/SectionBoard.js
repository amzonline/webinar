import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


import styles from "assets/jss/nextjs-material-kit-pro/pages/componentsSections/basicsStyle.js";

// const useStyles = makeStyles(styles);

const useStyles = makeStyles((styles) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: styles.spacing(0, 3),
  },
  listRoot: {
    width: '100%',
    maxWidth: 660,
    backgroundColor: styles.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  paper: {
    maxWidth: 600,
    margin: `${styles.spacing(1)}px auto`,
    padding: styles.spacing(2),
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

// https://material-ui.com/components/grid/
// https://material-ui.com/components/grid/#nested-grid

const notice = `AWS Marketplace는 AWS에서 실행되는 소프트웨어를 쉽게 검색, 테스트, 구매 및 배포할 수 있도록 수천 개의 Independent Software Vendor(ISV) 소프트웨어 제품 목록을 제공하는 디지털 카탈로그입니다.`;

const comment = `Apache Kafka API를 사용하여 Apache Kafka에서 데이터를 가져오거나 내보낼 수 있습니까?`;


export default function SectionBoard() {
  
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <List className={classes.listRoot}>
            <ListItem alignItems="flex-start">
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs zeroMinWidth>
                    <Typography>{notice}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ListItem>
            
          </List>
        </Grid>

        
        <Grid item xs={12} sm={6}>
          <List className={classes.listRoot}>
            <ListItem alignItems="flex-start">
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>W</Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography>{comment}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ListItem>
            <ListItem alignItems="flex-start">
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>W</Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography>{comment}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ListItem>
            <ListItem alignItems="flex-start">
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>W</Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography>{comment}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ListItem>
            
          </List>
        </Grid>

      </Grid>
    </div>
  );
}


