import React, { Component } from "react";
import "../../App.css";
import Artists from "./Artists";
import Traits from "./Traits";
import TopSongs from "./TopSongs";
import "./Search.css";
import MoonLoader from "react-spinners/PacmanLoader";

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

  render() {
    let prelim
    let artist;
    let tracks;
    let traits;

    if (this.state.term==='') {
      prelim = <div className='pointer'>👈 search for an artist to use to find similar stuff</div>
    }

    if (this.props.artist.length > 0) {
      prelim = 'Is this who you were looking for?'
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

    if (this.props.tracks.length) {
      prelim = 'And a song'
      artist = ''
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
              placeholder="Enter an Artist"
              onChange={this.handleTermChange}
            />

            <button className="SearchButton" onClick={this.search}>
              SEARCH
            </button>
          </div>
        </div>

        <div>
          <div className="artists">
            <div className='header'>{this.props.isLoading ? <MoonLoader css='margin-left: -30px; opacity: .95;' size={20} color={"#123abc"}/> : prelim}</div>
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
