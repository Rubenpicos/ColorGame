import "./Button.css";

type Props = {
  backgroundColor: string;
  onClick: (backgroundColor: string) => void;
};

export const Button = ({ backgroundColor, onClick }: Props) => {
  const onClickColor = () => {
    onClick(backgroundColor);
  };

  return (
    <button
      className="button"
      style={{ backgroundColor: backgroundColor }}
      onClick={onClickColor}
    />
  );
};
