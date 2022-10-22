import React, { FC } from 'react'
import { imageUrlBuilder } from '../../utils/imageUrlBuilder'
import styles from './Message.module.scss'
import Delete from '../../assets/Delete.svg'

type Props = {
  isMyMessage: boolean
  message: string
  image: string
  messageId: string
  deleteMessage: (messageId: string) => void
}

const Message: FC<Props> = ({ message, messageId, image, isMyMessage, deleteMessage }) => {
  return (
    <>
      {isMyMessage ? (
        <div className={styles.my_message}>
          <div className={styles.text}>{message}</div>
          <div className={styles.image}>
            <img src={imageUrlBuilder(image)} alt="User" />
          </div>
          <div onClick={() => deleteMessage(messageId)}>
            <img src={Delete} alt="delete" />
          </div>
        </div>
      ) : (
        <div className={styles.message}>
          <div className={styles.image}>
            <img src={imageUrlBuilder(image)} alt="User" />
          </div>
          <div className={styles.text}>{message}</div>
        </div>
      )}
    </>
  )
}

export default Message
