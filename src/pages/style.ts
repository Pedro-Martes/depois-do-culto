import { styled } from "@/styles/app";

export const HomeContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '12px',

})

export const Header = styled('header', {
    display: 'flex',
    padding: '8px',
    justifyContent: 'space-between',
    width: '100%',
   


})

export const Poweredby = styled('div', {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '8px',
    

})


export const InputVideoLink = styled('form', {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    width: '100%',
    gap: '8px',
    


})

export const ResultContainer = styled('div', {
    display: 'flex',

    padding: '1rem',
    width: '100%',
    height: '100%',

    gap: '8px',



})

interface GeneratedAIFormProps {
    visibility: 'visible' | 'invisible';
}

export const GeneratedAIForm = styled('form', {
    variants: {
        visibility: {
            visible: {
                display: 'flex'
            },
            invisible: {
                display: 'none'
            },
            defaultVariants: {
                visibility: 'invisible' 
            }
        }
    },
     justifyContent: 'center',
     gap: '8px',

})


