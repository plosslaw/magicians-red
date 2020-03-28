import React from 'react';

const GeneratedBlackBoxElement =(props)=>{
    const ele = parseInt(props.ele)
    const index = props.index
    const size = props.size
    let eleStyle={}

    console.log(props.hash)
    if(props.hash[index]){
        eleStyle={color:"red", textDecoration:"underline"}
        console.log('working')
    }

    if(index === size-1){
        return(
            <span> <span style={eleStyle}>{ele}</span> </span>
        )
    }else{
        return(
            <span> <span style={eleStyle}>{ele}</span> ,</span>
        )
    }
}

export default GeneratedBlackBoxElement