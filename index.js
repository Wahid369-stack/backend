import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app=express();
app.set("view engine","ejs");
// console.log();
//using middle ware
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"Whatsapp",
}).then(()=>{
    console.log("Databse Connected...")
}).catch((e)=>console.log(e));
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
});


const User= new mongoose.model("User",userSchema);

app.get("/",(req,res)=>{
   res.render("login");
    
});

app.get("/logout",(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.redirect("/");
})
const isAuthenticated=(req,res)=>{
    const {token}=req.cookies;
    if(token){
        next();
    }else res.render("login");
};
app.get("/",isAuthenticated,(req,res)=>{
    res.render("logout");
})
app.post("/login",(req,res)=>{
res.cookie("token","iamin",{
    httpOnly:true,
    expires:new Date(Date.now()+60*1000),
});
res.redirect("/");
});



app.listen(5000,()=>console.log("server is working"));