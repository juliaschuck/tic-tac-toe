import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Quadrado = (props) => {
  return (
    <button className="quadrado" onClick={props.onClickEvent}>
      {props.value}
    </button> 
  );
};

const Borda = () => {

  const inicioQuadrados = Array(9).fill(null);
  const [squares, setSquares] = useState(inicioQuadrados);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const novosQuadrados = [...squares];

    const declaradoVencedor = Boolean(calcularVencedor(novosQuadrados));
    const quadradoPreenchido = Boolean(novosQuadrados[i]);
    if (declaradoVencedor || quadradoPreenchido) {
      return;
    }

    novosQuadrados[i] = xIsNext ? 'X' : 'O';
    setSquares(novosQuadrados);
    setXIsNext(!xIsNext);
  };

  const renderItem = (i) => {
    return (
      <Quadrado value={squares[i]} onClickEvent={() => handleClick(i)}/>
    )
  }

  const vencedor = calcularVencedor(squares);
  const status = vencedor ? `Vencedor: ${vencedor}` : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderItem(0)} {renderItem(1)} {renderItem(2)}
      </div>
      <div className="board-row">
        {renderItem(3)} {renderItem(4)} {renderItem(5)}
      </div>
      <div className="board-row">
      {renderItem(6)} {renderItem(7)} {renderItem(8)}
      </div>
    </div>
  );
};

const Principal = () => {
  return (
    <div className="game">
      Jogo da Velha
      <Borda/>
    </div>
  )
}

ReactDOM.render(
  <Principal/>,
  document.getElementById('root')
);

function calcularVencedor(squares) {
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //colunas
    [0, 4, 8], [2, 4, 6], //diagonais
  ];

  for (let linha of linhas) {
    const [a, b, c] = linha;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; //X ou O
    }
  }

  return null;
}