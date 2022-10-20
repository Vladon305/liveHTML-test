import React, { useState } from 'react'
import Plus from '../../assets/Plus.svg'

type Props = {
  dialogName: string
  setDialogName: React.Dispatch<React.SetStateAction<string>>
  addNewDialog: () => Promise<void>
}

const AddChannel = ({ dialogName, setDialogName, addNewDialog }: Props) => {
  const [addMode, setAddMode] = useState(false)

  return (
    <div>
      <div>Channels</div>
      <div>
        {addMode && <input value={dialogName} onChange={(e) => setDialogName(e.currentTarget.value)} />}
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
    </div>
  )
}

export default AddChannel
