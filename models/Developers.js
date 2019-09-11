var mongoose = require('mongoose');

let DevelopersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    Level: {
        type:String,
        validate:{
            validator:function(level){
                return level =='Beginner'|| level=='Expert'
            },
            message:'Level should be Beginner or Expert'
        },
        required:true
    },
    Address:{
        State:String,
        Suburb:String,
        Street:String,
        Unit:String
    },
  
});
module.exports = mongoose.model('Developers', DevelopersSchema,'Developers');
