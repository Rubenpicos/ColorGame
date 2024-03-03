import { useEffect, useState } from "react";
import { useMemo } from "react";
import Title from "./components/Title";
import { Button } from "./components/Button/Button";
import "./App.css";
import { Quiz } from "./components/Quiz/Quiz";

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

const generateHexColor = () => {
  // TODO
  return { colorName: "purple", hex: "#c77fe0" };
};

function App() {
  const [colorOption, setColorOption] = useState({
    colorName: "red",
    hex: "red",
  });

  const handleColorClick = (currentColor: string) => {
    // TODO
    if (currentColor === colorOption.hex) {
      const newColor = generateHexColor();
      setColorOption(newColor);
    }
  };

  return (
    <main>
      <Title score={0} time={0} />
      <Quiz
        colorOptionHex={colorOption.hex}
        colorOptionName={colorOption.colorName}
      />

      <footer>
        <Button backgroundColor="red" onClick={handleColorClick} />
        <Button backgroundColor="green" onClick={handleColorClick} />
      </footer>
    </main>
  );
}

export default App;
