import React from "react";
import "../../App.css";
import "./Songs.css";

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    let songSubString = this.props.track.name.slice(0,30)
    if(songSubString.length<this.props.track.name.length){
      songSubString+='...'
    }
    //{this.props.track.name}
    return (
      <div className="Track">
        <div className="Track-information">
    <div className="h5">{songSubString}</div>
          <div>{this.props.track.artists[0].name}</div>
        </div>
        <div className='button-holder'>
          {this.renderAction()}
        </div>
      </div>
    );
  }
}

export default Songs;
