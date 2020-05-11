import React from "react";
import Songs from "./Songs";
import "../../App.css";
import "./Playlist.css";

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
  }

  nameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <div className="inputs">
          <input defaultValue={"New Playlist"} onChange={this.nameChange} />
          <button className="Playlist-save" onClick={this.props.onSave}>
            SAVE TO SPOTIFY
          </button>
        </div>
        {this.props.playlist.map((track) => {
          return <Songs key={track.id} track={track} />;
        })}
      </div>
    );
  }
}

export default Playlist;
