const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadcontroller");
const userController = require("../controllers/usercontroller");
const UploadModel = require("../models/uploadmodel");
const path = require('path');



router.get("/", async (req, res) => {
  console.log('GET /')
  // check if the user is logged in, else show the login form
  // if the user is logged in, show the upload form
  if (req.session.user) {

    let userFeddData = await UploadModel.getUploads();
    console.log('userFeddData->', userFeddData);
    if (userFeddData.length > 0) {
      userFeddData = userFeddData.map((item) => {
        if (!item.upload_path_org) {
          return item;
        }

        if(item.upload_path_org ){
          item.image = path.join('/assets', item.upload_path_org);
        }
        return item;
      });
    }
    
    
    
    console.log('userFeddData->', userFeddData);
    res.render("templates/index.ejs", {
      title: "Uploads",
      page: "uploadform.ejs",
      user: req.session.user,
      responseData: userFeddData,
    });
  } else {
    res.render("templates/index.ejs", {
      title: "Login",
      page: "login.ejs",
    });
  }

  // res.render("templates/index.ejs", {
  //   title: "Uploads",
  //   page: "uploadform.ejs",

  // });
});

/**
 * @route GET /register
 */
router.get("/register", (req, res) => {
  console.log('GET /register')
  res.render("templates/index.ejs", {
    title: "Register",
    page: "register.ejs",
    
  });
});

/**
 * @routes GET /login
 * @description Show the login form
 */

router.get("/login", (req, res) => {
  console.log('GET /login')
  res.render("templates/index.ejs", {
    title: "Login",
    page: "login.ejs",
    
  });
});

router.post("/upload", uploadController.uploadFile);

// TODO: Add a route to log in a user
router.post("/login", userController.loginUser);

// TODO: Add a route to register a user
router.post("/register", userController.register);

// TODO: Add a route to log out a user
router.get("/logout", userController.logout);

// TODO: Add a route to get user data
router.get("/user/:username", userController.getUserData);

// TODO: Add a route to get all uploads
// router.get("/uploads", uploadController.getUploads);
router.get("/uploads", (req, res) => {
  console.log('GET /uploads')
  res.redirect("/");
});


module.exports = router;
