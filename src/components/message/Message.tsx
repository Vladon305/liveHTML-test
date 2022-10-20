import React, { FC } from 'react'

type Props = {
  message: string
}

const Message: FC<Props> = ({ message }) => {
  return <div>{message}</div>
}

export default Message
