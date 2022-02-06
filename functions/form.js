const got = require('got');
const catchify = require('catchify');

const handler = async (event) => {
  const [err, data] = await catchify(
    got('https://flatland.churchcenter.com/sessions/tokens', {
      method: 'POST',
    }).json(),
  );

  if (err) {
    return Promise.resolve({
      statusCode: 400,
    });
  }

  console.log(data.data.attributes);

  return Promise.resolve({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
};

module.exports.handler = handler;
