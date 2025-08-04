const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const users = [
  { username: 'Samik', role: 'Founder', company: 'NASA' },
  { username: 'Puspa', role: 'Madam', company: 'NASA' },
  { username: 'Regan', role: 'Pale', company: 'NASA' },
  { username: 'Satish', role: 'CEO', company: 'NASA' },
  { username: 'Sabin', role: 'Manager', company: 'NASA' },
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
