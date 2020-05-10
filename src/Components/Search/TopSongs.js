import React from "react";
import "../../App.css";

class TopSongs extends React.Component {
  constructor(props) {
    super(props);

    this.chooseSong = this.chooseSong.bind(this)    
  }


chooseSong(){
    this.props.filterSongs(this.props.song.title)
}

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3 onClick={this.chooseSong}>{this.props.song.title}</h3>
        </div>
      </div>
    );
  }
}

export default TopSongs;