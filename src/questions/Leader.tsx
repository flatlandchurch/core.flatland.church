import React from 'react';

import Input from '../components/Input';
import Card from '../components/Card';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Leader = (props: Props) => {
  return (
    <Card as="div">
      <Input
        required
        label="Who is one person you believe is ready to step into a greater ministry role at Flatland?"
        value={props.value}
        onChange={props.onChange}
      />
    </Card>
  );
};

export default Leader;
