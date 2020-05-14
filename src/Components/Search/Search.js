import React, { Component } from "react";
import "../../App.css";
import Artists from "./Artists";
import Traits from "./Traits";
import TopSongs from "./TopSongs";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  spinner(){

  }

  render() {
    let artist;
    let tracks;
    let traits;

    if (this.props.artist.length > 0) {
      artist = this.props.artist.map((artist) => {
        return (
          <Artists
            name={artist.name}
            key={artist.key}
            onRemove={this.props.onRemove}
          />
        );
      });
    }

    if (this.props.tracks) {
      tracks = this.props.tracks.map((song) => {
        return <TopSongs song={song} filterSongs={this.props.filterSongs} />;
      });
    }

    if (this.props.tracks.length === 1 && this.props.artist.length === 1) {
      artist = "";
      tracks = "";
    }

    return (
      <div className="papaSearch">
        <div className="SearchContainer">
          <div className="SearchBar">
            <input
              placeholder="Enter A Song, Album, or Artist"
              onChange={this.handleTermChange}
            />

            <button className="SearchButton" onClick={this.search}>
              SEARCH
            </button>
          </div>
        </div>

        <div>
          <div className="artists">
            {artist}
            {tracks}
          </div>

          {traits}
        </div>
      </div>
    );
  }
}

export default Search;
