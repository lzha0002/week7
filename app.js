const mongodb = require('mongodb');
var mongoose = require('mongoose');
const express = require("express");
const bodyparser = require('body-parser');
const ejs = require('ejs');
const app=express();
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
mongoose.set('useNewUrlParser', true);

const Tasks = require('./models/tasks');
const Developers = require('./models/developers');
let url='mongodb://localhost:27017/week7';

mongoose.connect(url, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
    app.listen(8080);
});




app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});



app.get('/insertnewdeveloper', function (req, res) {
    res.sendFile(__dirname + '/views/insertnewdeveloper.html');
});

app.post('/newdeveloperpost',function(req,res){
    let developerdetails=req.body;
    let Developer1 = new Developers({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: developerdetails.firstname,
            lastName: developerdetails.lastname
        },
        Level: developerdetails.level,
        Address: {
            State: developerdetails.state,
            Suburb: developerdetails.suburb,
            Street: developerdetails.street,
            Unit: developerdetails.unit
        }

    });
    Developer1.save(function (err) {
        if (err) 
        throw err;
        console.log('Developer successfully Added to DB');  
    });
    res.redirect('/getalldeveloper')
   
});


app.get('/getalldeveloper', function (req, res) {

    Developers.find({ },function (err, data) {
        res.render('getalldeveloper.html', { usersDb: data });
    });
});

app.get('/inserttask', function (req, res) {
    res.sendFile(__dirname + '/views/inserttask.html');
});

app.post('/newtaskpost',function(req,res){
    let taskdetails=req.body;
    let task1 = new Tasks({
        _id: new mongoose.Types.ObjectId(),
        Taskid:Math.floor(Math.random()*100) + 1,
        Taskname: taskdetails.taskname,
        Assignto: taskdetails.assignto,
        Duedate: taskdetails.duedate,
        Taskstatus: taskdetails.status,
        TaskDesc: taskdetails.taskdesc

    });
    task1.save(function (err) {
        if (err) throw err;
        console.log('task has been successfully Added to DB');  
    });
    res.redirect('/getalltask')  
});

app.get('/getalltask', function (req, res) {

    Tasks.find({ },function (err, data) {
        res.render('getalltask.html', { usersDb: data });
    });
});

app.get('/deletetask', function (req, res) {
    res.sendFile(__dirname + '/views/deletetask.html');
});


app.post('/deletetask', function (req, res) {
    let taskDetails = req.body;
    Tasks.deleteOne({ 'Taskid': parseInt(taskDetails.oldid) },function (){});
    
    res.redirect('/getalltask');
});

app.get('/deletecompletedtasks', function (req, res) {
    res.sendFile(__dirname + '/views/deletecompletedtasks.html');
});

app.post('/deletecomplete', function (req, res) {
    Tasks.deleteMany({'Taskstatus':'Complete'},function(){});
    res.redirect('/getalltask');
});

app.get('/updatetaskstatus', function (req, res) {
    res.sendFile(__dirname + '/views/updatetaskstatus.html');
});

app.post('/updatetask', function (req, res) {
    let taskDetails = req.body;
    Tasks.updateOne({ 'Taskid': parseInt(taskDetails.oldid) }, { $set: { 'Taskstatus':taskDetails.newstatus} }, function () {});
    res.redirect('/getalltask')
});


app.get('/updatename/:oldfirstname/:newfirstname',function(req,res){
    let oldfirstname = req.params.oldfirstname;
    let newfirstname = req.params.newfirstname;
    Developers.updateMany({'name.firstName': oldfirstname},{$set:{'name.firstName':newfirstname}},function(err,data){
        res.redirect('/getalldeveloper')
    })
});


