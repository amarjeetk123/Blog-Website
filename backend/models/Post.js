const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    title:{
        type:String,
        // unique:[true , "title should be unique" ] ,
        required : [true , "title is required"]
    },
    description:{
        type:String,
        required : [true , "title is required"]
    },
    photo:{
        type: String,
        default: "",
        required : false,
    },
    username:{  // username for author name
        type : String ,
    },
    category:{
        type:Array,  // array means collection of music, life and all the category
        required: false,

    }

},

{ timestamps:true }

)

// module.exports = mongoose.model("Post" , postSchema )
module.exports = mongoose.models['Post'] || mongoose.model('Post', postSchema)
