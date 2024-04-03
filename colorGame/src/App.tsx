import { useEffect, useState } from "react";
import { useMemo } from "react";
import "./App.css";

//The primary colors only. You can add more if you want// Solo los colores primarios. Se pueden añadir más
type Color = {
  name: string;
  color: string;
  correct: boolean;
};

const colors = [
  {
    name: "red",
    color: "#EF476F",
    correct: false,
  },
  {
    name: "green",
    color: "#06D6A0",
    correct: false,
  },
  {
    name: "blue",
    color: "#118AB2",
    correct: false,
  },
  {
    name: "yellow",
    color: "#FFD166",
    correct: false,
  },
];

// The main function// La función principal

function App() {
  //Const for the differents states if the game/ Constantes para los diferentes estados del juego.
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial",
  );
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameColors, setGameColors] = useState<Color[]>([]);
  const correctColor = useMemo<Color>(
    () => gameColors.find((color) => color.correct)!,
    [gameColors],
  );

  //Funtion to start the game// Función para comenzar el juego.
  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    //Select the colors of the "colors" array// Seleciona los colores del array "colors"
    const [correctColor, wrongColor] = colors
      .slice()
      //Generate a random color// Genera un color aleatorio.
      .sort(() => Math.random() - 0.5);
    //Add correct and wrong property to the colors when starts the game // Agrega las propiedades de correcto e incorrecto a los colores cuando se inicia el juego
    setGameColors(
      [{ ...correctColor, correct: true }, wrongColor].sort(
        () => Math.random() - 0.5,
      ),
    );
  }
  //Function for the score and the finish the game// Función para la puntuación y finalizar el juego.
  function handleColorClick(clickedColor: Color) {
    if (clickedColor.correct) {
      setScore((score) => score + 1);

      if (score === 9) {
        setStatus("finished");
      } else {
        const [correctColor, wrongColor] = colors
          .slice()
          .sort(() => Math.random() - 0.5);
        setGameColors(
          [{ ...correctColor, correct: true }, wrongColor].sort(
            () => Math.random() - 0.5,
          ),
        );
      }
    }
  }

  // The crono// El crono
  useEffect(() => {
    let interval: number;
    if (status === "playing") {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <main>
      {/* //The header// La cabecera */}
      <header>
        <h1>{score} SCORE</h1>
        <h1>{time} SECONDS</h1>
      </header>
      {/* //Render the colors//Renderiza el comienzo del juego dejando ver los colores. */}
      {status === "playing" && (
        <section>
          <span
            style={{ textTransform: "capitalize", color: gameColors[0].color }}
          >
            {correctColor.name}
          </span>
        </section>
      )}
      {/* //The buttons to the differents options// Los botones para las diferentes
      opciones del juego. */}
      <footer>
        {status === "initial" && (
          <button style={{ fontSize: 32 }} onClick={handlePlay}>
            Play
          </button>
        )}
        {status === "finished" && (
          <button style={{ fontSize: 32 }} onClick={() => setStatus("initial")}>
            Restart
          </button>
        )}
        {status === "playing" && (
          <>
            <button
              onClick={() => handleColorClick(gameColors[0])}
              style={{
                width: 128,
                height: 128,
                backgroundColor: gameColors[0].color,
              }}
            ></button>
            <button
              onClick={() => handleColorClick(gameColors[1])}
              style={{
                width: 128,
                height: 128,
                backgroundColor: gameColors[1].color,
              }}
            ></button>
          </>
        )}
      </footer>
    </main>
  );
}

export default App;
