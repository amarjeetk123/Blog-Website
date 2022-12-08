const User = require("../models/User");
const bcrypt = require("bcryptjs")

const Post = require("../models/Post")    // i am using this is delete controller....

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

        //check if user email exists or not
        let email = newUser.email
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).send("emailid already found in database")
        }

        //check if username exists or not
        let username = newUser.username
        const existingUser2 = await User.findOne({ username })
        if (existingUser2) {
            return res.status(401).send("userNmae already found in database")
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
        res.status(401).json({
            success: false,
            message: "error in register controller"
        })

    }
};

// Function for user Login
exports.login = async (req, res) => {
    try {
        //collected information from frontend
        const { email, password } = req.body

        //validate
        if (!(email && password)) {
            res.status(401).send("email and password is required")
        }
        //check user in database
        const user = await User.findOne({ email })

        // if user is not exist
        if (!user) {
            return res.status(401).json("Wrong email")
        }

        // match the password
        const validate = await bcrypt.compare(password, user.password)

        if (!validate) {
            return res.status(401).json("Wrong Password")
        }

        password = undefined

        res.json({
            succsess: true,
            user,
            message: "user login succesfully"
        })


    } catch (error) {
        console.log("error is:-", error.message)
        res.status(201).json({
            succsess: false,
            message: "error in login controller"
        })

    }
}

// Function for update user information

exports.update = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt); // it is another awy of hashing the password with salt value

        }
        if (req.body.username) {
            return res.status(401).send("You can not update your username")
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            updatedUser.password = undefined;
            res.status(201).json({
                success: true,
                message: "user information updated succesfully",
                updatedUser
            });

        } catch (error) {
            console.log(error.message)
            res.status(401).json({
                success: false,
                message: "error in update controller"
            });

        }

    }
    else {
        res.status(401).json("You can update only your account!..")
    }
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


// function for creating post  // allmost same as /register  in /register i am using .save for saving data in datavase but here i will used .create for saving data inside databse

exports.createPost = async (req, res) => {

    try {
        const { username, title, description } = req.body
        if (!username) {
            return res.status(404).send("username is required")
        }
        if (!title) {
            return res.status(404).send("title is required to crete a post")
        }

        const savePost = await Post.create({ username, title, description });
        res.status(201).json({
            success: true,
            message: "Post is succesfuuly creted",
            savePost
        })

    } catch (error) {
        res.status(201).json({
            success: false,
            message: "error in creat post controller"
        })

    }
}

//function for update the post details
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const { username, title } = req.body
        if (!username) {
            return res.status(401).send("username is required to update the title")
        }
        if (post.username == username) {
            try {
                const titleexist = await Post.findOne({ title })
                if (titleexist) {
                    return res.status(401).send("Please write another title this title is already in use")
                }
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(201).json({
                    success: true,
                    message: "post is succsesfully updated",
                    updatedPost,
                })
            } catch (error) {
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
        const { username, title } = req.body
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
        res.status(500).send(error)
    }

}

// function for getting the post  - almost same like getUser
exports.getPost = async (req,res) => {
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


