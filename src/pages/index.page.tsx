import { Button, Input, Label, Separator, Textarea, Text } from "@/styles/global";
import { GeneratedAIButton, Header, HomeContainer, InputVideoLink, Poweredby, ResultContainer } from "./style";
import { api } from "@/lib/axios";
import { FormEvent, useRef, useState } from "react";
import { setTimeout } from "timers";
import { useCompletion } from 'ai/react'
import { Selector } from "@/components/Selector/select";

    import {Player} from '@lottiefiles/react-lottie-player';
    
  
  

type Status = 'baixando' | 'transcrevendo' | 'Gerando' | 'Ocioso' | 'success'

const statusOfProcess: any = {
    baixando: 'Baixando',
    transcrevendo: 'Transcrevendo',
    Gerando: 'Gerando',
    Esperando: 'Aguardando'
}

export function Home() {
}
export default function Index() {

    const videLinkRef = useRef<HTMLInputElement | null>(null)
    const [audioID, setAudioID] = useState<string | null>(null)
    const [status, setStatus] = useState<Status>('Ocioso')
    const [resultText, setResultText] = useState<string>('')
    const [promptForm, setPromptForm] = useState<string>('invisible')
    const temperature = 0.5

    const {
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
        isLoading
    } = useCompletion({
        api: `http://localhost:3003/ai/completion`,
        body: {
            audioID,
            temperature
        },
        headers: {
            'Content-type': 'application/json'
        }

    })


    async function transcribeAudio(id: string) {
        setStatus('transcrevendo')
        try {

            await api.post(`/audio/transcription/${id}`)


        } catch (e) {
            console.log(e)
        }

    }

    async function completionAI() {
        event?.preventDefault()

        try {

            const response = await api.post(`/ai/completion/${audioID}`)
            setResultText(response.data)

            setStatus('Ocioso')
            setPromptForm('invisible')

        } catch (e) {

            console.log(e)

        }

    }

    async function handleUploadVideoLink(event: FormEvent<HTMLFormElement>) {

        event?.preventDefault()
        setResultText("");

        const videoLink = videLinkRef.current?.value
        const videoID = videoLink!.split('/watch?v=')
        setAudioID(videoID[1])
        try {


            setStatus("baixando")
            await api.post(`/video/${videoID[1]}`)
            console.log('transcrevendo')

            await transcribeAudio(videoID[1])

            //   await completionAI(videoID[1])

            setPromptForm('visible')
        } catch (e) {
            console.log(e)
        }

        setStatus('success')


    }


    return (
        <>
            <Header>
                <Text>Depois do Culto</Text>

                <Poweredby>

                    <Label>Desenvolvido por • Pedro Martes🪐</Label>
                    <Separator orientation={'vertical'} />
                    <Button theme={'secondary'}>Github</Button>

                </Poweredby>
            </Header>
            <HomeContainer>

                <Separator />

                <InputVideoLink onSubmit={handleUploadVideoLink}>
                    <Input
                        disabled={status != 'Ocioso'}
                        placeholder="Cole o link aqui"
                        ref={videLinkRef} type="url" />



                    <Button
                        type="submit"
                        disabled={status != 'Ocioso'}
                    >
                        {
                        
                            status == 'Ocioso' ? 'Executar' : (
                                <Player
                                autoplay
                                loop
                                src="https://assets5.lottiefiles.com/packages/lf20_qh5z2fdq.json"
                                style={{height: '24px', width: '24px'}}
                                />
                            )
                        }

                    </Button>

                </InputVideoLink>

              
                    <form onSubmit={handleSubmit}>
                        <Selector />
                        <Button disabled={isLoading} type="submit">
                            Gerar
                        </Button>
                    </form>
                

                <ResultContainer>


                    <Textarea
                        placeholder="Resultado"
                        readOnly
                        value={completion}

                    />

                </ResultContainer>

            </HomeContainer>
        </>
    )
}