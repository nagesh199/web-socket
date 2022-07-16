const {Server} = require("socket.io");
const express = require("express");
const http = require("http");
const { currencymodel, usermodel, connection } = require("./model");
const app = express();


const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        allowedHeaders :["my-custom-header"],
        credentials:true
    }
})

io.on("connection",async(socket)=>{

    const data = await currencymodel.find() ;
    const userdata = await usermodel.find();

    const payload = {
        data,
        userdata
    };
    socket.emit("currency",payload);

    socket.on("purchase", async(payload)=>{
        const userdata = await usermodel.find();
        const temp = userdata[0].money.payload ;

        await usermodel.updateOne({},{$set:{"money":temp}})
    })

    socket.on("sell", async(payload)=>{
        const userdata = await usermodel.find();
        const temp = userdata[0].money.payload ;

        await usermodel.updateOne({},{$set:{"money":temp}})
    })
})
//  app.use(express.urlencoded({extended:true}));
//  app.use(express.json());

//  app.post("/post", async(req,res)=>{
//      try {
//         const Data =   await usermodel.create(req.body);
//         return res.status(202).send(Data)
//      }
//      catch(err){
//         return res.send({message:err.massage})
//      }
    
//  })
httpServer.listen(8000, async ()=>{
    await connection ;
    console.log("server started on 8000")
})