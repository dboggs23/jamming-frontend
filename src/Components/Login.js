import React, { Component } from "react";

class Login extends Component {
    constructor(props){
        super(props)

    }


    render(){
        return(
            <div>
                <button className='login success' onClick={this.props.onLogin}>Log in!</button>
            </div>
        )
    }
}

export default Login