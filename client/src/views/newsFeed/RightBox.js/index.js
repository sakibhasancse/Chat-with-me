import {
  PlusOutlined,
} from '@ant-design/icons';

import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { getUser } from '../../../context/AuthContext'

const RightBox = ({ open, setOpen }) => {
  const navigator = useNavigate()

  const handleWriteButton = () => {
    const isAuthenticatedUser = getUser()
    if (isAuthenticatedUser) setOpen(true)
    else navigator('/login')
  }

  return (
    <>
      <Button type="dashed" onClick={() => handleWriteButton()} block icon={<PlusOutlined />}>
        Write something
     </Button>
    </>
  )
}
export default RightBox