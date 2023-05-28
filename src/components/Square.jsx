function Square({value, position, handleClick}) {
  return (
    <div className="square" onClick={() => handleClick(position)}>
        {value}
    </div>
  )
}

export default Square