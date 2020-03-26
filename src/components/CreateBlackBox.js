import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class CreateBlackBox extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <Link to="/answer" style={{textDecoration:"none", margin:"1rem"}}>
                <button type="button btn-font" className=" btn btn-dark btn-font">
                    Back to Answer Room
                </button>
            </Link>
            <div className="container">
                <div className="flex-column align-content-center" style={{width:"100%"}}>
                    <div className="sub-intro" style={{textAlign:"center", fontSize:"3.5vmin"}}>Welcome to my Challenge</div>
                    <div></div>
                </div>
                
            </div>
            </div>
        );
    }
}

export default CreateBlackBox;