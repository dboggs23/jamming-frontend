import React, { Component } from "react";
import "../../App.css";
import "./Traits_sass.css";

class Traits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentalness: "",
      acousticness: "",
      danceability: "",
      energy: "",
      loudness: "",
      valence: "",
      mode: "",
      tempo: "",
      instrumentalEmoji: '',
      acousticnessEmoji: '',
      danceEmoji: '',
      energyEmoji: '',
      loudnessEmoji: '',
      valenceEmoji: '',
      modeEmoji: '',
      tempoEmoji: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.setTraits = this.setTraits.bind(this);
    this.emojiValue = this.emojiValue.bind(this)
  }

  

  emojiValue(value, name){
    if(name==='instrumentalness'){
      if(value<.16&&value>0) this.setState({instrumentalEmoji: '🎤 🎤 🎤'})
      if(value<.32&&value>.16) this.setState({instrumentalEmoji: '🎤 🎤'})
      if(value<.48&&value>.32) this.setState({instrumentalEmoji: '🎤'})
      if(value>.64) this.setState({instrumentalEmoji: '🎵'})
      if(value>.8) this.setState({instrumentalEmoji: '🎵 🎵'})
      if(value>.96) this.setState({instrumentalEmoji: '🎵 🎵 🎵'})
    }
    if(name==='acousticness'){
      if(value<.16&&value>0) this.setState({acousticnessEmoji: '📻 📻 📻'})
      if(value<.32&&value>.16) this.setState({acousticnessEmoji: '📻 📻'})
      if(value<.48&&value>.32) this.setState({acousticnessEmoji: '📻'})
      if(value>.64) this.setState({acousticnessEmoji: '🎻'})
      if(value>.8) this.setState({acousticnessEmoji: '🎻 🎻'})
      if(value>.96) this.setState({acousticnessEmoji: '🎻 🎻 🎻'})
    }
    if(name==='danceability'){
      if(value<.16&&value>0) this.setState({danceEmoji: '🚶 🚶 🚶'})
      if(value<.32&&value>.16) this.setState({danceEmoji: '🚶 🚶'})
      if(value<.48&&value>.32) this.setState({danceEmoji: '🚶'})
      if(value>.64) this.setState({danceEmoji: '💃'})
      if(value>.8) this.setState({danceEmoji: '💃 💃'})
      if(value>.96) this.setState({danceEmoji: '💃 💃 💃'})
    }
    if(name==='energy'){
      if(value<.16&&value>0) this.setState({energyEmoji: '🧘 🧘 🧘'})
      if(value<.32&&value>.16) this.setState({energyEmoji: '🧘 🧘'})
      if(value<.48&&value>.32) this.setState({energyEmoji: '🧘'})
      if(value>.64) this.setState({energyEmoji: '🚀'})
      if(value>.8) this.setState({energyEmoji: '🚀 🚀'})
      if(value>.96) this.setState({energyEmoji: '🚀 🚀 🚀'})
    }
    if(name==='loudness'){
      if(value<-50&&value>-60) this.setState({loudnessEmoji: '🤫 🤫 🤫'})
      if(value<-40&&value>-50) this.setState({loudnessEmoji: '🤫 🤫'})
      if(value<-30&&value>-40) this.setState({loudnessEmoji: '🤫'})
      if(value<-20&&value>-30) this.setState({loudnessEmoji: '🔈'})
      if(value<-10&&value>-20) this.setState({loudnessEmoji: '🔈 🔈'})
      if(value<0&&value>-10) this.setState({loudnessEmoji: '🔈 🔈 🔈'})
    }
    if(name==='valence'){
      if(value<.16&&value>0) this.setState({valenceEmoji: '🧛 🧛 🧛'})
      if(value<.32&&value>.16) this.setState({valenceEmoji: '🧛 🧛'})
      if(value<.48&&value>.32) this.setState({valenceEmoji: '🧛'})
      if(value>.64) this.setState({valenceEmoji: '🤸'})
      if(value>.8) this.setState({valenceEmoji: '🤸 🤸'})
      if(value>.96) this.setState({valenceEmoji: '🤸 🤸 🤸'})
    }
    if(name==='mode'){
      if(value>.5) this.setState({modeEmoji: '🌝 🌝 🌝'})
      if(value<.5) this.setState({modeEmoji: '🌚 🌚 🌚'})
    }
    if(name==='tempo'){
      if(value<68.3&&value>50) this.setState({tempoEmoji: '❤'})
      if(value<86.6&&value>68.3) this.setState({tempoEmoji: '❤ ❤'})
      if(value<104.9&&value>86.6) this.setState({tempoEmoji: '❤ ❤ ❤'})
      if(value<123.2&&value>104.9) this.setState({tempoEmoji: '❤ ❤ ❤ ❤'})
      if(value<141.5&&value>123.2) this.setState({tempoEmoji: '❤ ❤ ❤ ❤ ❤'})
      if(value>141.5) this.setState({tempoEmoji: '❤ ❤ ❤ ❤ ❤ ❤'})
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    //have emoji value for each trait
    //call emoji value function here with the value as the parameter 
    this.setState({
      [name]: value,
    });
    console.log(value, name)
    this.emojiValue(value, name)

  }

  setTraits() {
    this.props.setTraits(this.state);
  }

  render() {
    return (
      <div className='bigger-container'>
        <div className="container">
        <form>
          <div className="slidecontainer">
            <label>instrumentalness
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
            
              type="range"
              min="0"
              max="1"
              step=".01"
              className="slider"
              id="instrumentalness"
              name="instrumentalness"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.instrumentalEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>acousticness
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="0"
              max="1"
              step=".01"
              className="slider"
              id="acousticness"
              name="acousticness"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.acousticnessEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>danceability
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="0"
              max="1"
              step=".01"
              className="slider"
              id="danceability"
              name="danceability"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.danceEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>energy
                          <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="0"
              max="1"
              step=".01"
              className="slider"
              id="energy"
              name="energy"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.energyEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>loudness
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="-60"
              max="0"
              step="2"
              className="slider"
              id="loudness"
              name="loudness"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.loudnessEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>valence
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="0"
              max="1"
              step=".01"
              className="slider"
              id="valence"
              name="valence"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.valenceEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>mode
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="1"
              className="slider"
              id="mode"
              name="mode"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder'>{this.state.modeEmoji}</div>
          </div>
          <div className="slidecontainer">
            <label>tempo
            <div className='tip'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>

            </label>
            <input
              type="range"
              min="50"
              max="160"
              step="1"
              className="slider"
              id="tempo"
              name="tempo"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
            <div id='emoji-holder' className='emoji-holder tempo'>{this.state.tempoEmoji}</div>
          </div>
        </form>
        <button onClick={this.setTraits}>
          Yep, that's about right I reckon
        </button>
      </div>
      </div>
    );
  }
}

export default Traits;
