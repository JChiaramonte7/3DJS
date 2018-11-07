var express = require('express')
var app = express()
const port = 4000

//app.use("/src", express.static(__dirname))
//app.use("/src", express.static(__dirname + 'public'))
app.use(express.static(__dirname + "/dist"))

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname + '/public/'});
})

app.listen(port, () => console.log(`Listening on port ${port}!`))