import ytdl from 'ytdl-core'
import fs from 'fs'

import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'


export async function downloadVideo(app: FastifyInstance) {
    app.post('/video/:id', async (req: any) => {
        const videoId = req.params.id as string
        const videoUrl = "https://www.youtube.com/watch?v=" + videoId
        const filePath = `./tmp/${videoId}.mp3`



        if (fs.existsSync(filePath)) {
            console.log('video ja baixado')
            return
        }


        const downloadPromise = new Promise<void>((resolve, reject) => {
            ytdl(videoUrl, {
                quality: 'lowestaudio',
                filter: 'audioonly'
            }).on('info', (info) => {
                console.log(info)

            }).on('end', () => {
                console.log('Terminou de baixar')
                console.log(Date())
                resolve() // Resolver a promise
            }).on('error', (error) => {
                console.log(error);
                reject(error)
            }).pipe(fs.createWriteStream(filePath))
        })


        await downloadPromise
        console.log('video baixado')
        await prisma.video.create({
            data: {
                videoID: videoId.toString(),


            }
        })
        console.log('inserido no banco')




    })

}