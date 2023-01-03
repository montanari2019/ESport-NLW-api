import express from "express"
import { PrismaClient } from "@prisma/client"
import { ConverteHours } from "./utils/converter-hours"
import { ConverterHoursInString } from "./utils/converter-hours-string"
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())

const prisma = new PrismaClient({
    log: ["query"]
})

const port = 3232


app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true

                }
            }
        }
    })

    // return response.json(games)
    return response.json(games)
})

app.get("/", (request, response) => {
    console.log("Teste")
    return response.json({ message: "Api funcionando novamente" })
})

app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            gameId: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
            createAt: true

        },
        where: {
            gameId
        },
        orderBy: {
            createAt: "desc"
        }
    })

    return response.json(ads.map((ad) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: ConverterHoursInString(ad.hourStart),
            hourEnd: ConverterHoursInString(ad.hourEnd),
        }
    }))
})

app.get("/ads/:id/discord", async (request, response) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord
    })
})

app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id

    const body:any = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            discord: body.discord,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(','),
            hourStart: ConverteHours(body.hourStart),
            hourEnd: ConverteHours(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)
})

app.listen(port)