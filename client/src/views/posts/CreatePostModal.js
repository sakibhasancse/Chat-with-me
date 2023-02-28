import { Button, Modal } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { useRef, useState } from 'react';
import { createPosts } from '../../data/posts';
import TagsInputBox from './TagsInput';

const CreatePostModal = ({ open, setOpen, setPosts }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    title: 'test post',
    description: 'description',
    tags: ['software', 'programming', 'web development', 'language', 'javascript'],
  })

  console.log({ values })
  const handleChange = (value) => {
    setValues(oldValues => ({ ...oldValues, [value.target.name]: value.target.value }))
  }

  const handleTags = (value) => {
    console.log({ value })
    setValues(oldValues => ({ ...oldValues, tags: value }))
  }
  const handleClear = () => {
    setValues(oldValues => ({ ...oldValues, tags: [] }))
  }
  const inputRef = useRef(null);

  const handleOk = async () => {
    setLoading(true);
    const response = await createPosts(values)
    if (response) {
      console.log({ response })
      setPosts(oldPosts => [response, ...oldPosts])
    }
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title="Write contents..."
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Add Post
          </Button>
        ]}
      >
        <TagsInputBox tags={values.tags} setTags={handleTags} handleClear={handleClear} inputRef={inputRef} />
        <br />
        <br />
        <Input placeholder="Post title" name="title" onChange={handleChange} />
        <br />
        <br />
        <TextArea rows={4} placeholder="Please write your post" name="description" maxLength={600} onChange={handleChange} />
      </Modal>
    </>
  )
}
export default CreatePostModal