import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring'; 
import url from 'url';

export var save= async(req,res,next)=>{
    var userdetails = req.body
    var userList= await UserSchemaModel.find();
    var l=userList.length;
    var _id =l==0?1:userList[l-1]._id+1;
    
userdetails = {...userdetails,"_id":_id, "role":"user","status":0,"info":Date()};
//console.log(userdetails); use to print the detail in console
try
{
    var user= await UserSchemaModel.create(userdetails);
   res.status(201).json({"status":true});
}
catch(err)
{
    console.log(err);
    res.status(500).json({"status":false});
}
};
export var login = async(req,res,next)=>{
    var userdetails=req.body;
    userdetails={...userdetails,"status":1};
    var userList=await UserSchemaModel.find(userdetails);
    var l=userList.length;
    if(l!=0)
    {
        let payload = {"subject":userList[0].email};
        let key = rs.generate();
        let token=jwt.sign(payload,key);
        return res.status(201).json({"token":token,"userdetails":userList[0]});
    }
    else
    return res.status(500).json({"token":"error"});

};



export var fetch = async(req,res,next)=>{
    var condition_object= url.parse(req.url,true).query;
    var userList= await UserSchemaModel.find(condition_object);

    //1 means assending or -1 means decending
   // var userList=await UserSchemaModel.find().sort({"_id":-1});
  // var userList=await UserSchemaModel.find({"_id":4});
  //var userList=await UserSchemaModel.find({"status":{"$lt":1}});
//var userList=await UserSchemaModel.find({"_id":{"$lte":5}});
//var userList=await UserSchemaModel.find({$and:[{"_id":5},{"email":"khush@gmail.com"}]});
//var userList=await UserSchemaModel.find({$or:[{"_id":5},{"email":"ronak@gmail.com"}]});
//var userList=await UserSchemaModel.aggregate({$group:{_id:"_id",mobile:{$sum:"$mobile"}}});





   //var userList=await UserSchemaModel.find({"status":{"$gte":1}});

    var l=userList.length;
    if(1!=0)
    
        return res.status(201).json(userList);
        else
        return res.status(500).json({"result":"server error"});
    }


    export var deleteuser=async(req,res,next)=>{
        var condition_object=req.body;
        var user = await UserSchemaModel.find(condition_object);
        if(user.length!=0){
            let result =await UserSchemaModel.deleteMany(condition_object);
            if(result)
            return res.status(201).json({"msg":"success"});
        else 
        return res.status(500).json({error:"server error"});
        }
        else
        return res.status(404).json({error : "Resource not found"});
    }
    export var updateUser=async(req,res,next)=>{
        let userDetails = await UserSchemaModel.findOne(JSON.parse(req.body.condition_obj));
        if(userDetails){
           let user=await UserSchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});   
           if(user)
            return res.status(201).json({"msg":"success"});
           else
            return res.status(500).json({error: "Server Error"});
        }
        else
         return res.status(404).json({error: "Requested resource not available"});
      }