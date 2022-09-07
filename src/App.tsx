import React, { useState } from 'react';

import Card from './components/Card';
import Label from './components/Label';
import Input from './components/Input';

import CardAnswer from './CardAnswer';
import Questions from './Questions';
// @ts-ignore
import { Button, Form, Header, CardContainer, Row, Rule, Small, Title } from './styled';

import options, { OptionValue } from './data/options';
import createPayload from './utils/createPayload';

const INVOLVEMENT_MAP = {
  leader: '2690714',
  mentor: '2690715',
  member: '2690716',
  none: '2690717',
};

const App = () => {
  const [involvement, setInvolvement] = useState<OptionValue | null>(null);
  const [includes, setIncludes] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = createPayload(
      email,
      firstName,
      lastName,
      INVOLVEMENT_MAP[involvement],
      includes,
    );

    setSending(true);
    await fetch('/.netlify/functions/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((d) => d.json());
    setSending(false);
    setSent(true);
  };

  const handleIncludes = (includes) => {
    if (includes.length) {
      setIncludes(includes.filter((k) => !!k.attributes.value));
    }
  };

  return (
    <>
      <Header />
      <Form onSubmit={onSubmit}>
        {sent ? (
          <CardContainer as="div">
            <h1>
              <span role="img" aria-label="Peace sign">
                ✌️
              </span>{' '}
              Thanks!
            </h1>
            <p style={{ fontSize: 18 }}>
              Thank you for seeking God with us. We're excited to see how the Holy Spirit moves us
              to the center together in this next year.
            </p>
          </CardContainer>
        ) : (
          <>
            <Title>Core Team Prayer Night Response</Title>
            <CardContainer as="div" style={{ marginBottom: 24 }}>
              <Row>
                <Input
                  required
                  autoComplete="given-name"
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                />
                <Input
                  required
                  autoComplete="family-name"
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                />
              </Row>
              <Input
                required
                autoComplete="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={setEmail}
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
            <div>
              {involvement && <Questions option={involvement} onInclude={handleIncludes} />}
            </div>
            <Rule />
            <CardAnswer
              label="What are people talking about, excited about, and stressing about?"
              limit={2}
            />
            <CardAnswer label="Why are people seeking and avoiding God and the church?" limit={2} />
            <CardAnswer label="What do you want to know more about God and the Bible?" limit={2} />
            {involvement && <Button disabled={sending}>{sending ? 'Sending...' : 'Submit'}</Button>}
          </>
        )}
      </Form>
    </>
  );
};

export default App;
