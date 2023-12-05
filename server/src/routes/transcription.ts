import { FastifyInstance } from "fastify";
import { createReadStream } from "fs";
import { string, z } from 'zod';
import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";

export async function createTranscriptionRoute(app: FastifyInstance) {
    app.post('/audio/transcription/:video_id', async (req: any) => {
        const video_id = req.params.video_id as string
        const videoPath = `./tmp/${video_id}.mp3`
        const audioReadStream = createReadStream(videoPath)

        const audio = await prisma.video.findFirstOrThrow({
            where: { videoID: video_id },

        });

        if (audio.transcription) {
            console.log(`A transcrição já existe`)
            return
        }
        console.log(video_id + " - " + videoPath)



        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,

        })



        const transcription = response.text.toString()

        try {


            await prisma.video.update({
                where: {
                    id: audio.id
                },
                data: {

                    transcription: transcription

                }
            })
        }catch(e){
            console.log(e)
        }

        console.log('transcrição finalizada')

    })
}