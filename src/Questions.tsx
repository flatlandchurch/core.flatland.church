import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Leader from './questions/Leader';
import Mentor from './questions/Mentor';
import Member from './questions/Member';
import None from './questions/None';

import Card from './components/Card';
import Label from './components/Label';

type Props = {
  option: 'leader' | 'mentor' | 'member' | 'none';
};

const Heading = styled(Label)`
  margin-bottom: 12px;
`;

const ContainerCard = styled(Card)`
  display: block;
`;

const options = [
  {
    label: 'Guest Services Team',
    value: '2690705',
  },
  {
    label: 'Tech Team',
    value: '2690706',
  },
  {
    label: 'Worship Team',
    value: '2690707',
  },
  {
    label: 'Nursery Team',
    value: '2690708',
  },
  {
    label: 'Kids Team',
    value: '2690709',
  },
  {
    label: 'Youth Team',
    value: '2690710',
  },
];

const Questions = (props: Props) => {
  const [leader, setLeader] = useState('');
  const [mentor, setMentor] = useState('');
  const [member, setMember] = useState({});
  const [none, setNone] = useState({});
  const [teams, setTeams] = useState({});

  useEffect(() => {
    setLeader('');
    setMentor('');
    setMember({});
    setNone({});
  }, [props.option]);

  return (
    <div>
      {props.option === 'leader' && <Leader value={leader} onChange={setLeader} />}
      {props.option === 'mentor' && <Mentor value={mentor} onChange={setMentor} />}
      {props.option === 'member' && <Member values={member} onChange={setMember} />}
      {props.option === 'none' && <None values={none} onChange={setNone} />}
      {!!none['2690704'] && (
        <ContainerCard as="div">
          <Heading as="p">I would like information about the following Ministry Team(s):</Heading>
          {options.map((opt) => (
            <Card
              style={{ border: '1px solid #e9ebed' }}
              key={opt.value}
              active={teams[opt.value]}
              onClick={() => setTeams((s) => ({ ...s, [opt.value]: !s[opt.value] }))}
            >
              <span className="material-icons-outlined">
                {teams[opt.value] ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <span>{opt.label}</span>
            </Card>
          ))}
        </ContainerCard>
      )}
    </div>
  );
};

export default Questions;
