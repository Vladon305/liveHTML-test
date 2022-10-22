import React, { useState } from 'react'
import Plus from '../../assets/Plus.svg'
import styles from './AddChannel.module.scss'

type Props = {
  dialogName: string
  setDialogName: React.Dispatch<React.SetStateAction<string>>
  addNewDialog: () => Promise<void>
}

const AddChannel = ({ dialogName, setDialogName, addNewDialog }: Props) => {
  const [addMode, setAddMode] = useState(false)

  return (
    <div>
      <div className={styles.title}>
        <div>Channels</div>
        <div
          onClick={async () => {
            if (addMode) {
              setAddMode(false)
              if (dialogName.length !== 0) {
                addNewDialog()
              }
              setDialogName('')
            } else setAddMode(true)
          }}
        >
          <img src={Plus} alt="Add" />
        </div>
      </div>
      <div>
        {addMode && (
          <input className={styles.input} value={dialogName} onChange={(e) => setDialogName(e.currentTarget.value)} />
        )}
      </div>
    </div>
  )
}

export default AddChannel
