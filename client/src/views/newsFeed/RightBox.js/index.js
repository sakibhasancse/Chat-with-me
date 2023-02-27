import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Divider, Space, Tag } from 'antd';

const RightBox = () => {
  const handleWriteButton = () => {

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