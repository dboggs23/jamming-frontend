import React, { Component } from "react";
import "../../App.css";
import Artists from "./Artists";
import Songs from '../Results/Songs'
import Traits from './Traits'
import TopSongs from "./TopSongs";

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
    let artist
    let tracks
    let traits 

    if(this.props.artist.length > 0){
        artist = this.props.artist.map(artist=>{
            return <Artists name={artist.name} key={artist.key} onRemove={this.props.onRemove}/>
        })
    }

    if(this.props.tracks){
        tracks = this.props.tracks.map(song=>{
            return <TopSongs song={song} filterSongs={this.props.filterSongs}/>
        })
    }

    if(this.props.tracks.length === 1 && this.props.artist.length ===1){
        traits = <Traits setTraits={this.props.setTraits}/>
    }

    return (
      <div>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
        {artist}
        {tracks}
        {traits}
      </div>
    );
  }
}

export default Search;
