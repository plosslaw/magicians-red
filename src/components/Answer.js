import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Answer extends Component {
    state = {  }
    render() { 
        return (
            <div>
            <Link to="/" style={{textDecoration:"none", margin:"1rem"}}>
                <button type="button" className=" btn btn-dark btn-exit">
                    Exit Answer Room
                </button>
            </Link>
            <div className="container">
                <div className="flex-column align-content-center" style={{width:"100%"}}>
                    <div className="sub-intro" style={{textAlign:"center", fontSize:"3.5vmin"}}>Welcome to the Answer Room</div>
                    <div className="regText" style={{textAlign:"center", marginTop:"1rem"}}>
                        In this room, I will attempt to guess the ordering of distinct items in a black box list using the fewest number of queries.
                        <br/><br/>
                        For example: we have the following black box list: [2, 14, 9, 15, 3, 7, 11, 16] - 
                        a black box list is just a list whose items we have no knowledge about.<br/> 
                        <span style={{color:"red"}}>However we are allowed to know the total number of items in the box.</span>
                        <br/><br/>
                        I can query the black box list by asking questions in the following format:
                        <br/><br/>
                        Input (remove [] for actual input): [1, 5, 7] - Give me the 1st, 5th and 7th item in the list <br/><br/>
                        Output: [3, 11, 2] - 
                        A collection containing the 1st, 5th and 7th item <br/><br/>
                        <span style={{color:"red"}}>The output collection contains the items specified by the query but in jumbled up
                        order so as to not reveal the exact order of each individual item in the black box list since we don't know if the
                        first item in the output collection corresponds to the 1st, 5th or 7th item in the black box list.
                        </span>
                    </div>
                </div>
                <Link to="/answer/createblackbox" style={{textDecoration:"none", display:"flex", justifyContent:"center", marginTop:"5rem"}}>
                    <div style={{width:"60vmin"}}>
                        <button type="button" className="btn-block btn-secondary btn-font">
                            Create black box list, I promise I won't peek
                        </button>
                    </div>
                </Link>
                <Link to="/answer/paperblackbox" style={{textDecoration:"none", display:"flex", justifyContent:"center", marginTop:"0.2rem"}}>
                    <div style={{width:"60vmin"}}>
                        <button type="button" className="btn-block btn-danger btn-font">
                            Try writing the contents of the black box on paper instead
                        </button>
                    </div>
                </Link>
            </div>
            </div>
        );
    }
}

export default Answer;