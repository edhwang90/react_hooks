export const FAKE_USER = {
  firstName: 'Ed',
  lastName: 'H',
  username: 'edh',
  avatar:
    'https://via.placeholder.com/45'
};

export const FAKE_EMAILS = [
  {
    id: 0,
    subject: 'Ut',
    body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'
  },
  {
    id: 1,
    subject: 'Sed ut perspiciatis unde omnis',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae abm.'
  },
  {
    id: 2,
    subject: 'At vero',
    body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
  }
];

const LOTS_OF_EMAILS = Array(30)
  .fill(0)
  .map(_ => {
    let email =
      FAKE_EMAILS[
        Math.floor(Math.random() * FAKE_EMAILS.length)
      ];
    return {
      ...email,
      id: Math.random(),
      preview: email.body.substr(0, 46)
    };
  });

// Generate a preview
FAKE_EMAILS.forEach(
  email => (email.preview = email.body.substr(0, 46))
);

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'ed' && password === 'password') {
        resolve(FAKE_USER);
      } else {
        reject({ message: 'Invalid username or password' });
      }
    }, 300);
  });
}

export const fetchEmails = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(LOTS_OF_EMAILS);
    }, 300);
  });
}

export const fetchLatestEmails = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        FAKE_EMAILS.map(e => ({
          ...e,
          id: Math.random()
        })).slice(
          0,
          Math.floor(
            Math.random() * (FAKE_EMAILS.length + 1)
          )
        )
      );
    }, 300);
  });
}