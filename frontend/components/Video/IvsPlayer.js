import React, {useEffect, useRef} from 'react';

import { connect } from 'react-redux';
import { selectEventName, selectEventPlaybackUrl } from '../../core/redux/event.selectors';


function IvsPlayer(props) {
    const divEl = useRef(null);
    const videoEl = useRef(null);
    // const playbackUrl = props.eventPlaybackUrl;
    const playbackUrl = "https://d6hwdeiig07o4.cloudfront.net/ivs/956482054022/cTo5UpKS07do/2020-07-13T22-54-42.188Z/OgRXMLtq8M11/media/hls/master.m3u8";

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
