'use strict';

module.exports = {
  setMessage: setMessage
};

const MESSAGES = [
  'oi',
  'hello, how are you?',
  'sup?',
  'this place is aweseome!',
  'avengers, assemble!',
  'kaboom'
];

function setMessage(context, events, done) {
  // pick a message randomly
  const index = Math.floor(Math.random() * MESSAGES.length);
  // make it available to templates as "message"
  context.vars.message = MESSAGES[index];
  return done();
}