const createPayload = (email, firstName, lastName, formValue, includes = []) => ({
  data: {
    type: 'FormSubmission',
    attributes: {
      email_address: email,
      person_attributes: {
        first_name: firstName,
        last_name: lastName,
        emails_attributes: [
          {
            address: email,
            location: 'Home',
          },
        ],
      },
    },
  },
  included: [
    {
      type: 'FormSubmissionValue',
      attributes: {
        form_field_id: '2466083',
        value: formValue,
      },
    },
    ...includes,
  ],
});

export default createPayload;
