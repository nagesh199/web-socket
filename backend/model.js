const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/Currencies");

const currencySchema = new mongoose.Schema({
    name:String,
    qty:Number,
    price:Number,
    country:String
});

const userSchema = new mongoose.Schema({
    name:String,
    money:Number,
    currency:Number
})

const currencymodel = mongoose.model("currency",currencySchema);
const usermodel = mongoose.model("user",userSchema);

module.exports = {connection,currencymodel,usermodel}