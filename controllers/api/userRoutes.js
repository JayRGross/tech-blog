const router = require('express').Router();
const { User, Comment } = require('../../models');

// Create a new user
// Matches /api/users
router.post('/', async (req, res) => {
    try { 
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logging in
// Matches /api/users/
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {
            email: req.body.email
        }});

        if (!userData) {
            res.status(400).json({
                message: `Incorrect email  , please try again`
            });
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ 
                message: `Incorrect password, please try again`
            });
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: `You are now logged in!`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logging out
// Matches /api/users
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
} );

// Matches /api/users
router.post('/comment', async (req, res) => {
    try {   
        
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            }
            );
        res.status(200).json(comment);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;