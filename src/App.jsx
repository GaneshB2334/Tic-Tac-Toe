import React, { useRef, useState, useMemo } from 'react';
import X from '/X.png';
import O from '/O.png';

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isStart, setIsStart] = useState(false);
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [playerState, setPlayerState] = useState(isPlayerX);
  const [winner, setWinner] = useState(null);
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [countUser1, setCountUser1] = useState(0);
  const [countUser2, setCountUser2] = useState(0);

  const handleClick = (i) => {
    if (board[i] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = isPlayerX ? 'X' : 'O';
    setBoard(newBoard);
    setIsPlayerX(!isPlayerX);

    if (checkWinner(newBoard)) {
      setWinner(checkWinner(newBoard));
    } else {
      setIsPlayerX(!isPlayerX);
    }
    console.log(playerState);
  };

  const checkWinner = (board) => {
    const matches = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < matches.length; i++) {
      const [a, b, c] = matches[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === 'X') {
          setCountUser1(countUser1 + 1);
        } else {
          setCountUser2(countUser2 + 1);
        }
        return board[a];
      }
    }
    return null;
  };
  const renderBox = useMemo(
    () => (i) => (
      <div
        key={i}
        className="w-[100px] h-[100px] bg-gray-400 cursor-pointer hover:scale-105 transition-all rounded-2xl p-5 max-md:h-[60px] max-md:w-[60px] max-md:p-1"
        onClick={() => {
          handleClick(i);
        }}
      >
        <img src={board[i] === 'X' ? X : board[i] === 'O' ? O : ''} alt="" />
      </div>
    ),
    [board]
  );

  const handleStart = () => {
    setIsStart(!isStart);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerX(!playerState);
    setWinner(null);
    setPlayerState(isPlayerX);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-6xl m-2 text-center font-bold text-teal-500 max-md:text-3xl">Tic Tac Toe</h1>
      {isStart && <div className='text-xl font-semibold flex flex-col justify-center items-center m-5 text-teal-500'>
        <p>Winnings</p>
        <p>{user1 ? user1 : "X"}: {countUser1}</p>
        <p>{user2 ? user2 : 'O'}: {countUser2}</p>
      </div>}
      {isStart ? (<> <h1 className="text-4xl m-5 text-center font-bold text-teal-500 max-md:text-lg">
        {winner ? `Winner is ${winner === 'X' ? user1 ? user1 : 'X' : user2 ? user2 : 'O'}` : `Next Player is ${isPlayerX ? user1 != '' ? user1 : 'X' : user2 != '' ? user2 : 'O'}`}
      </h1>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-5">
            {renderBox(0)}
            {renderBox(1)}
            {renderBox(2)}
          </div>
          <div className="flex gap-5">
            {renderBox(3)}
            {renderBox(4)}
            {renderBox(5)}
          </div>
          <div className="flex gap-5">
            {renderBox(6)}
            {renderBox(7)}
            {renderBox(8)}
          </div>
          <button
            className="bg-blue-400 p-5 text-center w-32 text-xl font-semibold rounded-full shadow-2xl shadow-black hover:scale-105 transition-all max-md:w-24 max-md:p-3 max-md:text-sm mb-10"
            onClick={handleReset}
          >
            Reset
          </button>
        </div></>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 p-3">
          <input
            type="text"
            className="p-5 text-center w-64 text-xl font-semibold rounded-full shadow-2xl shadow-black border-dashed border-2 border-teal-800 outline-none max-md:p-2 max-md:w-52"
            value={user1}
            onChange={(e) => setUser1(e.target.value)}
            placeholder="Enter Player 1 Name"
          />
          <input
            type="text"
            className="p-5 text-center w-64 text-xl font-semibold rounded-full shadow-2xl shadow-black border-dashed border-2 border-teal-800 outline-none max-md:p-2 max-md:w-52"
            value={user2}
            onChange={(e) => setUser2(e.target.value)}
            placeholder="Enter Player 2 Name"
          />
          <button
            className="bg-blue-400 p-5 text-center w-32 text-xl font-semibold rounded-full shadow-2xl shadow-black hover:scale-105 transition-all max-md:w-24 max-md:p-3 max-md:text-sm"
            onClick={handleStart}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
