import { StyledCard } from "./styles";

type CardProps = {
  children: JSX.Element;
};

const Card = ({ children, ...props }: CardProps) => {
  return (
    <StyledCard data-testid="card" {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
