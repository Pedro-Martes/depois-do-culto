import { OpenAI} from 'openai'
import 'dotenv/config'

export const openai = new OpenAI({
    apiKey: process.env.OPEN_IA_KEY,
})