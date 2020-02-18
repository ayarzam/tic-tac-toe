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
  }

  handleClick(i){
    const history = this.state.history;
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
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
  /*
  This section adds the ability to go back to a previous move
  I found this unnecessary This along with the most of the other commented out code is used for this purpose I didn't remove it because I want to be able to look back at it this is a function that is called in the render method
  Also included in this is the stepNumber in the constructor 
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  */
  render(){
    const history = this.state.history; 
    const current = history[history.length - 1]
    // const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    /*
    This section adds the ability to go back to a previous move
    I found this unnecessary 

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move: 
      'Go to game start'
      return (
        <li key={move}> 
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    */
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
          {/* <ol>{moves}</ol> */}
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
