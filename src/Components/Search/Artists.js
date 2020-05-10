import React, { Component } from "react";
import "../../App.css";

class Artists extends Component {
    constructor(props){
        super(props)

        this.filterArtists = this.filterArtists.bind(this)
    }

filterArtists(){
    this.props.onRemove(this.props.name)
}

render(){
    return(
        <h6 onClick={this.filterArtists}>
            {this.props.name}
        </h6>
    )
}

}

export default Artists