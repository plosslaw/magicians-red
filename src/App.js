import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Challenge from './components/Challenge'
import Answer from './components/Answer'
import PaperBlackBox from './components/PaperBlackBox'
import CreateBlackBox from './components/CreateBlackBox'
import StartChallenge from './components/StartChallenge'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  
  
  render(){
    return (
      <div>
        
        
        <Router>
          <Route path="/" exact render={
          ()=>{
            return(
            <div className="App-header">
              <img style={{
                position:"absolute",
                bottom:"10%",
                display:"block", 
                marginLeft:"auto", 
                marginRight:"auto",
                opacity:"100%"
                }}
                src="/fire-trans.gif" alt="Welcome to my humble abode"/>{
                  //img credits: https://giphy.com/chrisgannon Chris Gannon
                }
              <span className="intro">Greetings Traveller<br/>Welcome to</span>
              <span className="header">Magician's Red</span>
              <div className="App" style={{color:"coral", fontSize:"2vmin", marginTop:"1rem", marginBottom:"2rem"}}>Are you seeking a challenge or an answer?</div>
              <div style={{width:"40vmin"}}>
              <Link to="/challenge" style={{textDecoration:"none"}}>
                <button type="button" className="btn-block btn-secondary btn-font mb-1">
                  Give me a challenge
                </button>
              </Link>
              <Link to="/answer" style={{textDecoration:"none"}}>
                <button type="button" className="btn-block btn-danger btn-font">
                  <div>I want an answer</div>
                </button>
              </Link>
              </div>
            </div>
          )}
        }/>
        <Route path="/challenge" exact component={Challenge}/>
        <Route path="/answer" exact component={Answer}/>
        <Route path="/answer/createblackbox" exact component={CreateBlackBox}/>
        <Route path="/answer/paperblackbox" exact component={PaperBlackBox}/>
        <Route path="/challenge/start" exact component={StartChallenge}/>
        </Router>
      </div>
    );
  }
}

export default App;
