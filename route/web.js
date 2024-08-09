const express = require('express');
const { getHomepage ,getABC, getHoc ,postcrateuser,createuser, update, postupdateuser, deleteuser} = require('../controllers/homecontrollers')
const router = express.Router();


    router.get('/',getHomepage)
    router.get('/abc',getABC);
     router.get('/hochoi',getHoc);
     router.post('/create-user',postcrateuser);
     router.get('/create',createuser);
     router.get('/update/:id',update);
     router.post('/update-user/:id',postupdateuser);
     router.get('/delete/:id',deleteuser);




  module.exports=router;