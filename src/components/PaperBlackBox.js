import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class PaperBlackBox extends Component {
    constructor(props){
        super(props)
        this.state={
            size:"",
            canEdit:false,
        }
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({
            size:event.target.value
        })
    }

    render() { 
        return ( 
            <div>
            <Link to="/answer" style={{textDecoration:"none", margin:"1rem"}}>
                <button type="button btn-exit" className=" btn btn-dark btn-exit">
                    Back to Answer Room
                </button>
            </Link>
            <div className="container">
                <div className="flex-column align-content-center" style={{width:"100%"}}>
                    <div className="sub-intro" style={{textAlign:"center", fontSize:"3.5vmin"}}>Paper Black Box List</div>
                    <div className="regText" style={{textAlign:"center", marginTop:"1rem"}}>
                        First, declare the size of the black box list you are creating:
                        <br/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div className="input-group" style={{width:"50%"}}>
                            <input type="text" 
                                className="form-control regText" 
                                name="size-input"
                                placeholder={this.state.canEdit ? "e.g. 63" : "Size already declared: "}
                                value={this.state.size}
                                onChange={this.handleChange}
                                disabled={!this.state.canEdit}
                                ></input>
                                <div className="input-group-append">
                                    <button 
                                        className={this.state.canEdit?"btn btn-danger":"btn btn-outline-secondary"}
                                        type="button"
                                        disabled={!this.state.canEdit}
                                        onClick={(e)=>this.declareSize(e)}
                                        style={!this.state.canEdit?{cursor:"not-allowed"}:{cursor:"pointer"}}
                                        >Declare
                                    </button>
                                </div>
                            </div>
                        </div>
                        Black Box List of size n: [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>, ... a<sub>n</sub>]<br/><br/>
                        Input (remove [] for actual input): [k<sub>1</sub>, k<sub>2</sub>, k<sub>3</sub>, ... k<sub>m</sub>] - Give me the k<sub>1</sub><sup>th</sup>, 
                        k<sub>2</sub><sup>th</sup> ... and k<sub>m</sub><sup>th</sup> item in the list <br/>
                        Output: [a<sub>k<sub>1</sub></sub>, a<sub>k<sub>2</sub></sub>, a<sub>k<sub>3</sub></sub>, ... a<sub>k<sub>m</sub></sub>] - 
                        A collection containing the a<sub>k<sub>1</sub></sub><sup>th</sup>, a<sub>k<sub>2</sub></sub><sup>th</sup> ... and a<sub>k<sub>m</sub></sub><sup>th</sup> item in random order<br/><br/>
                        e.g. Black Box List of size 8: [2, 14, 9, 15, 3, 7, 11, 16]<br/><br/>
                        Input: [1, 5, 7] - Give me the 1st, 5th and 7th item in the list <br/>
                        Output: [3, 11, 2] - 
                        A collection containing the 1st, 5th and 7th item in random order<br/><br/>
                        Once you feel that you know the order of the items in the black box list, submit your answer in the format below (without brackets []):<br/><br/>
                        [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>, a<sub>4</sub>... a<sub>i</sub>, ...a<sub>n</sub>]<br/>where a<sub>i</sub> is the 
                        i<sup>th</sup> item in the black box list and n is the number of items in the black box list
                        <br/><br/>
                        e.g. [3, 5, 9, 2, 1]<br/><br/>
                    </div>
                </div>
                
            </div>
            </div>
        );
    }
}

export default PaperBlackBox;