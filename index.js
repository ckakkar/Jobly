const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/homepage'))



app.post('/update', (req, res) => {
  var getUserQuery = req.body.code;
  console.log(getUserQuery);
  pool.query(getUserQuery, (error, result) => {
    if (error)
      res.end(error);
    res.sendStatus(200);
  })
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))