import React, { Component } from "react";
import "../../App.css";

class Traits extends Component {
    constructor(props) {
        super(props);
        this.state = {
          instrumentalness: '',
          acousticness: '',
          danceability: '',
          energy: '',
          loudness: '',
          valence: '',
          mode: '',
          tempo: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setTraits = this.setTraits.bind(this)
      }

    handleInputChange(event) {
        const value = event.target.value 
        const name = event.target.name;

        this.setState({
          [name]: value
        });
        
    }

    setTraits(){
        this.props.setTraits(this.state)    
    }


render(){


    return(
        <div>
            <form>
                <div className="slidecontainer">
                    <label>instrumentalness</label>
                    <input type="range" min="0" max="1" step='.1' className="slider" id="instrumentalness" name='instrumentalness' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>acousticness</label>
                    <input type="range" min="0" max="1" step='.1' className="slider" id="acousticness" name='acousticness' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>danceability</label>
                    <input type="range" min="0" max="1" step='.1' className="slider" id="danceability" name='danceability' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>energy</label>
                    <input type="range" min="0" max="1" step='.1' className="slider" id="energy" name='energy' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>loudness</label>
                    <input type="range" min="-60" max="0" step='2' className="slider" id="loudness" name='loudness' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>valence</label>
                    <input type="range" min="0" max="1" step='1' className="slider" id="valence" name='valence' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>mode</label>
                    <input type="range" min="0" max="1" step='1' className="slider" id="mode" name='mode' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
                <div className="slidecontainer">
                    <label>tempo</label>
                    <input type="range" min="50" max="160" step='1' className="slider" id="tempo" name='tempo' onChange={this.handleInputChange} value={this.state.value}/>
                </div>
            </form>
            <button onClick={this.setTraits}>Yep, that's about right I reckon</button>
        </div>
    )
}

}

export default Traits