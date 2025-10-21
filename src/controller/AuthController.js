const { user: User } = require('../models');

class AuthController {
  // Show login form
  static showLogin(req, res) {
    res.render('login/login', {
      title: 'Login',
      error: req.flash('error'),
      success: req.flash('success')
    });
  }

  // Process login
  static async processLogin(req, res) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        req.flash('error', 'Username/Email dan password harus diisi');
        return res.redirect('/login');
      }

      // Find user by username or email
      const user = await User.findByLogin(identifier);
      if (!user) {
        req.flash('error', 'Username/Email atau password salah');
        return res.redirect('/login');
      }

      // Verify password
      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        req.flash('error', 'Username/Email atau password salah');
        return res.redirect('/login');
      }

      // Create session
      req.session.user = {
        idUser: user.idUser,
        username: user.username,
        nama: user.nama,
        email: user.email,
        role: user.role,
        photo_profile: user.photo_profile
      };

      // Check if user has valid role
      if (user.role !== 'admin' && user.role !== 'employee') {
        req.flash('error', 'Akses ditolak. Hanya admin dan employee yang dapat mengakses sistem.');
        req.session.destroy();
        return res.redirect('/login');
      }

      req.flash('success', `Selamat datang, ${user.nama}!`);
      res.redirect('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      req.flash('error', 'Terjadi kesalahan saat login');
      res.redirect('/login');
    }
  }

  // Process logout
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        req.flash('error', 'Terjadi kesalahan saat logout');
        return res.redirect('/dashboard');
      }
      res.redirect('/login');
    });
  }

  // Show register form (optional)
  static showRegister(req, res) {
    res.render('signup/signup', {
      title: 'Sign Up - Mudjarap Dashboard',
      error: req.flash('error'),
      success: req.flash('success')
    });
  }

  // Process register (optional)
  static async processRegister(req, res) {
    try {
      const { username, nama, email, password, confirmPassword, tanggalLahir, domisili, gender } = req.body;

      if (!username || !nama || !email || !password || !confirmPassword) {
        req.flash('error', 'Username, nama, email, password, dan konfirmasi password harus diisi');
        return res.redirect('/register');
      }

      if (password !== confirmPassword) {
        req.flash('error', 'Password dan konfirmasi password tidak sama');
        return res.redirect('/register');
      }

      if (password.length < 6) {
        req.flash('error', 'Password minimal 6 karakter');
        return res.redirect('/register');
      }

      // Check if user already exists
      const existingUser = await User.findByLogin(username);
      if (existingUser) {
        req.flash('error', 'Username atau email sudah digunakan');
        return res.redirect('/register');
      }

      // Check if email already exists
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        req.flash('error', 'Email sudah digunakan');
        return res.redirect('/register');
      }

      // Create new user
      await User.create({
        username,
        nama,
        email,
        password,
        tanggalLahir: tanggalLahir || null,
        domisili: domisili || null,
        gender: gender || null,
        role: 'user'
      });

      req.flash('success', 'Akun berhasil dibuat. Silakan login.');
      res.redirect('/login');

    } catch (error) {
      console.error('Register error:', error);
      req.flash('error', 'Terjadi kesalahan saat registrasi');
      res.redirect('/register');
    }
  }
}

module.exports = AuthController;