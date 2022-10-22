import React, { FC } from 'react'
import { IMessage } from '../../types/types'
import Message from '../message/Message'
import styles from './Messages.module.scss'

type Props = {
  userId: string
  messages: IMessage[] | undefined
  deleteMessage: (messageId: string) => void
}

const Messages: FC<Props> = ({ userId, messages, deleteMessage }) => {
  return (
    <div className={styles.messages}>
      {messages?.map((message) => (
        <Message
          key={message.id}
          message={message.message}
          messageId={message.id}
          image={message?.user?.ava}
          isMyMessage={userId === message?.user?.id ? true : false}
          deleteMessage={deleteMessage}
        />
      ))}
    </div>
  )
}

export default Messages
