import { Router } from "express";
import {uuid} from "uuidv4"

const routes = Router();
interface User {
    id: string;
    name: string;
    email: string;
}
const users = [] as User[];

routes.post('/users', (req, res)=> {
    const { name, email } = req.body;
    if(users.find(user=> user.email === email))
        return res.status(400).json({message: "User with this e-mail already exist"});
        
    const user = {
        id: uuid(),
        name,
        email
    } as User;

    users.push(user);
    return res.json(user);
});

routes.get('/users', (req,res)=>{
    return res.json(users);
})
export default routes;
