import { StyledCard } from "./styles";

type CardProps = {
  children: JSX.Element;
};

const Card = ({ children }: CardProps) => {
  return <StyledCard data-testid="card">{children}</StyledCard>;
};

export default Card;
