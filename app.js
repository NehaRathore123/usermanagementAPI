import  express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
const app = express();

//to link router
import userRouter from './routes/user.router.js';

//to overcome cross origin problem
app.use(cors());

//to extract body data from request
//(post,put,delete,patch)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//route level middleware for url routing
app.use("/user",userRouter);

app.listen(3001);
console.log("server invoked at link http://localhost:3001");