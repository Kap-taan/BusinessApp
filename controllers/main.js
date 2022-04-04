exports.getIndex = (req, res, next) => {

  
  if(req.session.isLoggedIn) {
    return res.redirect('/dashboard');
  }

  res.render('index.ejs', {
    path: '/',
    title: 'Business'
  });
};

exports.getAbout = (req, res, next) => {

  res.render('about.ejs', {
    path: '/about',
    title: 'About'
  });

}

exports.getWork = (req, res, next) => {

  res.render('work.ejs', {
    path: '/work',
    title: 'Work'
  })

}

exports.getTeam = (req, res, next) => {

  res.render('team.ejs', {
    path: '/team',
    title: 'Team'
  })

}

exports.getContact = (req, res, next) => {

  res.render('contact.ejs', {
    path: '/contact',
    title: 'Contact'
  })

}

exports.getBlog = (req, res, next) => {

  res.render('blog.ejs', {
    path: '/blog',
    title: 'Blog'
  })

}