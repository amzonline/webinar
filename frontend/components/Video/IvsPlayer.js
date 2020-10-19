import React, {useEffect, useRef} from 'react';

import { connect } from 'react-redux';
import { selectEventName, selectEventPlaybackUrl } from '../../core/redux/event.selectors';


function IvsPlayer(props) {
    const divEl = useRef(null);
    const videoEl = useRef(null);
    // const playbackUrl = props.eventPlaybackUrl;
    const playbackUrl = "https://0b377682ced3.us-west-2.playback.live-video.net/api/video/v1/us-west-2.223427183593.channel.wiHiuxdpsmEf.m3u8";

    useEffect(() => {
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
        <div ref={divEl}>
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
    eventPlaybackUrl: selectEventPlaybackUrl(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(IvsPlayer);
