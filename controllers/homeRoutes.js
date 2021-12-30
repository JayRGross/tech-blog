const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try{
        // Get all posts
        const postData = await Post.findall({
            include: [
                {
                    model: User
                },
                {
                    model: Comment
                }
            ]
        });
        // Serialize data so the tempelate can read it
        const posts = postData.map(post => post.get({plain: true}));
        //console.log(posts)
        // return
        res.render('homepage', {posts});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User
                }
            ]
        });

        const post = postData.get({ plain: true });
        res.render('update', {post});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post-create', withAuth, async (req, res) => {
    res.render('post');
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    };
    res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: Post}]
        });

        const user = userData.get({ plain: true});

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => res.render('signup'));

module.exports = router;