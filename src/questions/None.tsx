import React from 'react';
import styled from 'styled-components';

import Label from '../components/Label';
import Card from '../components/Card';

const Heading = styled(Label)`
  margin-bottom: 12px;
`;

const ContainerCard = styled(Card)`
  display: block;
`;

const options = [
  {
    label: 'Committing my life to Jesus',
    value: '2690698',
  },
  { label: 'Getting Baptized in water', value: '2690699' },
  { label: 'Joining a Life Group', value: '2690700' },
  { label: 'Applying for Mentoring', value: '2690701' },
  { label: 'Applying for Coaching', value: '2690702' },
  { label: 'Joining a Ministry Team', value: '2690704' },
];

type Props = {
  values: Record<string, boolean>;
  onChange: (values: Record<string, boolean>) => void;
};

const None = (props: Props) => {
  return (
    <>
      <ContainerCard as="div">
        <Heading as="p">What is the next step in your spiritual journey?</Heading>
        {options.map((opt) => (
          <Card
            style={{ border: '1px solid #e9ebed' }}
            key={opt.value}
            active={props.values[opt.value]}
            onClick={() =>
              props.onChange({ ...props.values, [opt.value]: !props.values[opt.value] })
            }
          >
            <span className="material-icons-outlined">
              {props.values[opt.value] ? 'check_box' : 'check_box_outline_blank'}
            </span>
            <span>{opt.label}</span>
          </Card>
        ))}
      </ContainerCard>
    </>
  );
};

export default None;
