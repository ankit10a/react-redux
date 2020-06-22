import express from 'express';
import http from 'http';
import mongoConnect from './config/mongo';
import  {PORT, client}  from './config/key';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const userRouter = require('./routes/user')();

mongoConnect();

app.use(express.json());
app.use(
    cors({
      origin: [client, 'http://localhost:3000'],
      credentials: true
    })
  );

app.use('/user',userRouter);
app.get("/test", (req, res) => {
    res.send(`Server running on port ${PORT}`);
  });

server.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})

