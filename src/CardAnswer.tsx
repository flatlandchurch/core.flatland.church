import React from 'react';

import Label from './components/Label';

type Props = {
  label: string;
  limit: number;
};

const CardAnswer = ({ label, limit }: Props) => {
  return (
    <div>
      <Label as="p">{label}</Label>
    </div>
  );
};

export default CardAnswer;
