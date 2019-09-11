var mongoose = require('mongoose');
let TasksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Taskid:Number,
    Taskname: {
        type:String
    },
    Assignto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Developers'
    },
    Duedate:{
        type:Date
    },
    Taskstatus:{
        type:String,
        validate:{
            validator:function(status){
                return status =='InProgress'|| status=='Complete'
            },
            message:'Task status should be InProgress or Complete'
        }
    },
    TaskDesc:String,
    
});
module.exports = mongoose.model('Tasks', TasksSchema,'Tasks');