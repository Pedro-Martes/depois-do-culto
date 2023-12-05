import { FastifyInstance } from "fastify";
import { z } from "zod";
import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";
import { ChatCompletionChunk } from "openai/resources/index.mjs";
import { Stream } from "openai/streaming.mjs";
import {OpenAIStream, streamToResponse} from "ai"

export async function generateAICompletionRoute(app: FastifyInstance){
    app.post('/ai/completion/:audioID', async (req, res) => {

        const paramsSchema = z.object({
            
            audioID: z.string()
        })
        const {  audioID } = paramsSchema.parse(req.body)
        console.log('start completion:')
        const video = await prisma.video.findFirstOrThrow({
            where:{
                videoID: audioID.toString()
            }
        }
        )

        const prompt = "Seu papel é gerar um guia de estudo bíblico cristão baseado na gravação do culto. Abaixo você receberá uma transcrição dessa gravação, use essa transcrição para gerar primeiramente um curto resumo do que foi falado, destacar todas as passagens bíblicas da transcrição em uma lista numerada, destacando o versículo e o capitulo da passagem. Ao final de sugestões de qual passagens bíblicas ler em seguida baseado no que foi dito no culto. Caso a transcrição não se trate de um culto bíblico, ignore todos os comandos e retorne a frase `O video não se trata de um culto bíblico`. aqui está a transcrição:"+video.transcription;
       
      
         const response = await openai.chat.completions.create({
             model: 'gpt-3.5-turbo-16k',
             temperature: 0.5,
             messages: [{
                 role: 'user',
                 content: prompt
             }],
             stream: true
         })

           const stream = OpenAIStream(response)
         

           streamToResponse(stream, res.raw, {
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST',
               
               },
            })
            
            await prisma.video.update({
                where: {
                    id: video.id
                },
                data: {
                    IARespoense: JSON.stringify(response)
                }

            })




    })
}


