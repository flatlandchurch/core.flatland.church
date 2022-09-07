import styled from 'styled-components';

const Button = styled.button<{ outline?: boolean }>`
  background: ${(props) => (props.outline ? 'transparent' : '#a8458c')};
  color: ${(props) => (props.outline ? '#a8458c' : '#fff')};
  border-radius: 50px;
  padding: 12px 68px;
  margin: 24px auto;
  display: block;
  appearance: none;
  border: 2px solid #a8458c;
  font-size: inherit;
  font-weight: 600;
  cursor: pointer;
`;

export default Button;
