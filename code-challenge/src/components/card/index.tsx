import { StyledCard } from "./styles";

type CardProps = {
  children: JSX.Element;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const Card = ({ children, onClick, style, ...props }: CardProps) => {
  return (
    <StyledCard data-testid="card" onClick={onClick} style={style} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
