import React, { Component } from "react";
import "../../App.css";
import "./Artists.css";

class Artists extends Component {
  constructor(props) {
    super(props);

    this.filterArtists = this.filterArtists.bind(this);
  }

  filterArtists() {
    this.props.onRemove(this.props.name);
  }

  render() {
    return (
      <div className="artist">
        <div onClick={this.filterArtists}>{this.props.name}</div>
      </div>
    );
  }
}

export default Artists;
