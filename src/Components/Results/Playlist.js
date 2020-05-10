import React from "react";
import Songs from "./Songs";
import "../../App.css";

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
  }

  nameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  /* <Results
          tracks={this.props.playlistTracks}
          onAdd={this.props.onAdd}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
    */

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.nameChange} />
        {this.props.playlist.map(track => {
          return (
            <Songs
              track={track.title}
              
            />
          );
        })}
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;