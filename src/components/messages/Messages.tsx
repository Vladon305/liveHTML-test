import React, { FC } from 'react'
import { IMessage } from '../../types/types'
import Message from '../message/Message'
import styles from './Messages.module.scss'

type Props = {
  messages: IMessage[]
}

const Messages: FC<Props> = ({ messages }) => {
  return (
    <div className={styles.messages}>
      {messages?.map((message) => (
        <Message key={message.id} message={message.message} />
      ))}
    </div>
  )
}

export default Messages
