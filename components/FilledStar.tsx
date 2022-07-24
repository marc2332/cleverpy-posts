import { Star } from "react-feather";
import styled from "styled-components";

const FilledStar = styled(Star)`
  stroke: ${({ theme }) => theme.filledStar.fill};
  fill: ${({ theme }) => theme.filledStar.fill};
`;

export default FilledStar;
