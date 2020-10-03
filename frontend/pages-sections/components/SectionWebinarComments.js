import React, { Component, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

// @material-ui/icons
import Reply from "@material-ui/icons/Reply";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CommentMedia from "components/Media/CommentMedia.js";
import Media from "components/Media/Media.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import BoardService from "../../services/BoardService";
import axios from "axios";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../core/aws-exports';
Amplify.configure(awsconfig);

import { connect } from 'react-redux';
import { RegisterEventId } from '../../core/redux/event.action';
import { selectEventId } from '../../core/redux/event.selectors';



import sectionCommentsStyle from "assets/jss/nextjs-material-kit-pro/pages/blogPostSections/sectionCommentsStyle.js";

// const useStyles = makeStyles(sectionCommentsStyle);

const useStyles = makeStyles((sectionCommentsStyle) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: sectionCommentsStyle.spacing(0, 3),
  },
  listRoot: {
    width: '100%',
    backgroundColor: sectionCommentsStyle.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  paper: {
    width: '100%',
    margin: `${sectionCommentsStyle.spacing(1)}px auto`,
    padding: sectionCommentsStyle.spacing(2),
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));


function SectionWebinarComments(eventId) {
  const classes = useStyles();
  const router = useRouter();

  console.log("------------------------");
  const event_id = eventId.eventId.event_id;

  const dummy1 = [
    { uid: "a1", title: "dummy 1"},
    { uid: "a2", title: "dummy 2"}
  ];

  const dummy2 = [
    { uid: "a3", title: "dummy 3"},
    { uid: "a4", title: "dummy 4"}
  ];

  const [data, setData] = useState({list:[]});

  const [contents, setContents] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = data => {
    console.log(data);

    submitQuestion(data.content);
  };

  async function submitQuestion(content) {
    try {
      const session = await Auth.currentSession();
      if (session.isValid()) {
        console.log('token: ' + session.idToken.jwtToken);
        const idToken = session.idToken.jwtToken;

        if (content.length < 10) {
          alert("질문 길이가 너무 짧습니다.");
          return;
        }

        const response = await BoardService.insertItem(idToken, event_id, "-", content, "Y");
        setValue("content", "");
        loadBoards();
      } else {
        moveToLogin();
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      moveToLogin();
    }
  }

  function moveToLogin() {
    router.push("/webinar-login");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadBoards();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;

  //   let completed = false;
    
    loadBoards();
  
  //   return () => {
  //     completed = true;
  //   };
  }, []);
  // });

  async function loadBoards() {
    try {
      const response = await BoardService.getAll(event_id);
      console.log("****************** loadBoards called");
      console.log(response.data.list);
      setContents(response.data.list);
      console.log("******************");
      
    } catch (error) {
      console.log(error.message);
    }
  }  

  
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={8}>
          <div>
            <h3 className={classes.title}>질문 목록</h3>
            <List className={classes.listRoot}>
              {contents.map( item => (
                // <div key={item.uid}>{item.title}</div>


                <ListItem alignItems="flex-start" key={item.uid}>
                  <CommentMedia
                    avatar={'Q'}
                    title={
                      <span>
                        {item.content}
                      </span>                      
                    }
                    innerMedias={
                      item.reply && item.reply.map(comment => (
                        <CommentMedia
                          key={comment.reply_uid}
                          avatar={'A'}
                          body={
                            <span className={classes.color555}>
                              <p>
                              {comment.content}
                              </p>
                            </span>
                          }
                        />
                      ))
                    }
                  />
                </ListItem>

              ))}
            </List>
          </div>
          <h3 className={classes.title}>질문하기</h3>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CommentMedia
              avatar={'Q'}
              body={
                <CustomInput
                  labelText="질문을 남겨주세요..."
                  id="content"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "content",
                    inputRef: register(),
                    multiline: true,
                    rows: 3
                  }}
                />
              }
              footer={
                <Button color="primary" type="submit" round className={classes.footerButtons}>
                  작성하기
                </Button>
              }
            />
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}


const mapStateToProps = state => ({
  eventId: selectEventId(state),
});

const mapDispatchToProps = dispatch => ({
  RegisterEventId: eventId => dispatch(RegisterEventId(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionWebinarComments);
