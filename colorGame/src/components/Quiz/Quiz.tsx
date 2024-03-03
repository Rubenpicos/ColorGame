import "./Quiz.css";

type Props = {
  colorOptionHex: string;
  colorOptionName: string;
};

export const Quiz = ({ colorOptionHex, colorOptionName }: Props) => {
  return (
    <section>
      <span style={{ color: colorOptionHex }}>{colorOptionName}</span>
    </section>
  );
};
