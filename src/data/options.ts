export type OptionValue = 'leader' | 'mentor' | 'member' | 'none';
export type Option = {
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

export default options;
