import React from 'react'
import {Form} from 'react-bootstrap'
import {useState} from 'react' 


export default function SeeCoins(props) {
    const [searchTerm, setSearchTerm]= useState('')
    const{
        message,
        selectedMessage,
        onChangeMessage,
        amount,
        onChangeAmount
    }=props
    return (
        <div>
            <Form.Control type="text" className="input"  placeholder="Search coins..." onChange={e=>{setSearchTerm(e.target.value)}}/>
            <div className="dataResult">
            {message.filter((val)=>{
                if(searchTerm == ""){
                    return val
                }else if (val.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((val,key)=>{
                return  <span key={key}><p>{val}</p></span>
            })}
            </div>
        </div>
    )
}
