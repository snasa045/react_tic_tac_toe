import React, { useState } from "react";

export default function Player({ player, index, onPlayerNameUpdate }) {
  const [updatedPlayerName, setUpdatedPlayerName] = useState(player.name);

  return (
    <li className={player.isActive ? "active" : ""}>
      <span className='player'>
        {player.isEditing ? (
          <input
            type='text'
            required
            value={updatedPlayerName}
            onChange={(event) => setUpdatedPlayerName(event.target.value)}
          />
        ) : (
          <span className='player-name'>{player.name}</span>
        )}
        <span className='player-symbol'>{player.symbol}</span>
      </span>

      <button onClick={() => onPlayerNameUpdate(index, updatedPlayerName)}>
        {!player.isEditing ? "Edit" : "Save"}
      </button>
    </li>
  );
}
