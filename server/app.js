require("dotenv").config();
const Express = require("express");
const mongoose = require("mongoose");
const userRoute=require("./src/Routes/userRoute")
const hostRoute=require("./src/Routes/hostRoute")
const AdminRoute= require("./src/Routes/adminRoute")
const errorhandler= require("./src/Middleware/Errorhandler")
const app = Express();
const cors=require("cors")

app.use(Express.json())

app.use(
  cors({
    origin: "https://own-bnb.vercel.app",
    //origin: "http://localhost:5173", 
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"], 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);


app.use("/user",userRoute)
app.use("/host",hostRoute)
app.use("/admin",AdminRoute)

app.use(errorhandler)
console.log(process.env.MONGO_URI);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("database connection error", error)
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});

