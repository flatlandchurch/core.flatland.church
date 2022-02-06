import React from 'react';

import Input from '../components/Input';
import Card from '../components/Card';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Mentor = (props: Props) => {
  return (
    <Card as="div">
      <Input
        required
        label="Who is one person you believe would make a great mentor or coach?"
        value={props.value}
        onChange={props.onChange}
      />
    </Card>
  );
};

export default Mentor;
