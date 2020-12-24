import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class IvsPlayer extends Component {
    constructor() {
        super ();
        this.state = {
            maxMetaData: 10,
            metaData: [],
            eventStatus: "-",
            player: null
        }
    }

    async sendUserLog() {
        try {
            // const timestamp = sysdate.format('{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}');
            const timestamp = moment().format('YYYY-MM-DD hh:mm:ss');
            // console.log('timestamp : ' + timestamp);
            const response = await LoggingService.sendUserLog(
                this.props.eventId, this.props.userId, 'IvsPlayer', timestamp, myPublicIp);
        
        } catch (error) {
            console.log(error.message);
        }
    } 

    loadUserData() {
        try {
            myPublicIp = await publicIp.v4();

            const userInfo = await Auth.currentUserInfo();
            // console.log(userInfo);
            // console.log(userInfo.username);
            // console.log(userInfo.attributes.sub);
            userId = userInfo.attributes.sub;
            

        } catch (error) {
            console.log(error.message);
        }
    }

  loadStandByVideo() {
    this.player.load(config.STAND_BY_PLAYBACK_URL);
    this.player.setVolume(0.5);
  }

  loadVideo() {
    this.player.load(this.props.eventPlaybackUrl);
    this.player.setVolume(0.5);
  }

  async checkVideoStatus() {
    const response = await AdminService.getEventStatus(this.props.eventId);
    // console.log(response);
    const status = response.data.message.status;
    console.log("status: " + status + " eventStatus: " + this.eventStatus);
    // console.log("status: " + status);
    if (status === "START" && this.eventStatus !== "START") {
        this.loadVideo();
    } else if (status === "END" && this.eventStatus === "START") {
        this.loadStandByVideo();
    } else if (status === "READY" && this.eventStatus === "-") {
        this.loadStandByVideo();
    }
    this.eventStatus = status;
  }

  videoStatusChecker() {
    const interval = setInterval(() => {
        this.checkVideoStatus();
      }, 5000);
      return () => clearInterval(interval);
  }


  componentDidMount() {
    const mediaPlayerScript = document.createElement("script");
    mediaPlayerScript.src = "https://player.live-video.net/1.0.0/amazon-ivs-player.min.js";
    mediaPlayerScript.async = true;
    mediaPlayerScript.onload = () => this.mediaPlayerScriptLoaded();
    document.body.appendChild(mediaPlayerScript);
  }

  mediaPlayerScriptLoaded = () => {
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
    this.player = MediaPlayerPackage.create();
    this.player.attachHTMLVideoElement(document.getElementById("video-player"));

    // Attach event listeners
    this.player.addEventListener(PlayerState.PLAYING, () => {
        console.log("Player State - PLAYING");
    });
    this.player.addEventListener(PlayerState.ENDED, () => {
        console.log("Player State - ENDED");
    });
    this.player.addEventListener(PlayerState.READY, () => {
        console.log("Player State - READY");
    });
    this.player.addEventListener(PlayerEventType.ERROR, (err) => {
        console.warn("Player Event - ERROR:", err);
    });
    this.player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
        console.log('Timed metadata: ', cue.text);
        const metadataText = JSON.parse(cue.text);
        const productId = metadataText['productId'];
        this.props.setMetadataId(productId);
        const metadataTime = player.getPosition().toFixed(2);

        const { metaData, maxMetaData } = this.state;
        // only keep max 5 metadata records
        if (metaData.length > maxMetaData) {
          metaData.length = maxMetaData;
        }
        // insert new metadata
        metaData.unshift(`productId: ${productId} (${metadataTime}s)`);
        this.setState({ metaData });
    });

    // Setup stream and play
    this.player.setAutoplay(true);

    this.eventStatus = "-";
    this.videoStatusChecker();

    // this.player.load(config.PLAYBACK_URL);
    // this.player.setVolume(0.5);

    // this.runTimer();
  }

  render() {
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
}

IvsPlayer.propTypes = {
  setMetadataId: PropTypes.func,
  videoStream: PropTypes.string,
};


const mapStateToProps = state => ({
    eventName: selectEventName(state),
    eventId: selectEventId(state),
    eventPlaybackUrl: selectEventPlaybackUrl(state)
});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(IvsPlayer);