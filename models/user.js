// const QueryBuilder = require("node-querybuilder");
// const dbConfig = require("../utils/dbconfig");

// console.log('Initializing database connection pool...');
// const pool = new QueryBuilder(dbConfig, 'mysql', 'pool');
// console.log('Database connection pool initialized successfully.');

// class User {
//   async login(email, password) {
//     try {

//       console.log('email', email);
//       console.log('password', password);
//       const user = await pool.query(
//         "SELECT * FROM users WHERE email = ? AND password = ?",
//         [email, password]
//       );
//       if (user.length > 0) {
//         return user[0]; // Return user data if found
//       } else {
//         return null; // User not found or credentials incorrect
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       return false; // Login failed due to error
//     }
//   }
  

//   async register(username, email, password) {
//     const created_on = new Date();
//     const last_updated_on = created_on; // Initial creation sets last updated time same as creation time

//     console.log('username', username);
//     console.log('email', email);
//     console.log('password', password);
    
//     try {
//       const result = await pool.query(
//         "INSERT INTO users (username, email, password, created_on, last_updated_on) VALUES (?, ?, ?, ?, ?)",
//         [username, email, password, created_on, last_updated_on]
//       );
//       console.log('result', result);
//       return result.insertId; // Return ID of newly inserted user
//     } catch (error) {
//       console.error("Error during registration:", error);
//       return false; // Registration failed due to error
//     }
//   }
  

//   async getUserData(username) {
//     try {
//       const user = await pool.query(
//         "SELECT * FROM users WHERE username = ?",
//         [username]
//       );
//       if (user.length > 0) {
//         return user[0]; // Return user data if found
//       } else {
//         return null; // User not found
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       return false; // Error fetching user data
//     }
//   }

//   async logout(req, res) {
//     req.session.destroy();
//     res.redirect("/login");
//   }

//   async getAllUsers() {
//     try {
//       const users = await pool.query("SELECT * FROM users");
//       return users; // Return all users
//     } catch (error) {
//       console.error("Error fetching all users:", error);
//       return false; // Error fetching all users
//     }
//   }
// }

// module.exports = new User;

const QueryBuilder = require("node-querybuilder");
const dbConfig = require("../utils/dbconfig");

console.log('Initializing database connection pool...');
const pool = new QueryBuilder(dbConfig, 'mysql', 'pool');
console.log('Database connection pool initialized successfully.');

class User {
  async login(email, password) {
    try {
      return new Promise((resolve, reject) => {
        pool.get_connection(qb => {
          qb.select('*')
            .where({ email, password })
            .get('users', (err, response) => {
              qb.disconnect();
              if (err) {
                console.error("Error during login:", err.msg);
                reject(err);
              } else {
                resolve(response.length > 0 ? response[0] : null);
              }
            });
        });
      });
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  }

  async register(username, email, password) {
    const created_on = new Date();
    const last_updated_on = created_on;

    try {
      return new Promise((resolve, reject) => {
        pool.get_connection(qb => {
          qb.insert('users', { username, email, password, created_on, last_updated_on }, (err, response) => {
            qb.disconnect();
            if (err) {
              console.error("Error during registration:", err.msg);
              reject(err);
            } else {
              resolve(response.insertId);
            }
          });
        });
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return false;
    }
  }

  async getUserData(username) {
    try {
      return new Promise((resolve, reject) => {
        pool.get_connection(qb => {
          qb.select('*')
            .where({ username })
            .get('users', (err, response) => {
              qb.disconnect();
              if (err) {
                console.error("Error fetching user data:", err.msg);
                reject(err);
              } else {
                resolve(response.length > 0 ? response[0] : null);
              }
            });
        });
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  }

  async logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  async getAllUsers() {
    try {
      return new Promise((resolve, reject) => {
        pool.get_connection(qb => {
          qb.select('*')
            .get('users', (err, response) => {
              qb.disconnect();
              if (err) {
                console.error("Error fetching all users:", err.msg);
                reject(err);
              } else {
                resolve(response);
              }
            });
        });
      });
    } catch (error) {
      console.error("Error fetching all users:", error);
      return false;
    }
  }

  async getUserByEmail(email) {
    try {
      return new Promise((resolve, reject) => {
        pool.get_connection(qb => {
          qb.select('*')
            .where({ email })
            .get('users', (err, response) => {
              qb.disconnect();
              if (err) {
                console.error("Error fetching user by email:", err.msg);
                reject(err);
              } else {
                resolve(response.length > 0 ? response[0] : null);
              }
            });
        });
      });
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return false;
    }
  }
}

module.exports = new User();

