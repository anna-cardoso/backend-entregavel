import express from 'express'; 

const app = express();

app.use(morgan('dev'));

app.get('/', (request, response) =>{
    return response.json({ message: 'Hello World'});
});

app.listen(3333, ()=> {
    console.log('Server stared on port 3333!');
})