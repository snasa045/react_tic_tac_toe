import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

const players = [
  { name: "Player 1", symbol: "X", isEditing: false, isActive: false },
  { name: "Player 2", symbol: "O", isEditing: false, isActive: false },
];

function App() {
  const [playerList, setPlayerList] = useState(players);
  const [currentPlayer, setCurrentPlayer] = useState(players[0].symbol);
  const [currentPlayerName, setCurrentPlayerName] = useState(players[0].name);
  const [gameTurns, setGameTurns] = useState([]);

  const onUpdatePlayerList = (index, updatedPlayerName) => {
    let updatedPlayers = [...playerList];
    let playerToEdit = updatedPlayers[index];
    playerToEdit = {
      ...playerToEdit,
      name: updatedPlayerName,
      isEditing: !playerToEdit.isEditing,
      isActive: !playerToEdit.isActive,
    };
    updatedPlayers[index] = playerToEdit;
    setPlayerList(updatedPlayers);
    setCurrentPlayer(updatedPlayers[0].symbol);
    setCurrentPlayerName(updatedPlayers[0].name);
  };

  const onUpdatePlayerDetails = (rowIndex, cellIndex) => {
    setCurrentPlayer((curActivePlayer) =>
      curActivePlayer === playerList[0].symbol
        ? playerList[1].symbol
        : playerList[0].symbol
    );

    setCurrentPlayerName((curActivePlayerName) =>
      curActivePlayerName === playerList[0].name
        ? playerList[1].name
        : playerList[0].name
    );

    setPlayerList((curActivePlayerList) => {
      return [
        ...curActivePlayerList.map((player) => ({
          ...player,
          isActive: currentPlayer !== player.symbol,
        })),
      ];
    });

    setGameTurns((prevTurns) => [
      { square: { row: rowIndex, cell: cellIndex }, player: currentPlayerName },
      ...prevTurns,
    ]);
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          {playerList.map((player, index) => (
            <Player
              key={index}
              player={player}
              index={index}
              onPlayerNameUpdate={onUpdatePlayerList}
            />
          ))}
        </ol>
        <GameBoard
          currentPlayer={currentPlayer}
          currentPlayerName={currentPlayerName}
          onUpdatePlayerDetails={onUpdatePlayerDetails}
          resetGameTurns={() => setGameTurns([])}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
