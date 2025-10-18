//ini buat autentikasi
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    req.flash('error', 'Silakan login terlebih dahulu');
    return res.redirect('/login');
  }
}

//buat ngecek si user udah login atau belum
function requireGuest(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  } else {
    return next();
  }
}

// otentikasi role
function requireRole(roles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      req.flash('error', 'Silakan login terlebih dahulu');
      return res.redirect('/login');
    }

    if (roles.includes(req.session.user.role)) {
      return next();
    } else {
      req.flash('error', 'Anda tidak memiliki akses ke halaman ini');
      return res.redirect('/dashboard');
    }
  };
}

// buat ngeset user di locals biar bisa diakses di view
function setUserLocals(req, res, next) {
  res.locals.user = req.session ? req.session.user : null;
  res.locals.isAuthenticated = !!(req.session && req.session.user);
  next();
}

module.exports = {
  requireAuth,
  requireGuest,
  requireRole,
  setUserLocals
};