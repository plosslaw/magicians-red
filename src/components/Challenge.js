import React from 'react';
import {Link} from 'react-router-dom'

class Challenge extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="container">
                <Link to="/" style={{textDecoration:"none"}}>
                    <button type="button btn-font" className=" btn btn-danger btn-font">
                        Exit Challenge Room
                    </button>
                </Link>
                <div className="App">Hello Challenge</div>
            </div>  
        );
    }
}

export default Challenge;
