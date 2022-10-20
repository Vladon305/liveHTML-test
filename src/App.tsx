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
  // const [messages, setMessages] = useState([] as IMessage[])
  const { data: dialogs, mutate: mutateDialogs } = useSWR<IDialog[]>('/dialog', api.get)

  const [currentDialog, setCurrentDialog] = useState({} as IDialog)

  // const { data: messages, mutate: mutateMessages } = useSWR<IMessage[]>(`/dialog/${currentDialog.id}/message`, api.get)

  const allMessages: IMessage[] = currentDialog.messages

  const addNewDialog = async () => {
    const dialog: IDialog = await api.post(`dialog/${user.id}`, { name: newDialogName })
    if (dialogs) mutateDialogs([...dialogs, dialog], { rollbackOnError: true })
    if (dialog) setCurrentDialog(dialog)
  }

  const addNewMessage = async () => {
    const message: IMessage = await api.post(`/dialog/${currentDialog.id}/message`, { name: newDialogName })
    setCurrentDialog({ ...currentDialog, messages: [...currentDialog?.messages, message] })
    // if (messages) mutateMessages([...messages, message], { rollbackOnError: true })
    setNewMessage('')
  }

  useEffect(() => {
    ;(async () => {
      const cookUser = await cookieStore.get('user')
      if (cookUser && JSON.parse(cookUser.value)) {
        setUser(JSON.parse(cookUser.value))
      } else {
        const user = {
          name: generateName(),
        }
        const createdUser = await api.post('user', user)
        cookieStore.set('user', JSON.stringify(createdUser))
      }
      if (dialogs) setCurrentDialog(dialogs[0])
    })()
  }, [])

  useEffect(() => {
    Pusher.logToConsole = true

    const pusher = new Pusher('e9050992da8683055e84', {
      cluster: 'eu',
    })

    const channel = pusher.subscribe('chat')
    channel.bind('message', async (data: IMessage) => {
      allMessages.push(data)
      setCurrentDialog({ ...currentDialog, messages: [...currentDialog.messages, data] })
      // mutateMessages([...allMessages])
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
    />
  )
}

export default App
