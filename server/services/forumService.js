/*backend functionality implemented that includes create new post ,get all posts, Delete post , edit post, update post and manage comments*/
var ForumModel= require('../models/forummodel');
var ForumCommentModel= require('../models/forumCommentmodel');

//Service for forum
exports.createPost = function (req, res) {
    forum= new ForumModel({
        title: req.body.title,
        body: req.body.body,
        posted: Date.now(),
        username: req.body.user

    });

    forum.save();
    return res.send({
    });
    res.send(true);

};

//To get all posts
exports.getall = function getAllPosts(req, res) {
    ForumModel.find()
        .then(
            function (posts) {
                res.json(posts);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
}

//To delete a post
exports.deletepost = function deletePost(req, res) {
    var postId = req.params.id;

    ForumModel.remove({_id: postId})
        .then(
            function (status) {

                res.sendStatus(200)
            },
            function (err) {
                res.sendStatus(400)
            }
        );
};

//To edit a post
exports.edit = function getPostById(req, res) {
    var postId = req.params.id;
    ForumModel
        .findById(postId)
        .then(
            function (posts) {
                res.json(posts);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
};

//To update a post
exports.updatePost = function updatePost(req, res) {

    var post= req.body;
    ForumModel
        .update({_id: post._id},{
            title: post.title,
            body: post.body,
        })
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
};

//Implemented comments addition
exports.comment= function commentPost(req, res) {

    forumComment= new ForumCommentModel({
        id: req.body._id,
        username: req.body.user,
        comment: req.body.comment,
        postDate: Date.now()
    });

    forumComment.save();

};

//To get all comments
exports.getComments = function getComments(req, res) {
    ForumCommentModel.find({id : req.params.id})
        .then(
            function (post) {
                res.send(post);

            },
            function (err) {
                res.sendStatus(400);
            }
        );
};