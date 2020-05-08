import React, { Component } from "react";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.test = this.test.bind(this)
    this.otherTest = this.otherTest.bind(this)
  }

  test(){
    if(window.location.href.match(/code=([^]*)/)){
      return fetch('/code', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({code: window.location.href.match(/code=([^]*)/)})
      })
    } else {
      return fetch('/api/hey')
      .then(res=>res.json())
      .then(res=>{
        window.location = res
      })
      .then(res=>{
        
      })
    }
  }

  refreshToken(){
    return fetch('/callback')
  }

  otherTest(e){
    e.preventDefault()

    return fetch('/app/authorize')
      .then(res=>{
        //console.log(res)
        return res.json()
      }).then(res=>{
        window.location = res.url
        
        
      })
      
      
  }


  runMe(){
    if(window.location.href.match(/code=([^]*)/)){
      let code = window.location.href.match(/code=([^]*)/)[1]

      fetch(`/app/callback/?code=${code}`)
        .then(res=>{
          console.log(res)
        })
    }
  }
  

  runOnLoad(){
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
        }, {});
      window.location.hash = '';

      if (hash.access_token) {
        fetch('/app/myendpoint', {headers: {"Authorization": `Bearer ${hash.access_token}`}})
          .then(res=>{
            console.log(res)
          })
      }
  }

  componentDidMount(){
    this.runMe()
  }

  render(){
    return (
      <div className="App">
        <h1>Hello!</h1>
        <button onClick={this.otherTest}>click to log in</button>
        <button onClick={this.refreshToken}>click to refresh token</button>
      </div>
    );
  }
}

export default App;
