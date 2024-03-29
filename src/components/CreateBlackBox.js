import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import GeneratedBlackBoxElement from './GeneratedBlackBoxElement'

class CreateBlackBox extends Component {
    constructor(props){
        super(props)
        this.state={
            size: "",
            canEdit: true,
            accept: false,
            err: false,
            errMsg: "",  // using alert instead of printing errMsg since \n does not work properly
            counter: 0,
            queriesArr: [],
            outputArr: [],
            numOfQueries: 0,
            currOutput: "",
            reveal: false,
            blackbox: "",
            genBlackBox: [],
            hash: {},
        }
        this.handleChange=this.handleChange.bind(this)
        this.focusInput = React.createRef()
        this.handleOutput=this.handleOutput.bind(this)
        this.storeOutput=this.storeOutput.bind(this)
    }

    componentDidMount(){
        this.focusInput.current.focus()
    }

    handleChange(event){
        this.setState({
            size:event.target.value
        })
    }
    handleOutput(event){
        this.setState({
            currOutput:event.target.value
        })
    }

    validateSize(size){
        const sizeRGEX = /^[0-9]*$/
        return sizeRGEX.test(size) && size.length>0 && size!=="0" && size.length<3
    }

    validateOutput(output){
        const outRGEX = /^[0-9,\s]*$/
        return outRGEX.test(output)
    }

    declareSize(){
        if(this.validateSize(this.state.size)){
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
            //generate queriesArr
            const queries = Math.ceil(Math.log2(parseInt(this.state.size) + 1))
            const temp = []
            // const length = Math.pow(2,queries)
            for(let i = 0; i<queries; i++){
                const newarr=[]
                temp.push(newarr)
            }
            for(let i =1; i<=this.state.size; i++){
                let bitmask = 1
                for(let j=0;j<queries;j++){
                    if((i & bitmask)=== bitmask){
                        temp[j].push(" "+i+" ") //optimised using counter instead of evaluating log2 each time
                    }
                    // console.log(bitmask)
                    bitmask*=2
                }
            }
            // console.log(temp)
            this.setState({
                queriesArr:temp,
                canEdit:false,
                genBlackBox:newbox,
                numOfQueries:queries
            })
        }else{
            alert("Enter one integer between 1 and 99 with no space or special characters")
        }
    }

    resetSize(){
        this.setState({
            size: "",
            canEdit: true,
            accept: false,
            err: false,
            errMsg: "",
            counter: 0,
            queriesArr: [],
            outputArr: [],
            numOfQueries: 0,
            currOutput: "",
            reveal: false,
            blackbox: "",
            genBlackBox: [],
            hash: {},
        })
    }

    acceptChallenge(){
        const temphash = {}
        this.state.queriesArr[0].forEach((ele)=>{
            temphash[parseInt(ele.trim())-1] = true
        })
        this.setState({
            accept:true,
            hash:temphash
        })
    }

    storeOutput(e){
        e.preventDefault()
        const output = this.state.currOutput
        // console.log(output)
        if(this.validateOutput(output)){
            let temparr = output.split(",")
            const temparr2 = []
            const hash={}
            let error=false
            temparr.forEach((ele)=>{
                let tempEle=ele.trim()
                let tempNum =parseInt(tempEle)
                if(hash[tempNum]&&!error){
                    alert("The output you have given contains duplicates, please remove all duplicates before trying again")
                    error=true
                }
                if(tempEle!=="" && !hash[tempNum]){
                    temparr2.push(tempNum)
                    hash[tempNum] = true
                }
            })
            if(temparr2.length === this.state.queriesArr[this.state.counter].length){
                const temparr3 = this.state.outputArr
                temparr3.push(temparr2)
                // console.log(temparr3)
                const temphash = {}
                if(this.state.counter<this.state.numOfQueries-1){
                    this.state.queriesArr[this.state.counter+1].forEach((ele)=>{
                        temphash[parseInt(ele.trim())-1] = true
                    })
                }
                this.setState({
                    counter: this.state.counter+1,
                    currOutput: "",
                    outputArr: temparr3,
                    err: false,
                    errMsg: "",
                    hash: temphash
                })
            }else{
                alert(`The output you have given does not contain the same amount of items specified by the input query\n\nSize of input query: ${this.state.queriesArr[this.state.counter].length}\nSize of output collection provided: ${temparr2.length}`)
            }
        }else{
            alert("Please check your input and follow the format specified exactly:\ne.g. <output>: 3, 5, 9, 2, 1")
        }
    }

    calculateBlackBox(){
        const hash ={}
        const universalSet=[]
        const outputArr = this.state.outputArr
        //generate univeral set
        for(let i =0; i<this.state.numOfQueries;i++){
            outputArr[i].forEach((ele)=>{
                if(!hash[ele]){
                    universalSet.push(ele)
                    hash[ele]=true
                }
            })
        }
        // generate complement of all the output arrays
        const outputArrComp =[]
        for(let i =0; i<this.state.numOfQueries; i++){
            const newarr =[]
            let hash2={}
            outputArr[i].forEach((ele)=>{
                hash2[ele] = true
            })
            universalSet.forEach((ele)=>{
                if(!hash2[ele]){
                    newarr.push(ele)
                }
            })
            outputArrComp.push(newarr)
        }
        const blackboxlist = []
        let leftover = []
    loop1:
        for (let i = 1; i <=this.state.size; i++) {
            let bitmask = 1
            let temparr = []
            let hash3 = {}
            if((i & bitmask)===bitmask){
                leftover=outputArr[0]
            }else{
                leftover=outputArrComp[0]
            }
            bitmask*=2
            for(let j=1;j<this.state.numOfQueries;j++){
                hash3={}
                temparr = []
                if((i & bitmask)=== bitmask){
                    for(let k=0; k<outputArr[j].length;k++){
                        const ele =outputArr[j][k]
                        hash3[ele] = true
                    }
                    // outputArr[j].forEach((ele)=>{
                    //     hash3[ele] = true
                    // })
                }else{
                    for(let k=0; k<outputArrComp[j].length;k++){
                        const ele =outputArrComp[j][k]
                        hash3[ele] = true
                    }
                    // outputArrComp[j].forEach((ele)=>{
                    //     hash3[ele] = true
                    // })
                }
                for(let k=0; k<leftover.length;k++){
                    const ele =leftover[k]
                    if(hash3[ele]){
                        temparr.push(ele)
                    }
                }
                // leftover.forEach((ele)=>{
                //     if(hash3[ele]){
                //         temparr.push(ele)
                //     }
                // })
                if(temparr.length===0){
                    console.log('missing elements')
                    this.setState({
                        err:true,
                        errMsg:"A dark void looms over your fate"
                    })
                    break loop1
                }else{
                    leftover=temparr
                }
                // console.log(bitmask)
                bitmask*=2
            }
            if(leftover.length>1){
                console.log('multiple elements')
                this.setState({
                    err:true,
                    errMsg:"Your fate shatters into fragments like shards of a broken mirror"
                })
                break
            }else{
                blackboxlist.push(leftover)
            }
        }
        // console.log(blackboxlist)
        this.setState({
            reveal:true,
            blackbox:blackboxlist
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
            <div className="container" style={{marginBottom:"35%"}}>
                <div className="flex-column align-content-center" style={{width:"100%"}}>
                    <div className="sub-intro" style={{textAlign:"center", fontSize:"3.5vmin"}}>Generate Black Box List</div>
                    <div className="regText" style={{textAlign:"center", marginTop:"1rem"}}>
                        First, declare the size of the black box list you are creating (between 1 and 99 items):
                        <br/>
                        <div style={{display:"flex", justifyContent:"center", marginTop:"1vmin"}}>
                            <div className="input-group" style={{width:"50%"}}>
                            <input type="text"
                                className="form-control regText"
                                name="size-input"
                                placeholder="e.g. 63"
                                value={this.state.size}
                                onChange={this.handleChange}
                                disabled={!this.state.canEdit}
                                // autoFocus={true} /* not supported on all browsers */
                                ref={this.focusInput}></input>
                                <div className="input-group-append">
                                    <button
                                        className={this.state.canEdit?"btn regText btn-danger":"btn regText btn-outline-secondary"}
                                        type="button"
                                        disabled={!this.state.canEdit}
                                        onClick={(e)=>this.declareSize(e)}
                                        style={!this.state.canEdit?{cursor:"not-allowed"}:{cursor:"pointer"}}
                                        >Declare
                                    </button>
                                    <button
                                        className={!this.state.canEdit?"btn regText btn-danger":"btn regText btn-outline-secondary"}
                                        type="button"
                                        disabled={this.state.canEdit}
                                        style={this.state.canEdit?{cursor:"not-allowed"}:{cursor:"pointer"}}
                                        onClick={(e)=>this.resetSize(e)}
                                        >Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                        {!this.state.canEdit&&
                            <div>
                                <div>
                                    <br/>
                                    Generated Black Box List:
                                    <br/>
                                    <div style={{fontSize:"3vmin", fontWeight:"bold", overflowY:"scroll", maxHeight:"20vmin"}}>
                                        [ {this.state.genBlackBox.map((ele, index)=>{
                                            return <GeneratedBlackBoxElement hash={this.state.hash} size={this.state.size} ele={ele} index={index} key={index}/>
                                        })}]
                                    </div>
                                    <br/>
                                    <b>Input:</b> [k<sub>1</sub>, k<sub>2</sub>, k<sub>3</sub>, ... k<sub>m</sub>] - Give me the k<sub>1</sub><sup>th</sup>, 
                                    k<sub>2</sub><sup>th</sup> ... and k<sub>m</sub><sup>th</sup> item in the list <br/>
                                    Output  (remove [] for actual input): [a<sub>k<sub>1</sub></sub>, a<sub>k<sub>2</sub></sub>, a<sub>k<sub>3</sub></sub>, ... a<sub>k<sub>m</sub></sub>] - 
                                    A collection containing the a<sub>k<sub>1</sub></sub><sup>th</sup>, a<sub>k<sub>2</sub></sub><sup>th</sup> ... and a<sub>k<sub>m</sub></sub><sup>th</sup> item in <b>random order</b><br/><br/>
                                    e.g. Black Box List of size 8: [2, 14, 9, 15, 3, 7, 11, 16]<br/><br/>
                                    <b>Input:</b> [1, 5, 7] - Give me the 1st, 5th and 7th item in the list <br/>
                                    <b>Output:</b> [3, 11, 2] -
                                    A collection containing the 1st, 5th and 7th item in <b>random order</b><br/><br/>
                                    Before receiving an answer, one must first give answers<br/><br/>
                                </div>
                                <div style={{fontSize:"3vmin", color:"red"}}>
                                    Now answer my queries truthfully:<br/>(Enter the items in red)
                                </div>
                                {!this.state.accept&&
                                    <div className="btn-group" style={{width:"60vmin", marginTop:"2vmin", marginBottom:"2vmin"}}>
                                        <button
                                            className={!this.state.canEdit?"btn regText btn-danger":"btn regText btn-outline-secondary"}
                                            type="button"
                                            onClick={(e)=>this.acceptChallenge(e)}
                                            style={this.state.canEdit?{cursor:"not-allowed"}:{cursor:"pointer"}}
                                            >Accept
                                        </button>
                                        <button
                                            className={this.state.canEdit?"btn regText btn-danger":"btn regText btn-outline-secondary"}
                                            type="button"
                                            disabled="true"
                                            style={!this.state.canEdit?{cursor:"not-allowed"}:{cursor:"pointer"}}
                                            >Reject
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                        {this.state.accept&&this.state.counter<this.state.numOfQueries &&
                            <div>
                                <br/>
                                I will ask a total of {this.state.numOfQueries} {this.state.numOfQueries===1?"query":"queries"} 
                                <br/>
                        <span style={{fontSize:"2vmin"}}>Number of queries asked: {(this.state.counter===this.state.numOfQueries-1)?<span style={{fontWeight:"bold", color:"red"}}>{this.state.counter} (1 more query)</span>:<span>{this.state.counter}</span>}</span><br/><br/>
                                <b>Input:</b> <br/>[ {this.state.queriesArr[this.state.counter].toString()} ]
                                <br/><br/>
                                {this.state.err&&
                                    <div>
                                        {this.state.errMsg}
                                        <br/><br/>
                                    </div>
                                }
                                <b>Output:</b>
                                <div style={{display:"flex", justifyContent:"center", marginTop:"1vmin"}}>
                                    <form onSubmit={(e)=>this.storeOutput(e)}>
                                        <div className="input-group">
                                            <input type="text" 
                                                className="form-control regText" 
                                                name="size-input"
                                                placeholder="e.g. 1, 8, 15, 3"
                                                value={this.state.currOutput}
                                                onChange={this.handleOutput}
                                                autoFocus={true}
                                                ></input>
                                            <div className="input-group-append">
                                                <button
                                                    className="btn regText btn-danger"
                                                    type="submit"
                                                    >Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                        {this.state.counter===this.state.numOfQueries && this.state.accept && !this.state.reveal &&
                            <div style={{display:"flex", justifyContent:"center", marginTop:"5vmin"}}>
                                <div style={{width:"40vmin"}}>
                                    <button
                                        className="btn-block regText btn-danger border-0"
                                        type="button"
                                        onClick={(e)=>this.calculateBlackBox(e)}
                                        style={{height:"5vmin"}}
                                        >Reveal your fate
                                    </button>
                                </div>
                            </div>
                        }
                        {this.state.reveal&&!this.state.err&&
                            <>
                                <div style={{fontSize:"2vmin"}}>
                                    <br/>
                                    By trial of fire, I bestow upon you the Blinding Light of Kars, the Divine Wind of Wamuu, and the Eternal Flames of Esidisi
                                    <br/><br/>
                                    Behold the contents of the black box list:
                                    <br/>
                                    <span style={{fontSize:"3vmin", fontWeight:"bold"}}>[ {this.state.blackbox.map((ele)=>{return (" "+ ele +" ")}).toString()} ]</span>
                                </div>
                                <br/>*if the answer does not match, please double check the output collection you provided
                                <Link to="/answer/paperblackbox" style={{textDecoration:"none", display:"flex", justifyContent:"center", marginTop:"2vmin"}}>
                                    <div style={{width:"60vmin"}}>
                                        <button type="button" className="btn-block btn-danger btn-font">
                                            Try writing the contents of the black box on paper instead
                                        </button>
                                    </div>
                                </Link>
                            </>
                        }
                        {this.state.reveal&&this.state.err&&
                            <div style={{fontSize:"2vmin"}}>
                                <br/>
                                Noo... It can't be.... My magic... fails me...
                                <br/><br/>
                                <span style={{color:"red", fontWeight:"bold"}}>Cannot proceed with prophecy:
                                <br/>{this.state.errMsg}</span>
                                <br/><br/>
                                Please double check the output collection you provided and try again.<br/>
                                Make sure you entered the items in red correctly.
                            </div>
                        }
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default CreateBlackBox;