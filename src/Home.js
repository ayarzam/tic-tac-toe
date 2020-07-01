import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

export default function(){
  return(
    <div className='container'>
      <div className='homePageInfo'>
          <h1>Tic Tac Toe</h1>
          <h4>Please select one</h4>
      </div>
       <div className='links'>
         <button className='linkButton'><Link to="/singlePlayer">Single Player Game</Link></button>
          <button className='linkButton'><Link to="/twoPlayer">Two Player Game</Link></button> 
       </div>
      
    </div>
  )
}