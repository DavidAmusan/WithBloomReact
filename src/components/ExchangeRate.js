import React from 'react'
import {Form} from 'react-bootstrap'

export default function ExchangeRate(props) {
    const{
        message,
        selectedMessage,
        onChangeMessage,
        amount,
        onChangeAmount
    }=props
    return (
        <div>
       
    
        <span className="d-flex ">
    <Form.Control type="number" className="input"  value={amount} onChange={onChangeAmount}/>
        <select style={{width:"100px"}} value={selectedMessage} onChange={onChangeMessage}>
        {message.map(option=>(
            <option key={option} value={option}>{option}</option>
        ))}
        </select>
        </span>
        </div>
    )
}
