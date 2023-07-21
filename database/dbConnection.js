import mongoose from "mongoose";

export default function dbConnection() {
    mongoose.set('strictQuery', false)
    // mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_mongodb').then(() => {
    mongoose.connect('mongodb+srv://alaa:alaa123@cluster0.3snj6dl.mongodb.net/ecomxyz').then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('ERORR ', err);
    })
}

// ${process.env.DB_USER}:${process.env.DB_PASSWORD}