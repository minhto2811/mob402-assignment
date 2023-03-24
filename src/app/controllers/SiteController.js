class SiteController {
    home(req, res) {
        res.render('home', { layout: 'home' });
    }
    signIn(req, res) {
        res.render('sign-in');
    }
    forgotPassword(req, res) {
        res.render('forgot-password');
    }
    register(req, res) {
        res.render('register');
    }
    
 

}

module.exports = new SiteController;