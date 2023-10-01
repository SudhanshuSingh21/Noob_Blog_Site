const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Blogging is as simple as obtaining a website and publishing original content on it. Tech-savvy bloggers can buy a domain name and build the website themselves. Those with less HTML knowledge can create an account with sites like WordPress that simplify the web design and publishing process." + "Blogs are usually simple websites. Older pieces may be archived in separate sections of the site, and there may be a separate page with contact info or a bio, but the blog itself is usually just a single page that can be scrolled through—similar to the news feed on social media sites like Facebook. As with a Facebook news feed, a blog displays the newest content at the top of the page.";
const aboutContent = "loremDuis velit qui mollit ut dolor non non magna excepteur enim minim. Voluptate reprehenderit deserunt tempor laborum consequat qui ut labore deserunt non voluptate eiusmod tempor. Ut duis velit cillum magna amet proident. Eiusmod officia nostrud tempor cillum eu consectetur do non quis ad anim in."
const contactContent = "Velit id laborum excepteur elit eiusmod ex. Reprehenderit veniam officia consequat velit exercitation ut non tempor. Ea nostrud amet eu eiusmod anim anim minim ea duis et."


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://admin-sudhanshu:Test123@cluster0.apallrb.mongodb.net/blogDB")
        .catch(function (error) {
            console.log(`Unable to connect to the Mongo db  ${error} `);
        });
}


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


connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server started on port successfuly.");
});