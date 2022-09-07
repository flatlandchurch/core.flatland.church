import styled from 'styled-components';

import Card from '../components/Card';

const CardContainer = styled(Card)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 8px;
`;

export default CardContainer;
