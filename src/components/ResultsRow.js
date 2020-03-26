import React, { Component } from 'react';

class ResultsRow extends Component {
    state = {  }
    render() { 
        return(
            <tr>
                <td style={{overflowX: "scroll", fontWeight:"bold"}}>#{this.props.id}</td>
                <td style={{overflowX: "scroll", fontWeight:"bold"}} className="text-capitalize">{this.props.result[0]}</td>
                <td style={{overflowX: "scroll", fontWeight:"bold"}} className="text-capitalize">{this.props.result[1]}</td>
            </tr>
        )
    }
}

export default ResultsRow;