import { Button, Input, Label, Separator, Textarea, Text } from "@/styles/global";
import { GeneratedAIForm, Header, HomeContainer, InputVideoLink, Poweredby, ResultContainer } from "./style";
import { api } from "@/lib/axios";
import { FormEvent, useRef, useState } from "react";
import { Selector } from "@/components/Selector/select";

import dynamic from 'next/dynamic';


const DynamicPlayer = dynamic(
    () => import("@lottiefiles/react-lottie-player").then((module) => module.Player),
    { ssr: false }
);





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


    async function transcribeAudio(id: string) {
        setStatus('transcrevendo')
        try {

            await api.post(`/audio/transcription/${id}`)


        } catch (e) {
            console.log(e)
        }
    }
    async function handleUploadVideoLink(event: FormEvent<HTMLFormElement>) {

        event?.preventDefault()
        setResultText("");

        const videoLink = videLinkRef.current?.value
        const videoID = videoLink!.split('/watch?v=')


        if (!videoID[0].includes('youtube')) {
            return window.alert('Ops! Por favor, insira um link do video do YOUTUBE')
        }

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

                            status == 'Ocioso' ? 'Executar' :


                                (status == 'success' ?
                                    <DynamicPlayer
                                    loop
                                    autoplay
                                    src={'https://lottie.host/2c5b46e3-e7b0-4bb2-a52d-5d2b3fb2ded5/TcSraWsBYw.json'}
                                    style={{ height: '30px', width: '30px' }}
                                    />
                                    : <DynamicPlayer
                                        loop
                                        autoplay
                                        src={'https://lottie.host/1b5745fa-b7cf-4d14-af49-8fa4c66f9b29/7afa8IJggh.json'}
                                        style={{ height: '20px', width: '25px' }}
                                    />
                                )





                        }

                    </Button>

                </InputVideoLink>



                <GeneratedAIForm onSubmit={completionAI} visibility={promptForm}>
                    <Selector />
                    <Button type="submit">
                        Gerar
                    </Button>
                </GeneratedAIForm>



                <ResultContainer>


                    <Textarea
                        placeholder="Resultado"
                        readOnly
                        value={resultText}

                    />

                </ResultContainer>

            </HomeContainer>
        </>
    )
}