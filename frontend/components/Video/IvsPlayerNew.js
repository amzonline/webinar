import React, {useEffect, useRef} from 'react';
import * as config from '../../ivsconfig';
import AdminService from "../../services/AdminService";
import LoggingService from "../../services/LoggingService";
import publicIp from 'public-ip';
import { Auth } from 'aws-amplify';
import moment from 'moment';


import { connect } from 'react-redux';
import { selectEventId, selectEventName, selectEventPlaybackUrl } from '../../core/redux/event.selectors';

// Styles
import './IvsPlayerNew.css';

function IvsPlayer(props) {
    // const maxMetaData = 10;
    // const metaData = [];
    let eventStatus = "-";
    let player = null;

    const playbackUrl = props.eventPlaybackUrl;
    const eventId = props.eventId;
    var myPublicIp = "";
    var userId = "";

    async function sendUserLog() {
        try {
            // const timestamp = sysdate.format('{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}');
            const timestamp = moment().format('YYYY-MM-DD hh:mm:ss');
            // console.log('timestamp : ' + timestamp);
            const response = await LoggingService.sendUserLog(
                eventId, userId, 'IvsPlayer', timestamp, myPublicIp);
        
        } catch (error) {
            console.log(error.message);
        }
    } 

    async function loadUserData() {
        try {
            myPublicIp = await publicIp.v4();

            const userInfo = await Auth.currentUserInfo();
            // console.log(userInfo);
            // console.log(userInfo.username);
            // console.log(userInfo.attributes.sub);
            userId = "" + userInfo.attributes.sub + "+" + userInfo.username;

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        loadUserData();
        const interval = setInterval(() => {
            sendUserLog();
        }, 10000);
        return () => clearInterval(interval);
      }, []);

  function loadStandByVideo() {
    player.load(config.STAND_BY_PLAYBACK_URL);
    player.setVolume(0.5);
  }

  function loadVideo() {
    player.load(props.eventPlaybackUrl);
    player.setVolume(1.0);
  }

  async function checkVideoStatus() {
    const response = await AdminService.getEventStatus(props.eventId);
    // console.log(response);
    const status = response.data.message.status;
    console.log("status: " + status + " eventStatus: " + eventStatus);
    // console.log("status: " + status);
    if (status === "START" && eventStatus !== "START") {
        loadVideo();
    } else if (status === "END" && eventStatus === "START") {
        loadStandByVideo();
    } else if (status === "READY" && eventStatus === "-") {
        loadStandByVideo();
    }
    eventStatus = status;
  }

  function videoStatusChecker() {
    const interval = setInterval(() => {
        checkVideoStatus();
      }, 3000);
      return () => clearInterval(interval);
  }


  useEffect(() => {
    const mediaPlayerScript = document.createElement("script");
    mediaPlayerScript.src = "https://player.live-video.net/1.0.0/amazon-ivs-player.min.js";
    mediaPlayerScript.async = true;
    mediaPlayerScript.onload = () => mediaPlayerScriptLoaded();
    document.body.appendChild(mediaPlayerScript);
  }, [])

  function mediaPlayerScriptLoaded() {
    // This shows how to include the Amazon IVS Player with a script tag from our CDN
    // If self hosting, you may not be able to use the create() method since it requires
    // that file names do not change and are all hosted from the same directory.

    const MediaPlayerPackage = window.IVSPlayer;

    // First, check if the browser supports the Amazon IVS player.
    if (!MediaPlayerPackage.isPlayerSupported) {
        console.warn("The current browser does not support the Amazon IVS player.");
        return;
    }

    const PlayerState = MediaPlayerPackage.PlayerState;
    const PlayerEventType = MediaPlayerPackage.PlayerEventType;

    // Initialize player
    player = MediaPlayerPackage.create();
    player.attachHTMLVideoElement(document.getElementById("video-player"));

    // Attach event listeners
    player.addEventListener(PlayerState.PLAYING, () => {
        console.log("Player State - PLAYING");
    });
    player.addEventListener(PlayerState.ENDED, () => {
        console.log("Player State - ENDED");
    });
    player.addEventListener(PlayerState.READY, () => {
        console.log("Player State - READY");
    });
    player.addEventListener(PlayerEventType.ERROR, (err) => {
        console.warn("Player Event - ERROR:", err);
    });
    // player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
    //     console.log('Timed metadata: ', cue.text);
    //     const metadataText = JSON.parse(cue.text);
    //     const productId = metadataText['productId'];
    //     props.setMetadataId(productId);
    //     const metadataTime = player.getPosition().toFixed(2);

    //     const { metaData, maxMetaData } = state;
    //     // only keep max 5 metadata records
    //     if (metaData.length > maxMetaData) {
    //       metaData.length = maxMetaData;
    //     }
    //     // insert new metadata
    //     metaData.unshift(`productId: ${productId} (${metadataTime}s)`);
    //     setState({ metaData });
    // });

    // Setup stream and play
    player.setAutoplay(true);

    player.load(config.STAND_BY_PLAYBACK_URL);
    player.setVolume(0.5);

    eventStatus = "-";
    videoStatusChecker();

    // player.load(config.PLAYBACK_URL);
    // player.setVolume(0.5);

    // runTimer();
  }


    return (
        <div style={{padding:"10px"}}>
            <video
                id="video-player"
                playsInline
                autoPlay
                width='100%'
                height='100%'
                controls
            />
        </div>
    )
}

// IvsPlayer.propTypes = {
//   setMetadataId: PropTypes.func,
//   videoStream: PropTypes.string,
// };


const mapStateToProps = state => ({
    eventName: selectEventName(state),
    eventId: selectEventId(state),
    eventPlaybackUrl: selectEventPlaybackUrl(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(IvsPlayer);