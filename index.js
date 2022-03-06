const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.post('/update', (req, res) => {
  var getUserQuery = req.body.code;
  console.log(getUserQuery);
  pool.query(getUserQuery, (error, result) => {
    if (error)
      res.end(error);
    res.sendStatus(200);
  })
})
