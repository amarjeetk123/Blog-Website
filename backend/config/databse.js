const mongoose = require("mongoose");
const {MONGO_URI}  = process.env ;

mongoose.set('strictQuery', true);

const connectToDB = () =>{
    mongoose.connect(MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,  
    } ).then( (res) =>{
         console.log("DB connection succesfull")
    } ).catch((err) =>{
        console.log(err.message)
        console.log("DB connection failed")
    })
}

module.exports = connectToDB;





const Post = require("../models/post");

// function for creating post 
exports.createPost = async (req, res) => {

    try {
        const { username, title, description, photo } = req.body
        if (!username) {
            return res.status(404).send("username is required")
        }
        if (!title) {
            return res.status(404).send("title is required to crete a post")
        }
        if (!description) {
            return res.status(404).send("Description is required to crete a post")
        }

        const savePost = await Post.create({ username, title, description, photo });
        res.status(201).json({
            success: true,
            message: "Post is succesfuuly creted",
            savePost,
        })

    } catch (error) {
        console.log(error.message)
        console.log("error in creat post controller")
        res.status(201).json({
            success: false,
            message: "error in creat post controller",
            m2: error.message,
        })
    }
}

//function for update the post details
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const { username } = req.body
        if (!username) {
            return res.status(401).send("username is required to update the title")
        }
        if (post.username == username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(201).json({
                    success: true,
                    message: "post is succsesfully updated",
                    updatedPost,
                })
            } catch (error) {
                console.log(error)
                res.status(201).json({
                    success: false,
                    message: "error in edit post controller"
                })
            }
        }
        else {
            res.status(401).json({
                success: false,
                message: "You can update only your post!",
                a: post.username,
                b: username
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}

//function for delete the post details
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const { username } = req.body
        if (!username) {
            return res.status(401).send("username is required to delete the title")
        }
        if (post.username == username) {
            try {
                await post.delete();
                res.status(201).json({
                    success: true,
                    message: "post is deleted updated",
                })
            } catch (error) {
                console.log(error.message)
                console.log("error in deletePost controller")
                res.status(201).json({
                    success: false,
                    message: "error in deletePpost controller"
                })
            }
        }
        else {
            res.status(401).json({
                success: false,
                message: "You can delete only your post!",
                a: post.username,
                b: username
            })

        }


    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}
