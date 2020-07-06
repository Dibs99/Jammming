import React from 'react';
import './AudioPlayer.css';
import PlayAudio from 'react-simple-audio-player';
import chroma from "chroma-js"


class AudioPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        preview: this.props.track.preview_url
    }
}

  render() {
  return ();

}
}

export default AudioPlayer;
