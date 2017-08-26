import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);
    return User.findOne({
        $or : [{email: data.email}, {username: data.username}]
    }).then(user => {
        if (user) {
            if(user.username === data.username){
                errors.username = 'There is user with such username';
            }
            if(user.email === data.email){
                errors.email = 'There is user with such email';
            }
        }
        return { errors, isValid: isEmpty(errors) };
    })

}

router.get('/:identifier', (req, res) => {

    /* User.query({
     select: [ 'username', 'email' ],
     where: { email: req.params.identifier },
     orWhere: { username: req.params.identifier }
     }).fetch().then(user => {
     res.json({ user });
     });*/
});


router.post('/', (req, res) => {

    validateInput(req.body, commonValidations)
        .then(({errors, isValid}) => {
            if (isValid) {
                const password_digest = bcrypt.hashSync(req.body.password, 10);
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: password_digest,
                    timezone: req.body.timezone
                }).then(user => {
                    res.json({success: true, user: user})
                }).catch(err => {
                    res.status(500).json({error: err});
                });
            } else {
                res.status(400).json({success: false, errors: errors});
            }
        });

});

export default router;
