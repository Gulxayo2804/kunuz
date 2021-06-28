const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categoryID:{
        type:mongoose.ObjectId,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)

module.exports = mongoose.model('news',newsSchema)

