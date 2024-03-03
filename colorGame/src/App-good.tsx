import { useEffect, useState } from "react";
import { useMemo } from "react";
import Title from "./components/Title";
import { Button } from "./components/Button/Button";
import "./App.css";

type Color = {
  name: string;
  color: string;
  isCorrect: boolean;
};

const colors = [
  {
    name: "red",
    color: "#EF476F",
    isCorrect: false,
  },
  {
    name: "green",
    color: "#06D6A0",
    isCorrect: false,
  },
  {
    name: "blue",
    color: "#118AB2",
    isCorrect: false,
  },
  {
    name: "yellow",
    color: "#FFD166",
    isCorrect: false,
  },
];

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial",
  );
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameColors, setGameColors] = useState<Color[]>([]);
  const isCorrectColor = useMemo<Color>(
    () => gameColors.find((color) => color.isCorrect)!,
    [gameColors],
  );

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    const [isCorrectColor, wrongColor] = colors
      .slice()
      .sort(() => Math.random() - 0.5);

    setGameColors(
      [{ ...isCorrectColor, isCorrect: true }, wrongColor].sort(
        () => Math.random() - 0.5,
      ),
    );
  }

  const handleColorClick = (currentColor: string) => {
    // TODO
  };

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
      <Title score={score} time={time} />

      {status === "playing" && (
        <section>
          <span
            style={{ textTransform: "capitalize", color: gameColors[0].color }}
          >
            {isCorrectColor.name}
          </span>
        </section>
      )}
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
            <Button backgroundColor="red" onClick={handleColorClick} />
            <Button backgroundColor="green" onClick={handleColorClick} />
          </>
        )}
      </footer>
    </main>
  );
}

export default App;
