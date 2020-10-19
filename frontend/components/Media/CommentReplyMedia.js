import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Avatar from '@material-ui/core/Avatar';

import mediaStyles from "assets/jss/nextjs-material-kit-pro/components/webinarXMediaStyle.js";

const useStyles = makeStyles(mediaStyles);

export default function CommentMedia(props) {
  const {
    avatarLink,
    avatar,
    avatarAlt,
    title,
    body,
    footer,
    innerMedias,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <div {...rest} className={classes.media}>
      <a href={avatarLink} className={classes.mediaLink}>
      <Avatar className={classes.small}>{avatar}</Avatar>
      </a>
      <div className={classes.mediaBody}>
        {title !== undefined ? (
          <h4 className={classes.mediaHeading}>{title}</h4>
        ) : null}
        {body}
        <div className={classes.mediaFooter}>{footer}</div>
        {innerMedias !== undefined
          ? innerMedias.map(prop => {
              return prop;
            })
          : null}
      </div>
    </div>
  );
}

CommentMedia.defaultProps = {
  avatarLink: "#pablo",
  avatarAlt: "..."
};

CommentMedia.propTypes = {
  avatarLink: PropTypes.string,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  innerMedias: PropTypes.arrayOf(PropTypes.object)
};
