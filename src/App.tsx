import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { cookieStore } from 'cookie-store'
import { generateName } from './utils/generateName'
import { api } from './api/api'
import Layout from './components/layout/Layout'
import { IDialog, IMessage, IUser } from './types/types'
import useSWR from 'swr'

const App = () => {
  const [user, setUser] = useState({} as IUser)
  const [newDialogName, setNewDialogName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const { data: dialogs, mutate: mutateDialogs } = useSWR<IDialog[]>('/dialog', api.get)

  const [currentDialog, setCurrentDialog] = useState(null as unknown as IDialog)

  const { data: messages, mutate: mutateMessages } = useSWR<IMessage[]>(
    currentDialog?.id ? `/dialog/${currentDialog?.id}/message` : null,
    api.get
  )

  const addNewDialog = async () => {
    const dialog: IDialog = await api.post(`dialog/${user.id}`, { name: newDialogName })
    if (dialogs) mutateDialogs([...dialogs, dialog], { rollbackOnError: true })
    if (dialog) setCurrentDialog(dialog)
  }

  const addNewMessage = async () => {
    if (newMessage.length !== 0) {
      const message: IMessage = await api.post(`/dialog/${currentDialog.id}/message`, {
        message: newMessage,
        userId: user.id,
      })
      setCurrentDialog({ ...currentDialog, messages: [...currentDialog?.messages, message] })
      if (messages) mutateMessages([...messages, message], { rollbackOnError: true })
    }
    setNewMessage('')
  }

  const deleteMessage = (messageId: string) => {
    api.delete(`/dialog/${currentDialog.id}/message/${messageId}`)
    if (messages)
      mutateMessages(
        messages.filter((message) => message.id !== messageId),
        { rollbackOnError: true, revalidate: false }
      )
  }

  useEffect(() => {
    ;(async () => {
      const cookUser = await cookieStore.get('user')
      if (cookUser && cookUser.value) {
        setUser(JSON.parse(cookUser.value))
      } else {
        const user = {
          name: generateName(),
        }
        const createdUser = await api.post('user', user)
        cookieStore.set('user', JSON.stringify(createdUser))
        setUser(createdUser)
      }
    })()
  }, [])

  useEffect(() => {
    Pusher.logToConsole = true

    const pusher = new Pusher('e9050992da8683055e84', {
      cluster: 'eu',
    })

    const channel = pusher.subscribe('chat')
    channel.bind('message', async (data: IMessage) => {
      if (messages) mutateMessages([...messages, data])
      if (dialogs)
        mutateDialogs(
          dialogs?.map((dialog) => {
            if (dialog.id === data.dialog?.id) {
              return {
                ...dialog,
                notification: true,
              }
            } else {
              return dialog
            }
          }),
          { revalidate: false }
        )
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Layout
      user={user}
      dialogs={dialogs}
      currentDialog={currentDialog}
      setCurrentDialog={setCurrentDialog}
      newDialogName={newDialogName}
      setNewDialogName={setNewDialogName}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      addNewDialog={addNewDialog}
      addNewMessage={addNewMessage}
      messages={messages}
      deleteMessage={deleteMessage}
    />
  )
}

export default App
