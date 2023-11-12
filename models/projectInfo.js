const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true,
        unique: true,
    },
    description :{
        type: String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const Project =mongoose.model('Project', projectSchema);
model.exports =Project;

