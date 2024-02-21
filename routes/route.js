const express = require('express');
const route = express.Router()
const controllers = require('../controller/emailControl')

route.get('/getmail',controllers.getmail)
route.get('/getmailBySubject/:subject',controllers.getmailBysubject)
route.get('/getmailByEmail/:email',controllers.getmailByEmail)


module.exports = route
