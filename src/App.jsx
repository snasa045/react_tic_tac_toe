import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const players = [
    { name: "Player 1", symbol: "X", isEditing: false, isActive: false },
    { name: "Player 2", symbol: "O", isEditing: false, isActive: false },
  ];
  const [playerList, setPlayerList] = useState(players);
  const [currentPlayer, setCurrentPlayer] = useState(players[0].symbol);
  const [currentPlayerName, setCurrentPlayerName] = useState(players[0].name);

  const onUpdatePlayerList = (index, updatedPlayerName) => {
    let updatedPlayers = [...playerList];
    let playerToEdit = updatedPlayers[index];
    playerToEdit = {
      ...playerToEdit,
      name: updatedPlayerName,
      isEditing: !playerToEdit.isEditing,
    };
    updatedPlayers[index] = playerToEdit;
    setPlayerList(updatedPlayers);
    setCurrentPlayer(updatedPlayers[0].symbol);
    setCurrentPlayerName(updatedPlayers[0].name);
  };

  const onUpdatePlayerDetails = () => {
    setCurrentPlayer(
      currentPlayer === playerList[0].symbol
        ? playerList[1].symbol
        : playerList[0].symbol
    );
    setCurrentPlayerName(
      currentPlayerName === playerList[0].name
        ? playerList[1].name
        : playerList[0].name
    );
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
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
        />
      </div>
      LOG
    </main>
  );
}

export default App;
