export interface IUser {
  id: string
  name: string
  ava: string
  dialogs: IDialog[]
}

export interface IDialog {
  id: string
  name: string
  users: IUser[]
  messages: IMessage[]
}

export interface IMessage {
  id: string
  message: string
}
