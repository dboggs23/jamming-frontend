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
      tracks: [],
      artist: [],
      subjectiveValues: {
        instrumentalness: '', // if closer to 1, then low liklihood that track contains vocals, vice versa for 0. above 0.5 is generally going to be an instrumental track
        acousticness: '', // doesn't really seem to be what i think as "acousticness" / 1 is acoustic, 0 is not
        danceability: '', // straightforward / 0-1
        energy: '', // straightforward / 1 is energetic, 0 is not
        loudness: '', // overall loudness of music in dB / goes from -60 to 0. I think 0 is loud but honestly that's a guess based on nothing
        valance: '', // 0-1 values, indicates positivity of music, 1 is positive, 0 is not
        mode: '', // minor vs major / major is 1, minor is 0 // either 1 or 0, not a float like most of the other values
        tempo: '' //overall tempo in BPM
      }
    }
    
    this.loggedIn = this.loggedIn.bind(this)
    this.search = this.search.bind(this)
    this.findTopSongs = this.findTopSongs.bind(this)
    this.saveTopSong = this.saveTopSong.bind(this)
    this.setTraits = this.setTraits.bind(this)
  }

  login() {
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

  loggedIn(){
    this.setState({loggedIn:true})
  }

  search(term){
    this.setState({artist: [...this.state.artist, {name: term}], key: 1})//should give these a unique id
  }

  findTopSongs(clickedArtist){
    let artists = this.state.artist
    artists = artists.filter(findArtist => findArtist.name === clickedArtist)//filter out incorrect artists 
    //this.setState({artist: artists})
    //also, go ahead and find the top songs 
    //below are two hardcoded tracks
    this.setState({artist: artists})

    this.setState({tracks: [{title: 'A-Punk', id: 1},
                    {title: 'Diane Young', id: 2}]})
  }

  saveTopSong(song){
    let songs = this.state.tracks
    songs = songs.filter(findSong => findSong.title === song)//filter out incorrect songs

    this.setState({tracks: songs})

  }

  setTraits(traits){
    console.log(traits)
    this.setState({subjectiveValues: {
      instrumentalness: traits.instrumentalness, 
        acousticness: traits.acousticness, 
        danceability: traits.danceability, 
        energy: traits.energy, 
        loudness: traits.loudness, 
        valance: traits.valance, 
        mode: traits.mode, 
        tempo: traits.tempo
    }})
  }



  render() {
    let loggedIn
    let search
    let results
     if(!this.state.loggedIn){
       loggedIn = <Login onLogin={this.loggedIn}/>
     } 
     if(this.state.loggedIn) {
       search = <Search 
       onSearch={this.search} 
       artist={this.state.artist} 
       onRemove={this.findTopSongs} 
       filterSongs={this.saveTopSong} 
       tracks={this.state.tracks}
       setTraits={this.setTraits}
       />
       
     }
     if(this.state.artist){
      results = <Results tracks={this.state.tracks}/>
     }
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
