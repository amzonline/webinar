import React, {useEffect, useRef} from 'react';

import { connect } from 'react-redux';
import { selectEventId, selectEventName, selectEventPlaybackUrl } from '../../core/redux/event.selectors';

import LoggingService from "../../services/LoggingService";
import publicIp from 'public-ip';
import { Auth } from 'aws-amplify';
import moment from 'moment';


function IvsPlayer(props) {
    const divEl = useRef(null);
    const videoEl = useRef(null);
    const playbackUrl = props.eventPlaybackUrl;
    const eventId = props.eventId;
    var myPublicIp = "";
    var userId = "";

    async function loadUserData() {
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

         
    async function sendUserLog() {
        try {
            
            // const timestamp = sysdate.format('{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}');
            const timestamp = moment().format('YYYY-MM-DD hh:mm:ss');
            // console.log('timestamp : ' + timestamp);
            const response = await LoggingService.sendUserLog(eventId, userId, 'IvsPlayer', timestamp, myPublicIp);
        
        } catch (error) {
            console.log(error.message);
        }
    } 

    useEffect(() => {
        const interval = setInterval(() => {
            sendUserLog();
        }, 10000);
        return () => clearInterval(interval);
      }, []);

    // const playbackUrl = "https://0b377682ced3.us-west-2.playback.live-video.net/api/video/v1/us-west-2.223427183593.channel.wiHiuxdpsmEf.m3u8";

    useEffect(() => {

        loadUserData();

        const script = document.createElement('script');
        script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js';
        script.async = true;

        document.body.appendChild(script);

        script.onload = () => {
            // eslint-disable-next-line no-undef
            if (IVSPlayer.isPlayerSupported) {
                // eslint-disable-next-line no-undef
                const player = IVSPlayer.create();
                player.attachHTMLVideoElement(document.getElementById('video-player'));
                player.load(playbackUrl);
                player.play();
            }
        }

        return () => {
            document.body.removeChild(script);
        }

    }, [])


    return (
        <div ref={divEl} style={{padding:"10px"}}>
            <video
                id="video-player"
                ref={videoEl}
                playsInline
                autoPlay
                width='100%'
                height='100%'
                controls
            />
        </div>
    );
}

const mapStateToProps = state => ({
    eventName: selectEventName(state),
    eventId: selectEventId(state),
    eventPlaybackUrl: selectEventPlaybackUrl(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(IvsPlayer);
