import React, { useState } from 'react';
import styled from 'styled-components';

import Card from './components/Card';
import Questions from './Questions';
import Label from './components/Label';

const Form = styled.form`
  width: 640px;
  max-width: 95%;
  margin: 0 auto;
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
    <Form onSubmit={onSubmit}>
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
      <button>Submit</button>
    </Form>
  );
};

export default App;
