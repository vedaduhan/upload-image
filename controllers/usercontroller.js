/**
 * User Controller
 * @description: Controller for user authentication and registration and user feed
 * 
 */

const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserController {
          // async loginUser(req, res) {
          //   let data = req.body;
          //   let email = data.email;
          //   let password = data.password;
          //   let user = await User.login(email, password);
          //   if (user) {
          //     // User found
          //     req.session.user = user;
          //     res.redirect("/upload");
          //   } else {
          //     // User not found
          //     res.render("templates/index.ejs", {
          //       title: "Login",
          //       page: "login.ejs",
          //       messages: { error: "Invalid email or password" },
          //     });
          //   }
          // }

          async loginUser(req, res) {
            let data = req.body;
            let email = data.email;
            let password = data.password;
          
            try {
              const user = await User.getUserByEmail(email);
              if (user) {
                // User found, compare hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {  
                  // Passwords match, set user in session and redirect to upload page
                  req.session.user = user;
                  // res.render("templates/index.ejs", {
                  //   title: "Uploads",
                  //   page: "uploadform.ejs",
                  //   user: user,
                  // });
                  console.log('user', user);
                  // TODO: Redirect to / and pass user data
                  res.redirect("/");

                }
                  else {
                  // Passwords don't match
                  res.render("templates/index.ejs", {
                    title: "Login",
                    page: "login.ejs",
                    messages: { error: "Invalid email or password" },
                  });
                }
              } else {
                // User not found
                res.render("templates/index.ejs", {
                  title: "Login",
                  page: "login.ejs",
                  messages: { error: "Invalid email or password" },
                });
              }
            } catch (error) {
              console.error("Error during login:", error);
              res.status(500).send("Internal Server Error");
            }
          }


          async register(req, res) {
            let data = req.body;
            let username = data.username;
            let email = data.email;
            let password = data.password;
            let hashedPassword = await bcrypt.hash(password, 10);
            let user = await User.register(username, email, hashedPassword);
            if (user) {
              // User registered
              res.redirect("/login");
            } else {
              // Registration failed
              res.render("templates/index.ejs", {
                title: "Register",
                page: "register.ejs",
                messages: { error: "Registration failed" },
              });
            }
          }

          async logout(req, res) {
            req.session.destroy();
            res.redirect("/login");
          }

          async getUserData(req, res) {
            let username = req.params.username;
            let user = await User.getUserData(username);
            if (user) {
              res.render("templates/index.ejs", {
                title: "Profile",
                page: "profile.ejs",
                user: user,
              });
            } else {
              res.render("templates/index.ejs", {
                title: "Profile",
                page: "profile.ejs",
                messages: { error: "User not found" },
              });
            }
          }

          async userFeed(req, res) {
            let users = await User.getAllUsers();
            res.render("templates/index.ejs", {
              title: "User Feed",
              page: "userfeed.ejs",
              users: users,
            });
          }

  }

  module.exports = new UserController