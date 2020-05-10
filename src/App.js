import React, { Component } from "react";
import './App.css';
import Login from './Components/Login'
import Search from './Components/Search/Search'
import Results from './Components/Results/Results'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      gotArtists: false,
      gotTopSongs: false,
      gotTraits: false,
      tracks: [], //array for top 10 most popular tracks for artists
      artist: [],
      foundTracks: [], // array for results of the algorithm
      playlistTracks: [],
      subjectiveValues: {
        instrumentalness: '', // if closer to 1, then low liklihood that track contains vocals, vice versa for 0. above 0.5 is generally going to be an instrumental track
        acousticness: '', // doesn't really seem to be what i think as "acousticness" / 1 is acoustic, 0 is not
        danceability: '', // straightforward / 0-1
        energy: '', // straightforward / 1 is energetic, 0 is not
        loudness: '', // overall loudness of music in dB / goes from -60 to 0. I think 0 is loud but honestly that's a guess based on nothing
        valence: '', // 0-1 values, indicates positivity of music, 1 is positive, 0 is not
        mode: '', // minor vs major / major is 1, minor is 0 // either 1 or 0, not a float like most of the other values
        tempo: '' //overall tempo in BPM
      }
    }

    this.search = this.search.bind(this)
    this.findTopSongs = this.findTopSongs.bind(this)
    this.saveTopSong = this.saveTopSong.bind(this)
    this.setTraits = this.setTraits.bind(this)
    this.login = this.login.bind(this)
  }

  login() {
    localStorage.setItem('loggedIn', 'true')
    //this.setState({loggedIn: true})
    return fetch("/app/authorize")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        window.location = res.url;
      });
  }



  getSomeSongs(){
    fetch('/app/myendpoint')
      .then(res=>res.json())
      .then(res=>console.log(res))
  }



  componentDidMount() {
    //this.runMe()
  }

  search(term){
    fetch(`/app/search?search=${term}`)
      .then(res=>res.json())
      .then(searchResults => {
        this.setState({ artist: searchResults });
      });
    /*this.setState({artist: [...this.state.artist, {name: term}], key: 1})//should give these a unique id
    this.setState({gotArtists: true})*/
  }

  findTopSongs(clickedArtist){
    let artists = this.state.artist
    artists = artists.filter(findArtist => findArtist.name === clickedArtist)//filter out incorrect artists 
    //this.setState({artist: artists})
    //also, go ahead and find the top songs 
    //below are two hardcoded tracks
    this.setState({artist: artists})
    this.setState({gotTopSongs: true})
    
    fetch(`/app/getTopSongs?artist=${artists[0].id}`)
      .then(res=>res.json())
      .then(searchResults=>{
        this.setState({
          tracks: searchResults
        })
      })

    
  }

  saveTopSong(song){
    let songs = this.state.tracks
    songs = songs.filter(findSong => findSong.name === song)//filter out incorrect songs

    this.setState({tracks: songs})

  }

  setTraits(traits){

    this.setState({subjectiveValues: {
        instrumentalness: traits.instrumentalness, 
        acousticness: traits.acousticness, 
        danceability: traits.danceability, 
        energy: traits.energy, 
        loudness: traits.loudness, 
        valence: traits.valence, 
        mode: traits.mode, 
        tempo: traits.tempo
    }})

    this.setState({gotTraits: true})

    fetch(`/app/fullSearch?artist=${this.state.artist[0].id}&track=${this.state.tracks[0].id}&acousticness=${traits.acousticness}&instrumentalness=${traits.instrumentalness}&danceability=${traits.danceability}&energy=${traits.energy}&loudness=${traits.loudness}&valence=${traits.valence}&mode=${traits.mode}&tempo=${traits.tempo}`)
        .then(res=>res.json())
        .then(res=>console.log(res))
  }



  render() {
    let loggedIn
    let search
    let results
     if(!localStorage.getItem('loggedIn')){
       loggedIn = <Login onLogin={this.login}/>
     } 
     if(localStorage.getItem('loggedIn')) {
       search = <Search 
       onSearch={this.search} 
       artist={this.state.artist} 
       onRemove={this.findTopSongs} 
       filterSongs={this.saveTopSong} 
       tracks={this.state.tracks}
       setTraits={this.setTraits}
       />
       
     }

     if(this.state.gotTraits){
       search = ''
       results = <Results playlist={this.state.playlistTracks} tracks={this.state.foundTracks}/>
     }
     //<button onClick={localStorage.clear()}></button>
    return (
      <div className="App">
        <div >
          {loggedIn}
        </div>
        <div>
          {search}
          {results}
        </div>
        <button onClick={console.log(this.state)}></button>
        
      </div>
    );
  }
}

export default App;
