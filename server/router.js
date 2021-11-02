const controllers = require('./controllers');

const router = (app) => {
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/page4', controllers.page4);
  app.get('/getName', controllers.getName);
  app.get('/findByName', controllers.searchName);
  // For dogs
  app.get('/getNameDog', controllers.getNameDog);
  app.get('/findByNameDog', controllers.searchNameDog);
  app.get('/', controllers.index);

  app.get('/*', controllers.notFound);

  // For cats
  app.post('/setName', controllers.setName);
  app.post('/updateLast', controllers.updateLast);
  // For dogs
  app.post('/setNameDog', controllers.setNameDog);
  app.post('/updateLastDog', controllers.updateLastDog);
};

// export the router function
module.exports = router;
