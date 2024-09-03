import React from 'react'
import { styled } from 'styled-components'

interface MessageProps {
    message: string
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <>
            <MessageBlock>{message}</MessageBlock>
        </>
    )
}

export default Message

const MessageBlock = styled.div``
