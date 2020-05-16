import React, { Component } from "react";
import './ProgressBar.css'
import ProgressBar from "./ProgressBar";

class ProgressBarState extends React.Component {
    

    render(){
        return(
            <div>
                <ProgressBar percentage={this.props.progress}/>
            </div>
        )
    }

}

export default ProgressBarState