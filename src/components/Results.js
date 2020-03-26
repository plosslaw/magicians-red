import React, { Component } from 'react';
import ResultsRow from './ResultsRow'

class Results extends Component {
    state = {  }
    render(){
        const tableWrapper = {
            overflowY: "scroll",
            width:"100%",
            maxHeight:"400px",
            marginTop:"3rem"
        }
        return(
            <div style={{backgroundColor:"lightgrey"}}>
                <div style={tableWrapper} className="table-wrapper">
                    <table className="table table-bordered table-striped table-sm sticky">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col" style={{width:"10%"}}>Query #</th>
                            <th scope="col" style={{width:"20%"}}>Input Query</th>
                            <th scope="col" style={{width:"20%"}}>Output Collection</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.results.map((result,index)=>{
                                return <ResultsRow key={index}
                                            result={result}
                                            id={index+1}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Results;