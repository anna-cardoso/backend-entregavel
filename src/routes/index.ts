import { Router } from "express";
import {uuid} from "uuidv4"

const routes = Router();
interface User {
    id: string;
    name: string;
    birth: string;
    cpf: string;
    PhoneNumber: string;
}
const users = [] as User[];

routes.post('/users', (req, res)=> {
    const { name, birth, cpf, PhoneNumber } = req.body;
    const user = {
        id: uuid(),
        name,
        birth,
        cpf,
        PhoneNumber
    } as User;

///verificação para saber se os campos estão preenchidos
    if(users.find(user => user.cpf === cpf))
        return res.status(400).json({message: "This CPF is already in use"});

    if(user.name === "")
        return res.status(411).json({message: "The user name can't be empty"})
    
    if(user.birth === "")
        return res.status(411).json({message: "The user birth can't be empty"})
    
    if(user.cpf === "")
        return res.status(411).json({message: "The user CPF can't be empty"});
    
    if(user.PhoneNumber === "")
        return res.status(411).json({message: "The user phone number can't be empty"});
    
    users.push(user);
    return res.json(user);
});
///lista de usuarios
routes.get('/users', (req,res)=>{
    return res.json(users);
})
///verificação para saber se o id do usuário informado existe
routes.get('/users/:id', (req, res) =>{
    const {id} = req.params;

    const user = users.find(user => user.id === id);
    if(!user) return res.status(404).json({message: "User not found"});
    res.json(user);
})




/////PIUS
interface Piu {
    id: string;
    user_id: string;
    text:string;
}
const pius = [] as Piu[];
////criaçao de pius
routes.post('/pius', (req, res)=>{
    const {id, user_id, text} = req.body;

    const piu = {
        id: uuid(),
        user_id,
        text
    } as Piu;
///verificação o texto está vazio
    if(piu.text === "")
        return res.status(411).json({message: "The text can't be empty"})
///verificação de 140 carac.
        if(piu.text.length > 140){
        return res.status(413).json({message: "This text exceed the 140 character capcity"})
    }
///verificação para saber se o id do usuário informado é válido
    const user = users.find(user => user.id === id);
    if(!user) return res.status(404).json({message: "User not found"});
    res.json(user);

    pius.push(piu);
    return res.json(piu);
})
///lista de pius
routes.get('/pius', (req,res) => {
    return res.json(pius);
})
///obter pius pelo id
routes.get('/pius/:id', (req, res)=>{
    const {id} = req.params;

    const piu= pius.find(piu => piu.id === id);
    if(!piu) return res.status(404).json({message: "This piu does not exist"});
})



export default routes;
