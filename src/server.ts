import express, { response } from 'express';
import morgan from 'morgan';
import routes from './routes'
import PiuRoutes from './routes/Piu';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use(PiuRoutes);

app.get('/test', (req,res)=>{
    return response.json({message:'Helo World!'})
});

app.listen(3333, () => {
    console.log('Server stared on port 3333');
});