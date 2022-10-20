import React, { FC } from 'react'
import { IDialog, IUser } from '../../types/types'
import AddChannel from '../addChannel/AddChannel'
import Channel from '../channel/Channel'
import Messages from '../messages/Messages'
import styles from './Layout.module.scss'

type Props = {
  user: IUser
  dialogs: IDialog[] | undefined
  currentDialog: IDialog
  setCurrentDialog: React.Dispatch<React.SetStateAction<IDialog>>
  newDialogName: string
  setNewDialogName: React.Dispatch<React.SetStateAction<string>>
  newMessage: string
  setNewMessage: React.Dispatch<React.SetStateAction<string>>
  addNewDialog: () => Promise<void>
  addNewMessage: () => Promise<void>
}

const Layout: FC<Props> = ({
  user,
  dialogs,
  currentDialog,
  setCurrentDialog,
  newDialogName,
  setNewDialogName,
  newMessage,
  setNewMessage,
  addNewDialog,
  addNewMessage,
}) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.name}>
          Your name is <p className="text-lg font-bold">{user.name}</p>
        </div>
      </header>
      <div className={styles.content}>
        <section className={styles.channels}>
          <AddChannel dialogName={newDialogName} setDialogName={setNewDialogName} addNewDialog={addNewDialog} />
          {dialogs?.map((dialog) => (
            <Channel key={dialog.id} dialog={dialog} setCurrentDialog={setCurrentDialog} />
          ))}
        </section>
        <section className={styles.dialog}>
          <div className={styles.messages}>
            <Messages messages={currentDialog.messages} />
          </div>
          <div className={styles.form}>
            <input className={styles.input} value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)} />
            <button className={styles.button} onClick={() => addNewMessage()}>
              send
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Layout
