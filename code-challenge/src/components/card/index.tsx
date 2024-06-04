import { StyledCard } from "./styles";

type CardProps = {
  children: JSX.Element;
};

const Card = ({ children }: CardProps) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
