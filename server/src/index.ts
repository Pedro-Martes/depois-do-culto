
import {fastify} from 'fastify'
import {fastifyCors} from '@fastify/cors'
import { downloadVideo } from './routes/download'
import { createTranscriptionRoute } from './routes/transcription'
import { generateAICompletionRoute } from './routes/generate-ai-completion'

const app = fastify()
const port = 3003

app.register(fastifyCors, {
    origin: '*'
})

app.register(downloadVideo)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)


app.listen({
    port: port, 
}).then(() => {
    console.log(`Server running on http://localhost:${port}`)
})