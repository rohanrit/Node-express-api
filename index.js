import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port,()=>{
console.log(`app asfasdf listening on port ${port}`);

})