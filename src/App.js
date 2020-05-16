import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login";
import Search from "./Components/Search/Search";
import Results from "./Components/Results/Results";
import Traits from "./Components/Search/Traits";
import ProgressBarState from './Components/ProgressBar/ProgressBarState'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: "My Playlist",
      loggedIn: false,
      gotArtists: false,
      gotTopSongs: false,
      gotTraits: false,
      tracks: [], //array for top 10 most popular tracks for artists
      artist: [],
      foundTracks: [], // array for results of the algorithm
      playlistTracks: [],
      subjectiveValues: {
        instrumentalness: "", // if closer to 1, then low liklihood that track contains vocals, vice versa for 0. above 0.5 is generally going to be an instrumental track / float
        acousticness: "", // doesn't really seem to be what i think as "acousticness" / 1 is acoustic, 0 is not / float
        danceability: "", // straightforward / 0-1 / float
        energy: "", // straightforward / 1 is energetic, 0 is not / float
        loudness: "", // overall loudness of music in dB / goes from -60 to 0. I think 0 is loud but honestly that's a guess based on nothing / int
        valence: "", // 0-1 values, indicates positivity of music, 1 is positive, 0 is not / binary
        mode: "", // minor vs major / major is 1, minor is 0 // either 1 or 0, not a float like most of the other values / binary
        tempo: "", //overall tempo in BPM / 60-160 integer
      },
      progress: 0,
      loading: false
    };

    this.search = this.search.bind(this);
    this.findTopSongs = this.findTopSongs.bind(this);
    this.saveTopSong = this.saveTopSong.bind(this);
    this.setTraits = this.setTraits.bind(this);
    this.login = this.login.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.checkProgress = this.checkProgress.bind(this)
  }

  login() {
    localStorage.setItem("loggedIn", "true");
    return fetch("http://localhost:5000/app/authorize") //https://were-jammming.herokuapp.com/app/authorize
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        
        window.location = res.url;
        
        
        
        
      })
      .catch(err=>console.log(err))

      localStorage.setItem({'redirected':'true'})
      
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  search(term) {
    this.setState({loading: true})
    fetch(`http://localhost:5000/app/search?search=${term}`) //https://were-jammming.herokuapp.com/app/search?search=${term}
      .then((res) => res.json())
      .then((searchResults) => {
        this.setState({ 
          loading: false,
          artist: searchResults,
          gotArtists: true },()=>this.checkProgress());
      });
  }
  
  checkProgress(){
    if(localStorage.getItem("loggedIn")) this.setState({progress: 20})
    if(this.state.gotArtists) this.setState({progress: 40})
    if(this.state.tracks.length>0) this.setState({progress: 60})
    if(this.state.gotTraits) this.setState({progress: 80})
    if(this.state.playlistTracks.length > 0) this.setState({progress: 100})
  }

  findTopSongs(clickedArtist) {
    let artists = this.state.artist;
    artists = artists.filter((findArtist) => findArtist.name === clickedArtist); //filter out incorrect artists
    this.setState({ artist: artists });
    this.setState({loading: true})
    fetch(`http://localhost:5000/app/getTopSongs?artist=${artists[0].id}`) //https://were-jammming.herokuapp.com/app/getTopSongs?artist=${artists[0].id}
      .then((res) => res.json())
      .then((searchResults) => {
        this.setState({
          loading: false,
          tracks: searchResults
        },()=>this.checkProgress());
      });
  }

  saveTopSong(song) {
    let songs = this.state.tracks;
    songs = songs.filter((findSong) => findSong.name === song); //filter out incorrect songs

    this.setState({ tracks: songs,
                    gotTopSongs: true },()=>this.checkProgress());
  }

  setTraits(traits) {
    this.setState({
      subjectiveValues: {
        instrumentalness: traits.instrumentalness,
        acousticness: traits.acousticness,
        danceability: traits.danceability,
        energy: traits.energy,
        loudness: traits.loudness,
        valence: traits.valence,
        mode: traits.mode,
        tempo: traits.tempo,
      },
    });

    this.setState({ gotTraits: true,
                    loading: true },()=>this.checkProgress());

    fetch(
      `http://localhost:5000/app/fullSearch?artist=${this.state.artist[0].id}&track=${this.state.tracks[0].id}&acousticness=${traits.acousticness}&instrumentalness=${traits.instrumentalness}&danceability=${traits.danceability}&energy=${traits.energy}&loudness=${traits.loudness}&valence=${traits.valence}&mode=${traits.mode}&tempo=${traits.tempo}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ foundTracks: res,
                        loading: false,
                        gotTraits: true });
      });
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    } else {
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks },()=>this.checkProgress());
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  createPlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    let playlistObject = {
      tracks: trackURIs,
      name: this.state.playlistName,
    };

    fetch("http://localhost:5000/app/playlist", { //https://were-jammming.herokuapp.com/app/playlist
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistObject),})
        .then((res) => {
          
        if (res.status === 200) {
          this.setState({
            playlistName: "New Playlist",
            playlistTracks: [],
            gotArtists: false,
            gotTopSongs: false,
            gotTraits: false,
            tracks: [],
            artist: false,
            foundTracks: [],
            playlistTracks: [],
            progress:0
          });
        }
      });
  }

  render() {
    let loggedIn;
    let search;
    let results;
    let traits;

    if (!localStorage.getItem("loggedIn")) {
      loggedIn = <Login onLogin={this.login} />;
    }

    if (localStorage.getItem("loggedIn")) {
      search = (
        <Search
          onSearch={this.search}
          artist={this.state.artist}
          onRemove={this.findTopSongs}
          filterSongs={this.saveTopSong}
          tracks={this.state.tracks}
          setTraits={this.setTraits}
          isLoading={this.state.loading}
        />
      );
      
    }

    if (
      this.state.tracks.length === 1 &&
      this.state.artist.length === 1 &&
      !this.state.gotTraits
    ) {
      results = "";
      search = "";
      traits = <Traits setTraits={this.setTraits} />;
      
    }

    if (this.state.gotTraits) {
      search = "";
      results = (
        <Results
          playlist={this.state.playlistTracks}
          tracks={this.state.foundTracks}
          onAdd={this.addTrack}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.createPlaylist}
        />
      );
      
    }
    /*<button onClick={console.log(this.state)}></button>
      <button onClick={this.createPlaylist}></button>
      */
    //<button onClick={localStorage.clear()}></button>
    //if restarting server, the button with the function clearing the localstorage needs to be put in, then taken out to use the app
    return (
      <div className="App">
        <div>{loggedIn}</div>
        <div>
          {search}
          {results}
          {traits}
        </div>
        <ProgressBarState progress={this.state.progress}/>
        
      </div>
    );
  }
}

export default App;
