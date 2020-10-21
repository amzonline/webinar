import {
  container,
  title,
  main,
  whiteColor,
  grayColor,
  mainRaised,
  hexToRgb
} from "assets/jss/nextjs-material-kit-pro.js";
import footerStyle from "assets/jss/nextjs-material-kit-pro/pages/componentsSections/footerStyle.js";

const presentationStyle = {
  ...footerStyle,
  main: {
    ...main,
    /*overflow: "hidden"*/
    flexGrow: 1,
    height: "100vh"
  },
  sectionBlank: {
    height: "70px",
    display: "block"
  },
  mainRaised,
  parallax: {
    height: "220px",
    overflow: "hidden",
    backgroundPosition: "center top"
  },
  container: {
    ...container,
    zIndex: 1
  },
  title: {
    ...title,
    color: whiteColor
  },
  brand: {
    color: whiteColor,
    textAlign: "center",
    "& h1": {
      fontSize: "4.2rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative"
    }
  },
  videoPlayer: {
    height: "80vh"
  },
  comments: {
    height: "80vh"
  },
  gridRoot: {
    flexGrow: 1,
    height: "100vh"
  },
  paper: {
    padding: "2",
    textAlign: 'center',
    color: whiteColor,
  },
  proBadge: {
    position: "relative",
    fontSize: "22px",
    textTransform: "uppercase",
    fontWeight: "700",
    right: "-10px",
    padding: "10px 18px",
    top: "-30px",
    background: whiteColor,
    borderRadius: "3px",
    color: grayColor[18],
    lineHeight: "22px",
    boxShadow: "0 5px 5px -2px rgba(" + hexToRgb(grayColor[25]) + ",.4)"
  }
};

export default presentationStyle;