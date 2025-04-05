import "./App.css";
import { useState } from "react";

const palavrasPossiveis = [
  "legal",
  "tenis",
  "livro",
  "teste",
  "pinto",
  "bolas",
  "casal",
  "carro",
  "sigla",
  "nobre",
  "fazer",
  "termo",
  "assim",
  "fosse",
  "moral",
  "sobre",
  "poder",
  "senso",
  "justo",
  "honra",
  "muito",
  "sonho",
  "ideia",
];
const palavraDoDia =
  palavrasPossiveis[Math.round(Math.random() * (palavrasPossiveis.length + 1))];

export function App() {
  const [tentativas, setTentativas] = useState([]);
  const [entradaAtual, setEntradaAtual] = useState("");
  const [resultado, setResultado] = useState([]);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  function verificarTentativa(tentativa) {
    const res = Array(5).fill("var(--pearl)");
    const letrasUsadas = [];

    for (let i = 0; i < 5; i++) {
      if (tentativa[i] === palavraDoDia[i]) {
        res[i] = "var(--green)";
        letrasUsadas.push(i);
      }
    }

    for (let i = 0; i < 5; i++) {
      if (res[i] === "var(--pearl)") {
        for (let j = 0; j < 5; j++) {
          if (!letrasUsadas.includes(j) && tentativa[i] === palavraDoDia[j]) {
            res[i] = "var(--yellow)";
            letrasUsadas.push(j);
            break;
          }
        }
      }
    }

    return res;
  }

  function handleSubmit() {
    if (entradaAtual.length !== 5) {
      alert("Palavra inválida!");
      return;
    }

    const novaTentativas = [...tentativas, entradaAtual];
    const novoResultado = [...resultado, verificarTentativa(entradaAtual)];

    setTentativas(novaTentativas);
    setResultado(novoResultado);
    setEntradaAtual("");

    if (entradaAtual === palavraDoDia || novaTentativas.length === 6) {
      setFimDeJogo(true);
    }
  }

  // function letraContainer(letter, color) {
  //   return (
  //     <>
  //       <span key={letter} style={{ marginRight: 5 }}>
  //         {letter.toUpperCase()} ({color})
  //       </span>
  //     </>
  //   );
  // }
  console.log(tentativas);
  console.log(resultado)

  return (
    <>
      <div className="divContainer">
        <h2>Palavra</h2>
        {!fimDeJogo ? (
          <div className="inputBtnContainer">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                className="inputTermo"
                maxLength={5}
                value={entradaAtual}
                onChange={(e) => setEntradaAtual(e.target.value.toLowerCase())}
              />
            </form>
          </div>
        ) : (
          <p>Fim de jogo! A palavra era: {palavraDoDia}</p>
        )}

        {tentativas.map((tentativa, i) => (
          <div key={i} className="tryContainer">
            {tentativa.split("").map((letra, j) => (
              <span className="letterSpan" key={j} style={{ marginRight: 5, backgroundColor: resultado[i][j] }}>
                {letra.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
