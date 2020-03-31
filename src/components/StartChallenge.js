import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Input from './Input'
import Results from './Results'
import SubmissionModal from './SubmissionModal';


class StartChallenge extends Component {
    constructor(props){
        super(props)
        this.state = { 
            highScore: "N/A",
            counter:0,
            size:1,
            attemptedSize:0,
            blackbox:[],
            createdBlackBox:false,
            generateBtn: "btn-block btn-danger btn-font mb-1",
            itemSpan:"item",
            currentQuery:"",
            resultsArr:[],
            modalShow:false,
            success:false,
            loading:false,
        }
        this.changeSize = this.changeSize.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.queryHandler=this.queryHandler.bind(this)
        this.setModalShow=this.setModalShow.bind(this)
        this.submitHandlerWithModal=this.submitHandlerWithModal.bind(this)
    }
    
    changeSize(event){
        this.setState({
            size: event.target.value
        })
        if(event.target.value === '1'){
            this.setState({
                itemSpan:"item"
            })
        }else{
            this.setState({
                itemSpan:"items"
            })
        }
    }
    setModalShow(visible){
        this.setState({
            modalShow:visible
        })
    }
    submitHandlerWithModal(trialAnswer,event){
        // this.setModalShow(true)
        let arrMatches=true
        for(let i=0; i< this.state.blackbox.length; i++){
            // console.log(trialAnswer[i])
            if(this.state.blackbox[i] !== trialAnswer[i]){
                arrMatches = false
                break
            }
        }
        if(arrMatches){
            this.setState({
                success:true,
                attempt: true
            })
            if(this.state.highScore==="N/A"||this.state.highScore > this.state.counter){
                this.setState({
                    attemptedSize:this.state.size,
                    highScore: this.state.counter
                })
            }else if(this.state.highScore === this.state.counter && this.state.attemptedSize < this.state.size){
                this.setState({
                    attemptedSize:this.state.size
                })
            }
        }else{
            this.setState({
                success:false,
                attempt:true
            })
        }

    }

    handleChange(event){
        // console.log(event.target.value)
        this.setState({
            currentQuery: event.target.value
        })
    }

    validateQuery(query){
        // const queryRGEX = /^\[+[0-9,\s]+\]$/
        //simplify input expression
        const queryRGEX = /^[0-9,\s]*$/
        return queryRGEX.test(query)
    }

    randomizeArray(arr){
        let temparr =[]
        arr.forEach((ele)=>{
            temparr.push(ele)
        })
        for(let i=0; i<arr.length; i++){
            let rand1 = Math.min(Math.floor(Math.random()*arr.length), arr.length-1)
            let rand2 = Math.min(Math.floor(Math.random()*arr.length), arr.length-1)
            let buff = temparr[rand1]
            temparr[rand1] = temparr[rand2]
            temparr[rand2] = buff 
        }
        return temparr
    }


    queryHandler(e){
        e.preventDefault()
        const temparr = this.state.resultsArr
        const ele = this.state.currentQuery
        if(this.validateQuery(ele)){
            // let query = ele.substr(1,ele.length-2).split(",")
            let query = ele.split(",")
            const temparr2 = []
            const hash={}
            query.forEach((ele)=>{
                let tempEle=ele.trim()
                if(tempEle!=="" && !hash[ele]){
                    temparr2.push(tempEle)
                    hash[ele] = true
                }
            })
            let resultsarr = []
            let error = false
            if(this.state.blackbox!==null && this.state.blackbox.length>0 && temparr2!==null && temparr2.length>0){
                for(let i =0; i<temparr2.length; i++){
                    let ele = temparr2[i]
                    if(ele>this.state.blackbox.length || ele<=0){
                        alert("The query you entered asks for invalid index, index must be greater than 0 and less than or equals to the size of the black box list")
                        error = true
                        break
                    }
                    let tempEle2 = this.state.blackbox[ele-1]
                    resultsarr.push(tempEle2)
                }
            }
            if(!error){
                // console.log(resultsarr)
                resultsarr= this.randomizeArray(resultsarr)
                const res = '['+ resultsarr.toString()+']'
                temparr.push([ele, res])
                this.setState({
                    resultsArr: temparr,
                    currentQuery:"",
                    counter:this.state.counter + 1
                })
            }
        }else{
            alert("Please check your input and follow the format specified exactly:\ne.g. <input>: 3, 5, 9, 2, 1")
        }
        // query.map((ele)=>{
        //     ele.trim()
        // }).filter(this.isNotEmptyString)
    }

    createNewBlackBox(){
        const greenBtn = "btn-block btn-success btn-font mb-1"
        const newbox =[]
        const n = this.state.size
        const hash ={}
        let i = 0;
        while(i<n){
            const rand = Math.floor(Math.random() * 10 * n)
            // console.log(rand)
            if(hash[rand]===true){
                //skip
            }else{
                hash[rand] = true
                newbox.push(rand)
                i++
            }
        }
        this.setState({
            createdBlackBox:true,
            blackbox:newbox,
            generateBtn:greenBtn,
        })
    }

    resetBlackBox(){
        const newbox =[]
        const n = this.state.size
        const hash ={}
        let i = 0;
        while(i<n){
            const rand = Math.floor(Math.random() * 10 * n)
            if(hash[rand]===true){
                //skip
            }else{
                hash[rand] = true
                newbox.push(rand)
                i++
            }
        }
        this.setState({
            createdBlackBox:true,
            blackbox:newbox,
            attempt:false,
            resultsArr:[],
            counter:0,
            loading:true,
        },
            ()=>{
                setTimeout(()=>{
                    this.setState({loading:false})
                }, 500)
            }
        )
        // debugging to cheat and get the blackbox
        // console.log(newbox) 
    }

    render() { 
        return ( 
            <div>
            <Link to="/challenge" style={{textDecoration:"none", margin:"1rem"}}>
                <button type="button" className=" btn btn-dark btn-exit">
                    Back to Challenge Room
                </button>
            </Link>
            <div className="container">
                <div className="flex-column align-content-center" style={{width:"100%"}}>
                    <div className="sub-intro" style={{textAlign:"center", fontSize:"3.5vmin"}}>Begin Challenge</div>
                    <div className="regText" style={{textAlign:"center", marginTop:"1rem"}}>
                        You can query the black box list by asking questions in the following format:
                        <br/><br/>
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
                        <span style={{color:((this.state.attempt&&this.state.success)? "green":"red"), fontSize:"3vmin"}}>
                            {!this.state.attempt &&
                                "You only have one attempt to submit your final answer"
                            }
                            {this.state.attempt && this.state.success &&
                                <span>Congratulations!! You passed this challenge!!
                                    <br/> You took {this.state.counter} {this.state.counter===1?"query":"queries"} to complete this challenge ({this.state.size} {this.state.size===1?"item":"items"})
                                </span>
                            }
                            {this.state.attempt && !this.state.success &&
                                "Failure... You failed this challenge!"
                            }
                            {this.state.attempt && 
                                <span><br/><br/>The answer is <br/>[ {this.state.blackbox.toString()} ]</span>
                            }
                        </span><br/><br/>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div style={{width:"60vmin",}} className="regText">
                            Set the size of black box list to generate: {this.state.size} {this.state.itemSpan}
                            <input type="range" onChange={(e)=>this.changeSize(e)} className="custom-range" defaultValue="1" max="20" min="1" step="1"></input>
                        </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div style={{width:"60vmin",}}>
                            <button type="button" onClick={()=>this.createNewBlackBox()} className={this.state.generateBtn} disabled={this.state.createdBlackBox}>
                                {this.state.createdBlackBox?  <span>Black box list generated</span>: <span>Generate a black box list to start</span>}
                            </button>
                        </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div style={{width:"60vmin",}}>
                            <i className="fa-refresh fa-spin fa"
                                style={{display:"none"}}/>
                            <button type="button" 
                                onClick={()=>this.resetBlackBox()} 
                                className={this.state.attempt? "btn-block btn-danger btn-font mb-1 loading" :"btn-block btn-secondary btn-font mb-1 loading"} 
                                disabled={!this.state.createdBlackBox || this.state.loading}
                                style={!this.state.createdBlackBox?{cursor:"not-allowed"}:{cursor:"pointer"}}>
                                    {this.state.createdBlackBox?  
                                    <span>
                                        {this.state.loading&&
                                            <i className="fa-refresh fa-spin fa"
                                                style={{marginRight:"0.5vmin"}}
                                            />
                                        }
                                        {this.state.loading?
                                            "Resetting black box list"
                                            :"Reset black box list"
                                        }
                                    </span> : 
                                    <span>
                                        Disabled
                                    </span>
                                    }
                            </button>
                        </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div style={{width:"60vmin",}}>
                            <button type="button" 
                                onClick={()=>this.setModalShow(true)}
                                className={this.state.createdBlackBox && !this.state.attempt? "btn-block btn-danger btn-font mb-1" : "btn-block btn-secondary btn-font mb-1"} 
                                disabled={!this.state.createdBlackBox || this.state.attempt}
                                style={!this.state.createdBlackBox || this.state.attempt?{cursor:"not-allowed"}:{cursor:"pointer"}}>
                                    {this.state.createdBlackBox && !this.state.attempt?  "Submit final answer": "Disabled"}
                            </button>
                        </div>
                    </div>
                    <Input
                        handler={this.queryHandler}
                        value={this.state.currentQuery}
                        handleChange={this.handleChange}
                        enabled={this.state.createdBlackBox&&!this.state.attempt}/>
                </div>
            </div>
            <div className="container-fluid" style={{marginBottom:"30%"}}>
                <Results
                    results={this.state.resultsArr}/> 
            </div>
            <div className="regText" style={{position:"absolute", top:"1rem", right:"1rem", textAlign:"right"}}>
                Size of black box list attempted: {this.state.attemptedSize}
                <br/>Least queries used: {this.state.highScore}
            </div>
            <SubmissionModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                submitHandler={this.submitHandlerWithModal}
                size={this.state.blackbox.length}
                />
            </div>
        );
    }
}

export default StartChallenge;