import express from "express"

const app = express()

const port = 3232

app.get("/", (req, res)=>{
    console.log("Teste")
    return res.json({message: "Api funcionando novamente"})
})

app.listen(port)