import React, { useState } from 'react';
import styled from 'styled-components';

import Card from './components/Card';
import Questions from './Questions';
import Label from './components/Label';
import Input from './components/Input';

const Form = styled.form`
  width: 640px;
  max-width: 95%;
  margin: -124px auto 12px;
`;

const Header = styled.header`
  width: 100%;
  background: #6a27b8;
  background: linear-gradient(
    335deg,
    hsl(268deg 65% 44%) 0%,
    hsl(283deg 74% 39%) 11%,
    hsl(296deg 95% 33%) 22%,
    hsl(306deg 100% 33%) 33%,
    hsl(314deg 100% 36%) 44%,
    hsl(320deg 100% 38%) 56%,
    hsl(325deg 100% 39%) 67%,
    hsl(329deg 100% 40%) 78%,
    hsl(335deg 92% 43%) 89%,
    hsl(343deg 74% 48%) 100%
  );
  padding: 120px 24px;
  display: block;
`;

const CardContainer = styled(Card)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 8px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 8px;
`;

const Rule = styled.div`
  height: 1px;
  display: block;
  width: 100%;
  background: #d0d4d7;
  margin: 24px 0;
`;

const Small = styled.p`
  margin-bottom: 12px;
  font-size: 12px;
  color: #68737d;
`;

const Button = styled.button`
  background: #a8458c;
  color: #fff;
  border-radius: 50px;
  padding: 12px 68px;
  margin: 24px auto;
  display: block;
  appearance: none;
  border: 0;
  font-size: inherit;
  font-weight: 600;
  cursor: pointer;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 24px;
`;

type OptionValue = 'leader' | 'mentor' | 'member' | 'none';
type Option = {
  label: string;
  value: OptionValue;
};

const options: Option[] = [
  {
    label: 'I am a Life Group or Team Leader',
    value: 'leader',
  },
  {
    label: 'I am a Mentor or Coach',
    value: 'mentor',
  },
  {
    label: 'I am in a Life Group or on a Ministry Team',
    value: 'member',
  },
  {
    label: 'I am not currently involved beyond Sunday gatherings',
    value: 'none',
  },
];

const App = () => {
  const [involvement, setInvolvement] = useState<OptionValue | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await fetch('/.netlify/functions/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((d) => d.json());
    console.log(token);
  };

  return (
    <>
      <Header />
      <Form onSubmit={onSubmit}>
        <Title>Core Night Response</Title>
        <CardContainer as="div" style={{ marginBottom: 24 }}>
          <Row>
            <Input autoComplete="given-name" label="First Name" value="" onChange={() => {}} />
            <Input autoComplete="family-name" label="Last Name" value="" onChange={() => {}} />
          </Row>
          <Input
            autoComplete="email"
            type="email"
            label="Email Address"
            value=""
            onChange={() => {}}
          />
        </CardContainer>
        <Label as="p">What is your current involvement at Flatland?</Label>
        <Small>Check only the first box that applies.</Small>
        {options.map((opt) => (
          <Card
            active={involvement === opt.value}
            onClick={() => setInvolvement(opt.value)}
            key={opt.value}
          >
            <span className="material-icons-outlined">
              {involvement === opt.value ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
            <span>{opt.label}</span>
          </Card>
        ))}
        {involvement && <Rule />}
        <div>{involvement && <Questions option={involvement} />}</div>
        {involvement && <Button>Submit</Button>}
      </Form>
    </>
  );
};

export default App;
