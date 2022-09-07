import got from 'got';
import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import catchify from 'catchify';

const handler = async (event) => {
  const [err, data] = await catchify(
    got('https://flatland.churchcenter.com/sessions/tokens', {
      method: 'POST',
    }).json(),
  );

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: 'https://move-to-the-center.firebaseio.com',
  });

  if (err) {
    return Promise.resolve({
      statusCode: 400,
    });
  }

  const body = JSON.parse(event.body);
  const { included, ...rest } = body;

  const ideas = included.filter((item) => item.type === 'Idea');
  const db = admin.database();
  const ref = db.ref('ideas');
  await Promise.all(ideas.map((idea) => ref.child(uuidv4()).set(idea.attributes)));

  const payload = {
    ...rest,
    included: included.filter((item) => item.type !== 'Idea'),
  };

  const [submissionErr] = await catchify(
    got(`https://api.churchcenter.com/people/v2/forms/345540/form_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `OrganizationToken ${data.data.attributes.token}`,
      },
      body: JSON.stringify(payload),
    }).json(),
  );

  if (submissionErr) {
    console.log(submissionErr.response.body);
  }

  return Promise.resolve({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
};

module.exports.handler = handler;
