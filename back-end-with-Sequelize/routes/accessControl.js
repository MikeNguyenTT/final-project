const express = require('express');
const router = express.Router();

module.exports = (sequelizeModels, pusher) => {

  Employee = sequelizeModels.Employee;

  // router.put('/', async(req, res) =>  {
  //   const {firstname, lastname} = req.body;
  //   try {
  //     const user = await User.create({firstname, lastname})

  //     return res.json(user);
  //   } catch(err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // })

  router.post('/login', async(req, res) => {
    try {
      const {email, password} = req.body;
      const rawData = await Employee.findAll({
        where: {
          email: email,
          password: password
        }
      })
      const users = JSON.parse(JSON.stringify(rawData))
      console.log(users);
      return users.length > 0 ? res.json( users[0] ) : res.status(403).json(new Error("Access forbidden"))
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  router.post('/login', async(req, res) => {
    try {
      const {email, password} = req.body;
      const rawData = await Employee.findAll({
        where: {
          email: email,
          password: password
        }
      })
      const users = JSON.parse(JSON.stringify(rawData))
      console.log(users);
      return users.length > 0 ? res.json( users[0] ) : res.status(403).json(new Error("Access forbidden"))
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })

  return router;
};
