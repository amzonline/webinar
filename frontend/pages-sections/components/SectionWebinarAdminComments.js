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
import { selectEventNo } from '../../core/redux/event.selectors';
import Quote from "components/Typography/Quote.js";


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
    maxHeight: 400,
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


function SectionWebinarAdminComments(props) {
  const classes = useStyles();
  const router = useRouter();

  const defaultReply = {"uid": "", "content": "질문을 선택해주세요.."};

  const eventId = props.eventNo;

  const [data, setData] = useState({list:[]});

  const [contents, setContents] = useState([]);
  const [reply, setReply] = useState(defaultReply);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = data => {
    console.log(data);
    console.log(data.content + "<- " + data.content.length);

    if (reply.uid === "") {
      alert("질문을 선택해주세요.");
    } else if (data.content.length < 5) {
      alert("답변을 좀 더 길게 달아주세요.");
    } else {
      submitReply(data.content);
    }
    
  };

  async function submitReply(content) {
    try {
      const session = await Auth.currentSession();
      if (session.isValid()) {
        console.log('token: ' + session.idToken.jwtToken);
        const idToken = session.idToken.jwtToken;

        setValue("content", "");
        
        const response = await BoardService.insertReply(idToken, eventId, reply.uid, content);        
        setReply(defaultReply);
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
    router.push("/login/" + eventId);
  }

  useEffect(() => {
    loadBoards();

    const interval = setInterval(() => {
      loadBoards();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  async function loadBoards() {
    try {
      const response = await BoardService.getAll(eventId);
      console.log("****************** loadBoards called");
      console.log(response.data.list);
      setContents(response.data.list);
      
    } catch (error) {
      console.log(error.message);
    }
  }

  function selectQuestion(uid, content) {
    setReply({"uid": uid, "content": content});
  }

  
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={8}>
          <div>
            <h3 className={classes.title}>질문 목록</h3>
            <List className={classes.listRoot}>
              {contents.map( item => (
                <ListItem alignItems="flex-start" key={item.uid}>
                  <CommentMedia
                    avatar={'Q'}
                    title={
                      <span>
                        {item.content}
                      </span>                      
                    }
                    footer={
                      <div>
                        <Tooltip
                          id="tooltip-tina"
                          title="Reply to comment"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button
                            color="primary"
                            simple
                            className={classes.footerButtons}
                            onClick={() => { selectQuestion(item.uid, item.content) }}
                          >
                            <Reply className={classes.footerIcons} /> Reply
                          </Button>
                        </Tooltip>
                      </div>
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
          
          <hr/>

          <h3 className={classes.title}>답변하기</h3>
          <Quote
            author={reply.content}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <CommentMedia
              avatar={'A'}
              body={
                <CustomInput
                  labelText="답변을 남겨주세요..."
                  id="content"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "content",
                    inputRef: register(),
                    multiline: true,
                    rows: 6
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
  eventNo: selectEventNo(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SectionWebinarAdminComments);
