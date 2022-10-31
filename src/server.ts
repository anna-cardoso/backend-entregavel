import express, { response } from 'express';

const app = express();

app.get('/test', (req,res)=>{
    return response.json(message:'Helo World')
});

app.listen(3333, () => {
    console.log('Server stared on port 3333');
});