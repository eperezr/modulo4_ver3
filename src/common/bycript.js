import logger from "../logs/logger.js";
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const encriptar = async (texto) =>{
    try{
        const saltRounds = +process.env.BCRYPT_SALT_ROUND
        return await bcrypt.hash(texto, saltRounds)
    }catch(error){
        logger.error(error.message)
        throw new Error('Error al encriptar')
    }
}

export const comparar = async(texto, hash)=>{
    try{
        const saltRounds = process.env.BCRYPT_SALT_ROUND
        return await bcrypt.compare(texto, hash)
    }catch(error){
        logger.error(error.message)
        throw new Error('Error al encriptar')
    }
}