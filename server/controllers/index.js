// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');

const Cat = models.Cat.CatModel;
const Dog = models.Dog.dogModel;
// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

const defaultDataDog = {
  name: 'unknown',
  breed: 'unknown',
  age: 0,
};

let lastAdded = new Cat(defaultData);
// console.dir(lastAdded);
let lastAddedDog = new Dog(defaultDataDog);

const hostIndex = (req, res) => {
  res.render('index', {
    currentName: lastAdded.name,
    title: 'Home',
    pageName: 'Home Page',
  });
};

const readAllCats = (req, res, callback) => {
  Cat.find(callback).lean();
};

const readAllDogs = (req, res, callback) => {
  Dog.find(callback).lean();
};

// Cat
const readCat = (req, res) => {
  const name1 = req.query.name;
  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }
    return res.json(doc);
  };
  Cat.findByName(name1, callback);
};
// Dog
const readDog = (req, res) => {
  const nameD = req.query.name;
  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }
    return res.json(doc);
  };
  Dog.findByName(nameD, callback);
};
// Shows cats
const hostPage1 = (req, res) => {
  const callback = (err, docs) => {
    if (err) {
      return res.status(500).json({ err });
    }
    return res.render('page1', { cats: docs });
  };

  readAllCats(req, res, callback);
};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const hostPage3 = (req, res) => {
  res.render('page3');
};

const hostPage4 = (req, res) => {
  const callback = (err, docs) => {
    if (err) {
      return res.status(500).json({ err });
    }
    return res.render('page4', { dogs: docs });
  };

  readAllDogs(req, res, callback);
};

const getName = (req, res) => {
  res.json({ name: lastAdded.name });
};

const getNameDog = (req, res) => {
  res.json({ name: lastAddedDog.name });
};
const setNameDog = (req, res) => {
  if (!req.body.name || !req.body.Age || !req.body.breed) {
    return res.status(400).json({ error: 'Name, Breed and Age are all required' });
  }

  const name = `${req.body.name}`;
  const breed = `${req.body.breed}`;
  const dogData = {
    name,
    breed,
    age: req.body.Age,
  };

  const newDog = new Dog(dogData);
  const savePromise = newDog.save();
  savePromise.then(() => {
    lastAddedDog = newDog;
    res.json({
      name: lastAddedDog.name,
      breed: lastAddedDog.breed,
      age: lastAddedDog.age,
    });
  });
  savePromise.catch((err) => {
    res.status(500).json({ err });
  });
  return res;
};
const setName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname,lastname and beds are all required' });
  }
  const name = `${req.body.firstname} ${req.body.lastname}`;
  const catData = {
    name,
    bedsOwned: req.body.beds,
  };

  const newCat = new Cat(catData);
  const savePromise = newCat.save();
  savePromise.then(() => {
    lastAdded = newCat;
    res.json({
      name: lastAdded.name,
      beds: lastAdded.bedsOwned,
    });
  });
  savePromise.catch((err) => {
    res.status(500).json({ err });
  });
  return res;
};
// Cats
const searchName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  return Cat.findByName(req.query.name, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!doc) {
      return res.json({ error: 'No Cats Found!' });
    }

    return res.json({
      name: doc.name,
      beds: doc.bedsOwned,
    });
  });
};
// Dogs
const searchNameDog = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  return Dog.findByName(req.query.name, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!doc) {
      return res.json({ error: 'No Dogs Found!' });
    }

    return res.json({
      name: doc.name,
      breed: doc.breed,
      age: doc.age,
    });
  });
};
const updateLast = (req, res) => {
  lastAdded.bedsOwned++;

  const savePromise = lastAdded.save();
  savePromise.then(() => {
    res.json({
      name: lastAdded.name,
      beds: lastAdded.bedsOwned,
    });
  });

  savePromise.catch((err) => {
    res.status(500).json({ err });
  });
};

const updateLastDog = (req, res) => {
  lastAddedDog.age++;

  const savePromise = lastAddedDog.save();
  savePromise.then(() => {
    res.json({
      name: lastAddedDog.name,
      breed: lastAddedDog.breed,
      age: lastAddedDog.age,
    });
  });

  savePromise.catch((err) => {
    res.status(500).json({ err });
  });
};
const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  readCat,
  readDog,
  getName,
  getNameDog,
  setName,
  setNameDog,
  updateLast,
  updateLastDog,
  searchName,
  searchNameDog,
  notFound,
};
