import React from 'react'; 
import Board from './Board';
import './Game.css'

export default class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0, 
      xIsNext: true,
    }
    this.reset = this.reset.bind(this)
    console.log('hey')
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    //ignores clicks if someone else has won
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }
  reset(){
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0, 
      xIsNext: true,
    })
  }

  render(){
    const history = this.state.history; 
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)
    let status;
    if (winner && winner !== 'draw'){
      status = 'Winner ' + winner
    } else if(winner && winner === 'draw'){
      status = 'It is a ' + winner
    }
     else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return(
      <div className='game'>
        <div className='title'>
          <h1>Tic Tac Toe</h1>
          
        </div>
        
        <div className='game-board'>
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{ status }</div>
        </div>
        <button className='reset' onClick={this.reset}>New Game </button>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    else if (!squares.includes(null)){
      return 'draw'
    }
  }
  return null;
}
