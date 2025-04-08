export default function Log({gameTurns}) {
  return <ol id='log'>
    {gameTurns.map((turn) => (
        <li key={`${turn.square.row}-${turn.square.cell}`}>
            <span className='log-entry'>
            {`Player ${turn.player} played at row ${turn.square.row}, cell ${turn.square.cell}`}
            </span>
        </li>
    ))}
    </ol>;
}
