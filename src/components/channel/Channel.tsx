import React, { FC } from 'react'
import { IDialog } from '../../types/types'
import styles from './Channel.module.scss'

type Props = {
  dialog: IDialog
  setCurrentDialog: React.Dispatch<React.SetStateAction<IDialog>>
}

const Channels: FC<Props> = ({ setCurrentDialog, dialog }) => {
  return (
    <div className={styles.channel} onClick={() => setCurrentDialog(dialog)}>
      {dialog.name}
    </div>
  )
}

export default Channels
