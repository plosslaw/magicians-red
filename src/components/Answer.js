import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Answer extends Component {
    state = {  }
    render() { 
        return (
            <div className="container">
                <Link to="/" style={{textDecoration:"none"}}>
                    <button type="button" className=" btn btn-danger btn-font">
                        Exit Answer Room
                    </button>
                </Link>
                <div className="App">Hello Answer</div>
            </div>
        );
    }
}

export default Answer;