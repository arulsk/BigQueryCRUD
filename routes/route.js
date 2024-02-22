const express = require('express');
const route = express.Router()
const controllers = require('../controller/emailControl')
const bigqueryControl = require('../controller/bigquery')
route.get('/getmail',controllers.getmail)
route.get('/getmailBySubject/:subject',controllers.getmailBysubject)
route.get('/getmailByEmail/:email',controllers.getmailByEmail)
route.get('/getBigQueryData',bigqueryControl.getdata)
route.get('/campaign_ID/:campaign_ID',bigqueryControl.campaign_ID)
route.get('/Ad_Group_ID/:Ad_Group_ID',bigqueryControl.Ad_Group_ID)
route.get('/FSN_ID/:FSN_ID',bigqueryControl.FSN_ID)
route.get('/product_Name/:product_Name',bigqueryControl.product_Name)
route.get('/campaign_Name/:campaign_Name',bigqueryControl.campaign_Name)




module.exports = route
