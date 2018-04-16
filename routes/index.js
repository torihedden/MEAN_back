module.exports = function (app, db) {
  app.get('/test', function (request, response) {
    response.send('response here');
  });

  app.get('/test/user/:id', function (request, response) {
    let id = request.params.id;
    response.send({userID: id});
  });

  app.get('/tickets', (request, response) => {
    db.collection('tickets').find({})
      .toArray((error, tickets) => {
        console.log(tickets);
        response.send(tickets);
      })
  });

  app.post('/welcome', function (request, response) {
    console.log(request.body);
    const {message, id} = request.body;
    response.send('message was ' + message + ' from user ' + id);
  });

  app.post('/login', function (request, response) {
    const {username, password} = request.body;
    const collection = db.collection('users');
    collection.findOne({"username": username}).then(function (user) {
      if (!user) {
        console.log('user not found');
        response.send('user not found');
      } else {
        if (user.pw === password) {
          response.send('credentials accepted');
        } else {
          response.send('wrong password');
        }
      }
    });
  })
};
