var server = require('http').createServer();
var io = require('socket.io')(server, { path: '/ws/socket.io' });
var redis = require('socket.io-redis');

var PORT = process.env.PORT || 3000;
var REDIS_PORT = process.env.REDIS_HOST | 6379;
var REDIS_HOST = process.env.REDIS_HOST | 'redis';

var serverName = process.env.NAME || 'Unknown';

io.adapter(redis({ host: REDIS_HOST, port: REDIS_PORT }));

server.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
  console.log('ServerName: %s', serverName);
});

Routing
app.use(express.static(__dirname + '/public'));

app.get('/ping', (req, res, next) => {
  res.json(`Hello from ${serverName}`);
});

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  console.info(`NEW CONNECTION ON: ${serverName}`);
  socket.emit('my-name-is', serverName);

  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: `${serverName} - ${socket.username}`,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
