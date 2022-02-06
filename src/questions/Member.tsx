import React from 'react';
import styled from 'styled-components';

import Card from '../components/Card';
import Label from '../components/Label';

type Props = {
  values: Record<string, boolean>;
  onChange: (values: Record<string, boolean>) => void;
};

const ContainerCard = styled(Card)`
  display: block;
`;

const Header = styled(Label)`
  margin-bottom: 12px;
`;

const options = [
  {
    value: '2690722',
    label: 'Becoming a Mentor',
  },
  { value: '2690723', label: 'Becoming a Coach' },
  { value: '2690724', label: 'Becoming a Life Group Leader' },
];

const Member = (props: Props) => {
  return (
    <ContainerCard as="div">
      <Header as="p">Which disciple making role would you like to explore?</Header>
      {options.map((opt) => (
        <Card
          style={{ border: '1px solid #e9ebed' }}
          key={opt.value}
          active={props.values[opt.value]}
          onClick={() => props.onChange({ ...props.values, [opt.value]: !props.values[opt.value] })}
        >
          <span className="material-icons-outlined">
            {props.values[opt.value] ? 'check_box' : 'check_box_outline_blank'}
          </span>
          <span>{opt.label}</span>
        </Card>
      ))}
    </ContainerCard>
  );
};

export default Member;
