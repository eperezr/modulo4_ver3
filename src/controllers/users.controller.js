import { User } from '../models/user.js'
import { Task } from '../models/task.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            where: {
                status: Status.ACTIVE
            }
        })
        res.json(users)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message,
        })
    }
}
async function createUsers(req, res) {
    const { username, password } = req.body
    try {
        logger.info('[userController] createUser: ' + username)
        const user = await User.create({
            username,
            password,
        })
        return res.json(user)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

async function getUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username', 'status'],
            where: { id }
        })
        if(!user)
            return res.status(404).json({message: "Usuario no encontrado"})
        return res.json(user)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message,
        })
    }
}

const updateUser = async(req, res)=>{
    const{id}= req.params
    const {username, password} = req.body
    try {
        if(!username || !password)
            return res.status(400).json({message: 'Falta username o password'})
        
        const user = await User.update({
            username:username,
            password:password,
        },
        {
            where:{id},
        }
    )
    return res.json(user)

    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

const activeInactive = async(req, res)=>{
    const {id} = req.params
    const {status} = req.body
try{
    if(!status)
        return res.status(400).json({message: 'No existe el status'})
    
    const user = await User.findByPk(id)
    if(user.status == status)
        return res.status(409).json({message:`El usuario ya se encuentra ${status}`})
    user.status = status;
    await user.save()
    res.json(user)
}catch(error){
    logger.error(error.message)
    res.status(500).json({
        message: error.message
    })
}
}

const deleteUser = async (req, res)=>{
    const {id}=req.params
    try {
        await Task.destroy({where:{userId:id}})
        await User.destroy({where:{id}})
        return res.sendStatus(204)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

async function getTasks(req, res){
    const {id} = req.params
    try {
        const user = await User.findOne({
            attributes: ['username'],
            where: {id},
            include:[{
                model: Task,
            }]
        }
        )
        res.json(user)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

export default {
    getUsers,
    createUsers,
    getUser,
    updateUser,
    activeInactive,
    deleteUser,
    getTasks
}