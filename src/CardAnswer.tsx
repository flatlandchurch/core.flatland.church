import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Label from './components/Label';
import Card from './components/Card';
import { Button, Small } from './styled';

export type AnswerType = 'talking' | 'seeking' | 'knowing';
export type Answer = { type: AnswerType; content: string };

type Props = {
  label: string;
  limit: number;
  onAnswer: (answer: string, type: string, idx: number) => void;
  type: AnswerType;
  answers: Answer[];
  idx: number;
};

const Wrapper = styled.div`
  margin-top: 24px;

  ${Small} {
    margin-top: 4px;
  }
`;

const TextareaWrapper = styled.div`
  width: 100%;
  display: block;
  position: relative;
`;

const CharacterCounter = styled.span<{ percentage: number }>`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  padding: 8px;
  color: ${(props) => {
    if (props.percentage > 0.9) {
      return '#D81159';
    }
    if (props.percentage > 0.8) {
      return '#ae2456';
    }
    if (props.percentage > 0.75) {
      return '#732b46';
    }
    return '#444';
  }};

  transition: color 0.2s ease;
`;

const Textarea = styled.textarea`
  appearance: none;
  border: 1px solid #d0d4d7;
  border-radius: 8px;
  padding: 12px 12px 24px;
  font-size: 18px;
  width: 100%;
  resize: none;

  &:hover {
    border-color: #1f73b7;
  }

  &:focus {
    border-color: #1f73b7;
    box-shadow: 0 0 1px 3px #1f73b755;
    outline: none;
  }
`;

const CardAnswer = ({ label, limit, answers, idx, onAnswer, type }: Props) => {
  const [textBoxCount, setTextBoxCount] = useState(0);

  const handleAnswers = (i) => (e) => {
    onAnswer(e.target.value, type, i);
  };

  return (
    <Wrapper>
      <Label as="p">{label}</Label>
      <Small>
        Limit {limit} ideas. Try to keep each idea to roughly one thought. Your answers will be
        anonymous.
      </Small>
      {Array.from(Array(textBoxCount)).map((_, i) => (
        <Card key={i}>
          <TextareaWrapper>
            <Textarea
              rows={7}
              maxLength={240}
              value={answers[idx + i]?.content || ''}
              onChange={handleAnswers(idx + i)}
            />
            <CharacterCounter percentage={(answers[idx + i]?.content?.length || 0) / 240}>
              {answers[idx + i]?.content?.length || 0}/240
            </CharacterCounter>
          </TextareaWrapper>
        </Card>
      ))}
      {textBoxCount < limit && (
        <Button type="button" outline onClick={() => setTextBoxCount((s) => s + 1)}>
          + Add Idea
        </Button>
      )}
    </Wrapper>
  );
};

export default CardAnswer;
