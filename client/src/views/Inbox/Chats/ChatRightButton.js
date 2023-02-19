import { AudioMutedOutlined, CheckOutlined, DownOutlined, SmileOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Mark as unread
      </a>
    ),
    icon: <CheckOutlined />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Mute notification
      </a>
    ),
    icon: <AudioMutedOutlined />,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        View profile
      </a>
    ),
    icon: <SmileOutlined />,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Delete chat
      </a>
    ),
    icon: <UserDeleteOutlined />,
  },
];

const ChatRightButton = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Options
        {/* <DownOutlined /> */}
      </Space>
    </a>
  </Dropdown>
);
export default ChatRightButton;