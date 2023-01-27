const User = require("../models/User");
const bcrypt = require("bcryptjs")
const validator = require("email-validator");

const Post = require("../models/Post");    // i am using this is delete controller....

exports.home = (req, res) => {
    res.send("Amarjett Kumar Aryan");
};

// Function for user registraion
exports.register = async (req, res) => {
    try {
        // craete a new user 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        if (!(newUser.username && newUser.email && newUser.password)) {
            return res.status(401).send("All field are required")
        }

        //check if username exists or not
        let username = newUser.username
        const existingUser2 = await User.findOne({ username })
        if (existingUser2) {
            return res.status(401).send("userNmae already exist")
        }

        // do email validation
        const a = validator.validate(newUser.email);
        if (a == false) {
            return res.status(401).send("Email is not in correct format")
        }

        //check if user email exists or not
        let email = newUser.email
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).send("Email id already exist")
        }


        //encrypt the password
        const myEncyPassword = await bcrypt.hash(newUser.password, 10)
        newUser.password = myEncyPassword

        // add these user in databse
        const user = await newUser.save()

        //don't want to send the password
        newUser.password = undefined;


        // now send a message to frontend guy
        res.status(201).json({
            success: true,
            user,
            message: "user added to databse succesfully"
        })

    } catch (error) {
        console.log("error is:-", error.message)
        console.log("error in register controller")
        res.status(401).json({
            success: false,
            message: "user is not registerd"
        })

    }
};

// Function for user Login
exports.login = async (req, res) => {

    //collected information from frontend
    let { username, password } = req.body
    try {

        //validate
        if (!username) {
            return res.status(401).send("username is required")
        }
        if (!password) {
            return res.status(401).send("password is required")
        }
        //check user in database
        const user = await User.findOne({ username })

        // if user is not exist
        if (!user) {
            return res.status(401).json("Wrong username")
        }

        // match the password
        let validate = await bcrypt.compare(password, user.password);

        if (!validate) {
            return res.status(401).json("Wrong Password");
        }

        user.password = undefined;

        res.json({
            succsess: true,
            user,
            message: "user login succesfully",

        })


    } catch (error) {
        console.log("error is:-", error.message)
        console.log("error in login controller")
        res.status(201).json({
            succsess: false,
            message: "error in login controller"
        })

    }
}

// Function for update user information
exports.update = async (req, res) => {



    const { email, password, profilepicture } = req.body
    // console.log(profilepicture)
    const data = {}
    // if(!email){
    //     return res.status(401).send(" email id is requird")
    // }
    // if(email){
    //     const res = await User.findById({email})
    //     if(res){
    //         return res.status(401).send("You Entered the same email as ")
    //     }
    //     data.email = email;
    // }
    if (password == "") {
        return res.status(401).send("Please give a password")
    }
    if (password && password !== "") {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt); // it is another awy of hashing the password with salt value
        data.password = req.body.password
    }
    if (profilepicture) {
        data.profilepicture = profilepicture
    }



    try {
        const user = await User.findByIdAndUpdate(req.params.id, data)

        user.password = undefined;
        res.status(201).json({
            success: true,
            user,
            message: "user information updated succesfully",

        });

    } catch (error) {
        // console.log(error.message)
        console.log("error in")
        res.status(401).json({
            success: false,
            message: "error in update controller"
        });
    }
    // }
    // else {
    //     res.status(401).json("You can update only your account!..")
    // }
}

// Function for delete user 
exports.deleteuser = async (req, res) => {

    if (req.body.userId === req.params.id) {

        try {  // this try catch is for deleting all the post of that user which are deleting thier account

            const user = await User.findById(req.params.id)

            try {         // this try catch is for delete user 
                await Post.deleteMany({ username: user.username })  // deleting all the post of user
                const updatedUser = await User.findByIdAndDelete(req.params.id)
                res.status(201).json({
                    success: true,
                    message: "user deleted succesfully",
                });

            } catch (error) {
                console.log(error.message)
                res.status(401).json({
                    success: false,
                    message: "error in delete controller in second try catch "
                });
            }
        } catch (error) {
            console.log(error.message)
            res.status(404).json({
                message: "user not found!",
                success: false,
                message: "error in delete controller in first try catch ",

            });
        }
    }
    else {
        res.status(401).json("You can only delete your account!..")
    }
}

// function for get a single user 
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...userInformation } = user._doc;  // we are fetchin all the information excluding user password
        res.status(201).json({
            success: true,
            message: "user found succesfully",
            userInformation
        })

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            success: false,
            message: "error in getUser controller  "
        });

    }
}

exports.getUserByUserName = async (req, res) => {

    try {
        let { username } = req.body

        const user = await User.findOne({ username })
        user.password = undefined
        res.status(201).json({
            success: true,
            message: "user found succesfully",
            user
        })

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            success: false,
            message: "error in getUserByUserName controller"
        });

    }
}

// function for creating post  // allmost same as /register  in /register i am using .save for saving data in datavase but here i will used .create for saving data inside databse
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

// function for getting \any post on search or by postid  - almost same like getUser
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(201).json({
            success: true,
            post,
        })

    } catch (error) {
        console.log(error.message)
        console.log("error in getPost controller")
        res.status(201).json({
            success: false,
            message: "error in getPost controller"
        })
    }
}

// function for getting the post  
exports.getAllPost = async (req, res) => {
    const username = req.query.user;
    const categoryname = req.query.cat;
    const search = req.query.search;
    try {
        let posts;
        if (username) {        // it will show all thw posts related to a single user
            posts = await Post.find({ username: username })
        }
        else if (categoryname) {  // it will show all the posts related to a perticular categories
            posts = await Post.find({
                category: {
                    $in: [categoryname]
                }
            })
        }
        // else if(search){
        //     let username = search;
        //     let title = search;
        //     posts = await Post.find({ username:username })
        //     if(posts.length==0){
        //         posts = await Post.find({ title:title }) 
        //         // console.log("zero")
        //     }
        // }
        else if(search){
            posts = await Post.find({ $or: [{ title: new RegExp(search, 'i')} , {username: new RegExp(search, 'i')}   ] })  // it will search the post ny title or username
        }
        else {
            posts = await Post.find()  // it will show all the posts
        }
        res.status(201).json({
            success: true,
            posts
        })

    } catch (error) {
        console.log(error.message)
        console.log("error in getAllPost controller")
        res.status(201).json({
            success: false,
            message: "not able to find getAllPost"
        })
    }
}