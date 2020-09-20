import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

import profile4 from "assets/img/faces/card-profile4-square.jpg";
import profile1 from "assets/img/faces/card-profile1-square.jpg";
import profile6 from "assets/img/faces/card-profile6-square.jpg";

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

const notice = `AWS Marketplace는 AWS에서 실행되는 소프트웨어를 쉽게 검색, 테스트, 구매 및 배포할 수 있도록 수천 개의 Independent Software Vendor(ISV) 소프트웨어 제품 목록을 제공하는 디지털 카탈로그입니다.`;
const comment = `Apache Kafka API를 사용하여 Apache Kafka에서 데이터를 가져오거나 내보낼 수 있습니까?`;


export default function SectionWebinarComments() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={8}>
          <div>
            <h3 className={classes.title}>질문 목록</h3>
            <List className={classes.listRoot}>
              <ListItem alignItems="flex-start">
                <CommentMedia
                  avatar={'Q'}
                  title={
                    <span>
                      Amazon Interactive Video Service란 무엇입니까?
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
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>
    
                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>
                    </div>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <CommentMedia
                  avatar={'Q'}
                  title={
                    <span>
                      Amazon Interactive Video Service는 누가 사용할 수 있습니까?
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
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>
    
                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>
                    </div>
                  }
                  innerMedias={[
                    <CommentMedia
                      key={Date.now()}
                      avatar={'A'}
                      body={
                        <span className={classes.color555}>
                          <p>
                          Amazon Interactive Video Service는 스트리밍 인프라에 대한 투자 없이 라이브 동영상을 추가하고 앱 또는 사이트에서 동영상을 통한 상호 작용을 활성화하려는 개발자를 위해 설계되었습니다. 동영상 전문 지식이 없는 개발자도 단순한 API 세트를 사용하여 투표, 설문 및 기타 라이브 동영상 오버레이와 같은 기능을 동기화할 수 있으므로 대화형 동영상 경험을 생성하는 데 집중할 수 있습니다. 예를 들어 라이브 퀴즈 또는 라이브 소매 앱을 만드는 개발자는 API를 사용하여 동영상 스트림에서 동일한 질문을 동시에 최종 사용자에게 보여줄 수 있습니다.
                          </p>
                        </span>
                      }
                    />
                  ]}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <CommentMedia
                  avatar={'Q'}
                  title={
                    <span>
                      Amazon Interactive Video Service는 Twitch 및 다른 라이브 스트리밍 플랫폼과 주로 어떤 점이 다릅니까?
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
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>
    
                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>
                    </div>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <CommentMedia
                  avatar={'Q'}
                  title={
                    <span>
                      Amazon Interactive Video Service와 AWS Elemental 미디어 서비스 또는 Amazon CloudFront의 차이점은 무엇입니까?
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
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>
    
                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>
                    </div>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <CommentMedia
                  avatar={'Q'}
                  title={
                    <span>
                      Amazon Interactive Video Service와 Kinesis Video Streams의 차이점은 무엇입니까?
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
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>
    
                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>
                    </div>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <CommentMedia
                  avatar={'Q'}
                  title={
                    <span>
                      Amazon Interactive Video Service의 사용 요금은 얼마입니까?
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
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>
    
                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>
                    </div>
                  }
                />
              </ListItem>
            </List>
          </div>
          <h3 className={classes.title}>질문하기</h3>
          <CommentMedia
            avatar={'Q'}
            body={
              <CustomInput
                labelText="질문을 남겨주세요..."
                id="nice"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 3
                }}
              />
            }
            footer={
              <Button color="primary" round className={classes.footerButtons}>
                작성하기
              </Button>
            }
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
