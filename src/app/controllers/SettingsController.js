class SettingsController {
    index(req, res) {
        res.render('detail-user', { layout: 'home' });
    }
}

module.exports = new SettingsController;