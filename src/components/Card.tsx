import styled from 'styled-components';

const Card = styled.button.attrs({
  type: 'button',
})<{ active?: boolean }>`
  --shadow-color: 0deg 0% 55%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => (props.active ? '#a81897' : '#fff')};
  padding: 16px;
  color: ${(props) => (props.active ? '#fff' : '#2f3941')};
  box-shadow: 0.1px 0.2px 0.2px hsl(var(--shadow-color) / 0.51),
    0.3px 0.6px 0.7px -1px hsl(var(--shadow-color) / 0.46),
    0.7px 1.6px 1.8px -2px hsl(var(--shadow-color) / 0.42),
    1.8px 4px 4.6px -3px hsl(var(--shadow-color) / 0.37);
  cursor: pointer;
  appearance: none;
  border: 0;
  font-size: inherit;
  font-weight: inherit;
  width: 100%;
  text-align: left;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  span.material-icons-outlined {
    margin-right: 8px;
  }
`;

export default Card;
