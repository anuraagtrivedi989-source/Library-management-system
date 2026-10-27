const { Double } = require("mongodb")
const  mongoose = require("mongoose")

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{
        type:string, 
        required:true
    }, author:{
        type:string,
        required:true
    },genre:{
        type : string,
        required : true
    },price:{
        type: integer,
        requird:true
    },publishedYear:{
        type:integer,
        required:true
    },stock:{
        type:integer,
        required:true
    },rating:{
        type:Double,
        required:true
    }
},{timestmps:true})

module.exports= connection.Model("Book", bookSchema)