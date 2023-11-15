import { globalCss, styled } from "./app";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',

    },
    body: {
        fontFamily: "Roboto, sans-serif",
        backgroundColor: '$gray-900',
        color: '$gray-100',
        '-webkit-box-smoothing': 'antialiased',


    }
})

export const Text = styled('h1', {
    fontSize: '2rem',
    fontWeight: '500'
})

export const Label = styled('label', {
    fontSize: '0.9rem',
    color: '$gray-300'
})

export const Input = styled('input', {
    display: 'flex',
    padding: '12px',
    width: '100%',
    background: '$gray-700',
    border: '1px solid',
    borderColor: '$gray-500',
    borderRadius: '4px',
    color: '$gray-100',
    '&:disabled':{
        opacity: '.5',
        pointerEvents: 'none',
        background: '$gray-400'    
    
    },
    '&:focus':{
        outline: 'none',
        borderColor: '$gray-300',
    }
    
})



export const Button = styled('button', {

    variants: {
        theme: {
            primary: {
                background: '$primary-200',
                '&:hover': {
                    background: '$primary-400',
                    color: '$gray-100'
                }
            },

            success: {
                background: '$success',
            },
            secondary: {
                background: '$gray-900',
                border: '1px solid',
                borderColor: '$gray-100',
                color: '$gray-100',
                '&:hover': {
                    background: '$gray-600'
                }
            }
        }

    },
    defaultVariants: {
        theme: 'primary'
    },
    color: '$gray-800',
    cursor: 'pointer',
    padding: '0.75rem 2.875rem',
    border: 'none',
    fontWeight: '600',
    borderRadius: '5px',

    fontSize: '1rem',
    transition: '0.3s',
    '&:hover': {
        transition: '0.3s',
    },
    '&:disabled':{
        opacity: '.5',
        pointerEvents: 'none',
        background: '$gray-400',
        cursor: 'wait'  
    
    }


})

export const Textarea = styled('textarea', {
    resize: 'none',
    background: '$gray-800',
    border: '1px solid',
    borderColor: '$primary-400',
    borderRadius: '5px',
    padding: '1.25rem',
    lineHeight: '1.625',
    color: '$gray-100',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '1.35rem',
    cursor: 'text',
    minHeight: '32rem',
    width: '100%',
    '&:focus':{
        outline: 'none',
     
    }
  
})

export const Separator = styled('hr', {

    variants: {
        orientation: {
            horizontal: {
                width: '100%',
                borderColor: '$gray-500',
            },
            vertical: {
                height: '100%',
                borderColor: '$gray-500',
                borderLeft: '1px solid'
            }
        }
    },
    defaultVariants: {
        orientation: 'horizontal'
    },

  
})

