import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap'

class SubmissionModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            answer:""
        }
        // this.submitAndDismissModal = this.submitAndDismissModal.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    validateAnswer(ans){
        // const ansRGEX = /^\[+[0-9,\s]+\]$/
        const ansRGEX = /^[0-9,\s]*$/
        return ansRGEX.test(ans)
    }
    
    submitAndDismissModal(event){
        const ele = this.state.answer
        if(this.validateAnswer(ele)){
            // let query = ele.substr(1,ele.length-2).split(",")
            let query = ele.split(",")
            const temparr =[]
            const temparr2 = []
            const hash={}
            query.forEach((ele)=>{
                let tempEle=ele.trim()
                if(tempEle!=="" && !hash[ele]){
                    temparr2.push(tempEle)
                    hash[ele] = true
                }
            })
            temparr2.forEach((ele)=>{
                temparr.push(parseInt(ele))
            })
            if(temparr2.length===this.props.size){
                // console.log(temparr)
                this.props.submitHandler(temparr,event)
                this.props.onHide(event)
                this.setState({
                    answer:""
                })
            }else{
                alert(`Hint: Your answer should contain exactly as many items as the size of the black box list you generated and should not contain duplicates\n\nSize of black box list: ${this.props.size}\nSize of your answer: ${temparr2.length}`)
            }
        }else{
            alert("Please check your answer and follow the format specified exactly:\ne.g. <answer>: 3, 5, 9, 2, 1")
        }
    }

    handleChange(event){
        this.setState({
            answer: event.target.value
        })
    }
    
    render(){
        const childProps = {show:this.props.show, onHide:this.props.onHide}
        const headerStyle={textAlign:"center", paddingBottom:"0.2rem"}
        return (
            <>
                <Modal
                {...childProps}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Final Answer Submission
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h5 style={headerStyle}>Are you sure you want to submit?</h5> 
                            <input type="text" 
                                className="form-control"
                                style={{fontSize:"1rem"}} 
                                name="query-input"
                                placeholder= "e.g. [1, 5, 7, 10]"
                                value={this.state.answer}
                                onChange={this.handleChange}
                                />
                            <p style={{fontSize:"0.8rem", color:"red", marginTop:"0.8rem"}}>
                                You only have ONE attempt to submit the final answer,
                                you will fail this challenge if you submit the wrong answer
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={(e)=>this.submitAndDismissModal(e)}>Submit</Button>
                        <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default SubmissionModal;