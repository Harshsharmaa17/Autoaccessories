let http = require('http');
let express = require('express')
let app = express();
var path = require('path');
let cors = require('cors');
let db = require('./Database.js')
app.use(express.urlencoded({extended:false}));
app.set('views',path.join(__dirname,'view'));

app.use(cors());
app.set('view engine', 'ejs')
app.get('/',function(req,res) {
    let msg = "";
    if( req.query['msg']!="")
    msg = req.query['msg'];
    res.render('menu',{msg:msg});
});
// app.get('/' ,function(req,res) {
//     res.render('menu')
// })
app.get('/listuser',function(req,res) {
    // res.end('list user')
    let sql = "select * from user";
    db.query(sql,function(err,result,fields){
        if(err)
        redirect('/');
        else
        res.render('userlist_view',{userlistobj:result});
    });
    
});
// app.use(express.static('adduser'))
app.get('/registeruser',function(req,res) {
    res.redirect('adduser')
    // res.end('hello')
    // res.status(200)
});
app.post('/addusersubmit',function(req,res){
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.pass;
    let dob = req.body.dob;
    // res.end(lname);
    let sql = "insert into user (fname ,lname,email,password,dob) values ('"
    +fname+"','"+lname+"','"+email+"','"+password+"','"+dob+"')" ;
    let msg ="";
    db.query(sql,function(error,result,fields){
        if(error)
        msg = " unable to add user";
        else 
        {
            msg = " user add successfully with id:--" +result.insertID;
            res.redirect("/?msg="+msg);
        }
    })
})
app.get('/deleteuser',function(req,res) {
    let sql = "delete from user where uid="+req.query['uid'];
    db.query(sql,function(err,result,fields){
        if(err)
        res.redirect('/');
        else 
        res.redirect('/listuser');
    });
});
app.get('/edituser', function(req,res) {
    let sql = "select * from user where uid="+req.query['uid'];
    db.query(sql,function(err,result,field){
        if(err)
        res.redirect('/');
        res.render('edituserform',{data:result});
        console.log(result);
    });
});
app.post('/editusersubmit',function(req,res){
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let uid = req.body.uid;
    let sql_update = "update user set fname='"+fname+"','"+lname+"',email='"+email+"' where uid="+uid;
    db.query(sql_update,function(err,result,fields){
        if(err) {
            console.log(err);
            res.redirect('/');
        }
        else 
        res.redirect('/listuser');
    });
});
app.listen(8070);
console.log('server is running on 8070');