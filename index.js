const express = require('express'); //imports in the required express library
const app = express(); //generates a new, running express app

//prints the object upon visiting localhost:5000/
app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    we: 'are hosted!'
  });
});

//prints the object upon visiting localhost:5000/greeting
app.get('/greeting', (req, res) => {
  res.send({ hi: 'there' });
});

//dynamic port binding from heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
