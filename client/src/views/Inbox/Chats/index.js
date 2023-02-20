
import { Avatar, Divider, List, Skeleton } from 'antd';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import InboxContext from '../../../context/Inbox/inboxContext';
import { getChatList } from '../../../data/chat';
import ChatRightButton from './ChatRightButton';

const Chats = ({ setMessages }) => {
  const [loading, setLoading] = useState(false);

  const { chatList = [], setChatList } = useContext(InboxContext);

  const navigator = useNavigate()

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);

    const response = await getChatList()
    if (response) setChatList((oldChatList) => [...oldChatList, ...response]);
    setLoading(false);
  };

  const handleMessage = (values) => {
    setMessages(values)
    console.log({ values })
    navigator('/inbox/sss')
  }

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={chatList.length}
        next={loadMoreData}
        hasMore={chatList.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={chatList}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture?.large} />}
                title={<div onClick={() => handleMessage(item)}>{item.name?.last}</div>}
                description={item.lastMessage}
              />
              <ChatRightButton />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}

export default Chats