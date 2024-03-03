type Props = {
  score: number;
  time: number;
};

const Title = ({ score, time }: Props) => {
  return (
    <header>
      <h1>{score} SCORE</h1>
      <h1>{time} SECONDS</h1>
    </header>
  );
};

export default Title;
