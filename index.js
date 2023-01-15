let express = require('express');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config();
let app = express();
let Mongo = require('mongodb');
const { query } = require('express');
let MongoClient = Mongo.MongoClient;
let mongouturl = process.env.LiveMongo;
let port = process.env.PORT || 5000 ;
let bodyParser = require('body-parser')
const ObjectID = require('mongodb').ObjectId;

let db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors());





app.get('/movies',(req,res) => {   
    db.collection('Movie').find().toArray((err,result)=>{
        if(err) {
            console.log(err,"err while listing");
            res.send("Error while connecting to  server :-(")
        }
        res.send(result);  
    })  
})
app.get('/movies/:gener',(req,res) => {  
    let genre = req.params.gener 
    db.collection('Movie').find({genre:genre}).toArray((err,result)=>{
        if(err) {
            console.log(err,"err while listing");
            res.send("Error while connecting to  server :-(")
        }
        res.send(result);  
    })  
})
app.get('/movieid',(req,res) => {  
    // let _id = ObjectID(req.params._id)
    let _id = ObjectID(req.query._id)
    // console.log(_id);
    // console.log(id);
    db.collection('Movie').find({"_id":_id}).toArray((err,result)=>{
        if(err) {
            console.log(err,"err while listing");
            res.send("Error while connecting to  server :-(")
        }
        res.send(result);  
    })  
})
app.get('/movie/video',(req,res) => {  
    // let _id = ObjectID(req.params._id)
    let _id = ObjectID(req.query._id)
    // console.log(_id);
    // console.log(id);
    db.collection('Movie').find({"_id":_id}).toArray((err,result)=>{
        if(err) {
            console.log(err,"err while listing");
            res.send("Error while connecting to  server :-(")
        }
        res.send({src:result[0].thumbnail});  
    })  
})



MongoClient.connect(mongouturl,(err,client)=>{
    if(err) console.log('err while connect');
    db = client.db('Netflix');
  
    app.listen(port,()=>{
        console.log('servre is runnun in ' + port )
    })
    
})