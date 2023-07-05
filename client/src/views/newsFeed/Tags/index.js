import { Divider, Space, Tag } from 'antd';

const Tags = ({ tags, loading }) => {

  return (
    <>
      <Divider orientation="left">Tags</Divider>
      <Space size={[0, 8]} wrap>
        {
          tags.map(tag => (
            <Tag color="success">{tag.name}</Tag>
          ))
        }
      </Space>
    </>
  )
}
export default Tags