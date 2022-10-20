import React, { FC } from 'react'
import { IDialog } from '../../types/types'

type Props = {
  dialog: IDialog
  setCurrentDialog: React.Dispatch<React.SetStateAction<IDialog>>
}

const Channels: FC<Props> = ({ setCurrentDialog, dialog }) => {
  return <div onClick={() => setCurrentDialog(dialog)}>{dialog.name}</div>
}

export default Channels
