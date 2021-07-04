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
    // image:{
    //     type:String,
    //     required:false
    // }
},{
    timestamps:true
}
)

module.exports = mongoose.model('News',newsSchema)

