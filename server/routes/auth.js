import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
let router = express.Router();

router.post('/', (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then(user => {
      if(user){
          if(bcrypt.compareSync(req.body.password, user.password)){
              let token = jwt.sign({
                  id: user._id,
                  username: user.username
              }, config.jwtSecret);
              res.json({token: token});
          }
          else {
              res.json({success: false, error: true});
          }
      }
      else {
          res.json({success: false, error: true});
      }
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

export default router;
