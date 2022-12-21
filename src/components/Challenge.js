import React from 'react';
import {Link} from 'react-router-dom'

class Challenge extends React.Component {
    state = {

    }
    render() {
        return (
            <div>
            <Link to="/magicians-red" style={{textDecoration:"none", margin:"1rem"}}>
                <button type="button" className=" btn btn-dark btn-exit">
                    Exit Challenge Room
                </button>
            </Link>
            <div className="container">
                <div className="flex-column align-content-center" style={{width:"100%"}}>
                    <div className="sub-intro" style={{textAlign:"center", fontSize:"3.5vmin"}}>Welcome to my Challenge</div>
                    <div className="regText" style={{textAlign:"center", marginTop:"1rem"}}>
                        In this room, you shall attempt to guess the ordering of distinct items in a black box list using the fewest number of queries.
                        <br/><br/>
                        For example: we have the following black box list: [2, 14, 9, 15, 3, 7, 11, 16] -
                        a black box list is just a list whose items we have no knowledge about.<br/>
                        <span style={{fontWeight:"bold"}}>However we are allowed to know the total number of items in the box.</span>
                        <br/><br/>
                        You can query the black box list by asking questions in the following format:
                        <br/><br/>
                        <b>Input (remove [] for actual input)</b>: [1, 5, 7] - Give me the 1st, 5th and 7th item in the list <br/>
                        <b>Output:</b> [3, 11, 2] -
                        A collection containing the 1st, 5th and 7th item <br/><br/>
                        <span style={{fontWeight:"bold"}}>The output collection contains the items specified by the query but in jumbled up
                        order so as to not reveal the exact order of each individual item in the black box list since we don't know if the
                        first item in the output collection corresponds to the 1st, 5th or 7th item in the black box list.
                        </span><br/><br/>
                        Obviously the maximum size of the input is the size of the black box list
                        which will return a collection that contains all the items in the black box list<br/><br/>

                        Once you feel that you know the order of the items in the black box list, submit your answer in the format below (without brackets []):<br/>
                        [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>, a<sub>4</sub>... a<sub>i</sub>, ...a<sub>n</sub>]<br/><br/>where a<sub>i</sub> is the 
                        i<sup>th</sup> item in the black box list and n is the number of items in the black box list
                        <br/><br/>
                        e.g. [3, 5, 9, 2, 1]
                    </div>
                </div>
            </div>
            <Link to="/challenge/start" style={{textDecoration:"none", display:"flex", justifyContent:"center", marginTop:"1rem"}}>
                <div style={{width:"60vmin"}}>
                    <button type="button" className="btn-block btn-danger btn-font">
                        Start Challenge
                    </button>
                </div>
            </Link>
            </div>  
        );
    }
}

export default Challenge;
