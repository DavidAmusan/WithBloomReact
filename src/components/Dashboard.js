import React, { useState,useEffect} from 'react'
import {Container, Nav, Navbar, Card} from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import  ExchangeRate  from './ExchangeRate';
import {useAuth} from '../context/AuthContext'

import './Login.css';
import SeeCoins from './SeeCoins';


const BASE_URL= 'https://staging-biz.coinprofile.co/v3/currency/rate'


export default function Dashboard() {
    const {logout} = useAuth()
    const [message, setMessage]= useState([])
    const [fromMessage, setFromMessage]=useState([])
    const [toMessage, setToMessage]=useState([])
    const [toRate, setToRate]=useState(1)
    const [toRateFrom, setToRateFrom]=useState(true)
    const [exchangeRate, setExchangeRate]=useState()
    const[amount, setAmount]= useState(1)
    const navigate= useNavigate()
    const [amountInFromMessage, setAmountInFromMessage]= useState(true)
    const [change, setChange]= useState(true)
    const [changer, setChanger]= useState(false)

        function changed(){
            setChange(!change)
            setChanger(!changer)
        }
      function logOut(){
        logout()
        navigate("/login")   
    }
   let toAmount, fromAmount

   if(amountInFromMessage){
       fromAmount= amount
       toAmount= amount * exchangeRate
   }else{
       toAmount= amount
       fromAmount= amount/exchangeRate
   }


    useEffect(()=>{
        fetch(BASE_URL).then(res=> res.json())
        .then(data=>{const firstMessage= Object.keys(data.data.rates)[0]
            const secondMessage= Object.keys(data.data.rates)[1]
            setMessage([...Object.keys(data.data.rates)])
            setToMessage(secondMessage)
            setFromMessage(firstMessage)
            setExchangeRate(data.data.rates[firstMessage].rate)
        })
            
    },[1])

    useEffect(()=>{
        if( fromMessage!=null && toMessage !=null){
        fetch(`${BASE_URL}?base=${fromMessage}&symbols=${toMessage}`).then(res=> res.json()).then(data=>
        setExchangeRate(data.data.rates[fromMessage].rate))
      }  },[fromMessage,toMessage])

    function handleFromAmountChnage(e){
        setAmount(e.target.value)
        setAmountInFromMessage(true)
    }

    function handleToAmountChnage(e){
        setAmount(e.target.value)
        setAmountInFromMessage(false)
    }
    return (
        <div id="wrapper">
            <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="https://www.payourse.com/"><h1 className="LogoText">WithBloom</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {change && <Nav.Link><button type="submit" className="payButton" onClick={changed}>Coin Explorer</button>
</Nav.Link>}
 {changer && <Nav.Link><button type="submit" className="payButton" onClick={changed}>Rate Calculator</button>
</Nav.Link>}
      </Container>
    </Navbar>
    <section className='title'>
    <Card>
    {change && <h1 className="convertText"><span className="in">Currency Converter</span></h1>}
    <span className="LoginField">
    <div change>
    {change && <ExchangeRate message={message} selectedMessage={fromMessage} onChangeMessage={e => setFromMessage(e.target.value)}
        amount={fromAmount} onChangeAmount={handleFromAmountChnage}
    ></ExchangeRate>}

        {change&& <div className="eq">=</div>}
        <div style={{marginBottom:"30px"}}> 
        {change && <ExchangeRate message={message} selectedMessage={toMessage} onChangeMessage={e => setToMessage(e.target.value)}
                    amount={toAmount} onChangeAmount={handleToAmountChnage}
        ></ExchangeRate>}
        </div>
        {changer && <SeeCoins message={message}></SeeCoins>}
        <button type="submit" className="payButton" onClick={logOut}>Log Out</button>
        </div>
    </span>
    </Card>
  
   
    </section>
        </div>
    )
}
