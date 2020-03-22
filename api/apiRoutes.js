const express = require('express');

const router = express.Router();
const usersRoute = require('../user/user-route');
///holds data for users
const authRoute = require('../auth/auth-route')
//handles all authentication
const actionsRoute = require('../actions/actions-route');
//holds all player actions, linked to users table

router.use('/users', usersRoute);
router.use('/auth', authRoute);
router.use('/actions', actionsRoute)

module.exports = router;