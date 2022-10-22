import React, { FC } from 'react'
import { IDialog } from '../../types/types'
import styles from './Channel.module.scss'
import Notification from '../../assets/Notification.svg'

type Props = {
  dialog: IDialog
  setCurrentDialog: React.Dispatch<React.SetStateAction<IDialog>>
  isNotification: boolean
}

const Channels: FC<Props> = ({ setCurrentDialog, dialog, isNotification }) => {
  return (
    <div
      className={styles.channel}
      onClick={() => {
        setCurrentDialog({ ...dialog, notification: false })
      }}
    >
      {isNotification && (
        <div className={styles.notification}>
          <img src={Notification} alt="Notification" width={30} />
        </div>
      )}
      {dialog.name}
    </div>
  )
}

export default Channels
