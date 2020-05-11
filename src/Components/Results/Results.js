import React from "react";
import Songs from "./Songs";
import "../../App.css";
import Playlist from "./Playlist";
import "./Results.css";

class Results extends React.Component {
  render() {
    return (
      <div className="results-container">
        <div className="TrackList">
          {this.props.tracks.map((track) => {
            return (
              <Songs
                key={track.id}
                track={track}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
              />
            );
          })}
        </div>
        <div className="TrackList">
          <Playlist
            playlist={this.props.playlist}
            onRemove={this.props.onRemove}
            onAdd={this.props.onAdd}
          />
        </div>
      </div>
    );
  }
}

export default Results;
