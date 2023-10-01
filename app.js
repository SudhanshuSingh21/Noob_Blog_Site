const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Nostrud ea ex minim ad nulla. Consequat laboris consequat dolor deserunt exercitation est esse adipisicing aute cupidatat ut elit. Officia dolore mollit ex enim id pariatur proident ut id irure. Sit velit enim fugiat irure occaecat consectetur tempor sint elit elit consectetur ullamco consectetur. Laboris mollit tempor qui aliqua aliquip sint in amet magna reprehenderit laborum labore. Lorem fugiat exercitation cupidatat laborum culpa est deserunt sit minim."
const aboutContent = "loremDuis velit qui mollit ut dolor non non magna excepteur enim minim. Voluptate reprehenderit deserunt tempor laborum consequat qui ut labore deserunt non voluptate eiusmod tempor. Ut duis velit cillum magna amet proident. Eiusmod officia nostrud tempor cillum eu consectetur do non quis ad anim in."
const contactContent = "Velit id laborum excepteur elit eiusmod ex. Reprehenderit veniam officia consequat velit exercitation ut non tempor. Ea nostrud amet eu eiusmod anim anim minim ea duis et."

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (req, res) {

    Post.find({})
        .then((post) => {
            res.render("home", {
                startingContent: homeStartingContent, blogPosts: post
            });
        });
});

app.get("/about", function (req, res) {

    res.render("about", { startingContent: aboutContent });

});

app.get("/contact", function (req, res) {

    res.render("contact", { startingContent: contactContent });

});


app.get("/compose", function (req, res) {

    res.render("compose");

});

app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({ _id: requestedPostId })
        .then((post) => {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        })
});

app.post("/compose", function (req, res) {

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save().then(() => { res.redirect("/"); });


});



const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server started on port successfuly.");
});