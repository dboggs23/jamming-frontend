import React from "react";
import Songs from "./Songs";
import "../../App.css";
import Playlist from "./Playlist";

class Results extends React.Component {

    /*
    onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
    */


    /*
        <Playlist/> is going to be rendered here, but for a little bit I'm going to be leaving it out
    */
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Songs
              key={track.id}
              track={track}
              
            />
          );
        })}
        <div>
          
        </div>
      </div>
      
    );
  }
}

export default Results;