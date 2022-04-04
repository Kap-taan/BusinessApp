const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {

  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login.ejs", {
    path: "/login",
    title: "Login",
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup.ejs", {
    path: "/signup",
    title: "Signup",
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log(name, email, password, confirmPassword);

  // E-Mail exists or not
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash('error', 'Entered E-Mail already exist.')
        return res.redirect("/signup");
      }
      bcrypt
        .hash(password, 12)
        .then((securePassword) => {
          const user = new User({
            name: name,
            email: email,
            password: securePassword,
            type: {
              customers: [],
              products: []
            }
          });
          return user.save();
        })
        .then(result => {
          console.log('New User Registered');
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });


};

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}).then(user => {
    if(!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    bcrypt.compare(password, user.password).then(doMatch => {
      if(doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log('Session is Saved');
          res.redirect('/dashboard');
        })
      } else {
        req.flash('error', 'Invalid email or password')
        res.redirect('/login');
      }
    }).catch(err => {
      console.log(err);
    })
  }).catch(err => {
    console.log(err);
  })

}

exports.postLogout = (req, res, next) => {

  req.session.destroy(err => {
    console.log(err);
    console.log('Session is Over');
    res.redirect('/');
  })

}
