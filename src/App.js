import React from 'react';
import './App.css';
import './css/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Challenge from './components/Challenge'
import Answer from './components/Answer'
import PaperBlackBox from './components/PaperBlackBox'
import CreateBlackBox from './components/CreateBlackBox'
import StartChallenge from './components/StartChallenge'

class App extends React.Component {
  render(){
    return (
      <div>
        <Router>
          <Route path="/magicians-red" exact render={
            ()=>{
              return (
                <div className="App-header">
                  <span className="intro">Greetings Traveler<br/>Welcome to</span>
                  <span className="header">Magician's Red</span>
                  <div className="App" style={{ color: "coral", fontSize: "2vmin", marginTop: "1vmin", marginBottom: "2vmin" }}>Are you seeking a challenge or an answer?</div>
                  <div style={{ width:"40vmin" }}>
                  <Link to="/challenge" style={{ textDecoration: "none", zIndex: 10 }}>
                    <button type="button" className="btn-block btn-secondary btn-font">
                      Give me a challenge
                    </button>
                  </Link>
                  <Link to="/answer" style={{ textDecoration: "none", zIndex: 10 }}>
                    <button type="button" className="btn-block btn-danger btn-font">
                      <div>I want an answer</div>
                    </button>
                  </Link>
                  </div>
                  <img style={{
                    position: "relative",
                    marginTop: "2vmin",
                    zIndex:0,
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    opacity: "100%"
                    }}
                    src="/magicians-red/fire-trans.gif" alt="Welcome to my humble abode"
                  />
                  {
                    //img credits: https://giphy.com/chrisgannon Chris Gannon
                  }
                </div>
            );
          }
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
