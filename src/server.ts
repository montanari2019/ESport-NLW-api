import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()

const prisma = new PrismaClient({
    log: ["query"]
})

const port = 3232

app.get("/games", async (req, res) =>{
    const games = await prisma.game.findMany()

    // return res.json(games)
    return res.json({games})
})

app.get("/", (req, res)=>{
    console.log("Teste")
    return res.json({message: "Api funcionando novamente"})
})

app.listen(port)