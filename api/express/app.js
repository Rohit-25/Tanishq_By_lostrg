let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient =mongo.MongoClient;
let mongoUrl =process.env.MongoLive;
let bodyParser = require('body-parser')
let db;
let port = process.env.PORT || 9800;
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send('this is from express')
}
)
//list of  earrings
app.get('/earring',(req,res)=>{
    let query={};
    let item_id =Number(req.query.item_id);
    let category_id = Number (req.query.category_id);
    let sort={sort:1}
    if(sort){
        sort={new_price:req.query.sort}
    }
    if(item_id){
        query={item_id: item_id}
    }
    else if(category_id){
        query={category_id : category_id}
    }
    db.collection('earring').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
}
)
//list of rings 
app.get('/rings',(req,res)=>{
    let query={};
    let item_id =Number(req.query.item_id); 
    let sort={sort:1}
    let category_id = Number (req.query.category_id);
    if(sort){
        sort={new_price:req.query.sort}
    }
    if(item_id){
        query={item_id: item_id}
    }
    else if(category_id){
        query={category_id : category_id}
    }
    
    db.collection('rings').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
}
)

app.get('/category',(req,res)=>{
    db.collection('category').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
}
)
//details of jwellery
app.get('/details/:id',(req,res)=>{
    let id =Number(req.params.id)
    
    db.collection('rings').find({item_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//place order
app.post('/placeOrder',(req,res)=>{

})

//connection with Mongo
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('error while connecting');
    db = client.db('mydb')
    app.listen(port,()=>{
        console.log('listing to port')
    })

}

)

//
// db.rings.find({"category_id":2},{"description":1,"_id":0}).pretty()
// db.rings.find({"category_id":2},{"description":1,"_id":0,"new_price":1}).sort({new_price:1})
