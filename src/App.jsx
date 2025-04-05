import { useState } from "react";

const palavrasPossiveis = ['legal', 'tenis', 'livro', 'teste', 'pinto', 'bolas', 'casal', 'carro', 'sigla', 'nobre',
  'fazer', 'termo', 'assim', 'fosse', 'moral', 'sobre', 'poder', 'senso', 'justo', 'honra', 'muito', 'sonho', 'ideia'
]
const palavraDoDia = palavrasPossiveis[Math.round(Math.random() * (palavrasPossiveis.length + 1))];

export function App() {
  const [tentativas, setTentativas] = useState([]);
  const [entradaAtual, setEntradaAtual] = useState('');
  const [resultado, setResultado] = useState([]);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  function verificarTentativa(tentativa) {
    const res = Array(5).fill('cinza');
    const letrasUsadas = [];

    for(let i = 0; i < 5; i++){
      if(tentativa[i] === palavraDoDia[i]){
        res[i] = 'verde';
        letrasUsadas.push(i);
      }
    }

    for(let i = 0; i < 5; i++) {
      if(res[i] === 'cinza') {
        for(let j = 0; j < 5; j++) {
          if(!letrasUsadas.includes(j) && tentativa[i] === palavraDoDia[j]) {
            res[i] = 'amarelo';
            letrasUsadas.push(j);
            break;
          }
        }
      }
    }

    return res;
  };

function handleSubmit() {
  if(entradaAtual.length !== 5) {
    alert('Palavra inválida!');
    return;
  }

  const novaTentativas = [...tentativas, entradaAtual];
  const novoResultado = [...resultado, verificarTentativa(entradaAtual)];

  setTentativas(novaTentativas);
  setResultado(novoResultado);
  setEntradaAtual('');

  if (entradaAtual === palavraDoDia || novaTentativas.length === 6) {
    setFimDeJogo(true);
  }
}

  return (
    <div>
      {!fimDeJogo ? (
        <div>
          <input
            maxLength={5}
            value={entradaAtual}
            onChange={(e) => setEntradaAtual(e.target.value.toLowerCase())}
          />
          <button onClick={handleSubmit}>Enviar</button>
        </div>
      ) : (
        <p>Fim de jogo! A palavra era: {palavraDoDia}</p>
      )}

      {tentativas.map((tentativa, i) => (
        <div key={i}>
          {tentativa.split('').map((letra, j) => (
            <span key={j} style={{ marginRight: 5 }}>
              {letra.toUpperCase()} ({resultado[i][j]})
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}