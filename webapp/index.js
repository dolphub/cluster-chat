var express = require('express');
app = express();
app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3001;

app.listen(port);
console.log('Webapp listening on port %d', port);
