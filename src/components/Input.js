import React, { Component } from 'react';

class Input extends Component {
    state = {  }
    render() {
        return (
            <div style={{display:"flex", justifyContent:"center", marginTop:"1rem"}}>
                <div style={{width:"60vmin",}}>
                    <form onSubmit={this.props.handler}>
                        <div className="form-group regText">
                            <label htmlFor="query-input">Input your queries here:</label>
                            <input type="text" 
                            className="form-control regText" 
                            name="query-input"
                            placeholder={this.props.enabled ? "e.g. 1, 5, 7, 10" : "Generate a black box list first"}
                            value={this.props.value}
                            onChange={this.props.handleChange}
                            disabled={!this.props.enabled}
                            style={!this.props.enabled?{cursor:"not-allowed"}:{cursor:"text"}}
                            ></input>
                            <button type="submit" className={this.props.enabled ? "btn-font btn-danger" : "btn-font btn-secondary"} style={!this.props.enabled?{cursor:"not-allowed"}:{cursor:"pointer"}} disabled={!this.props.enabled}>
                                {this.props.enabled ? "Submit query" : "Queries disabled"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Input;