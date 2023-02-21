
import { Avatar, Divider, List, Skeleton } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { size } from 'lodash'
import moment from 'moment'

import InfiniteScroll from 'react-infinite-scroll-component';
import InboxContext from '../../../context/Inbox/inboxContext';
import { getChatList } from '../../../data/chat';
import ChatRightButton from './ChatRightButton';

const Chats = () => {
  const { setMessages } = useContext(InboxContext)
  const [loading, setLoading] = useState(false);

  const { chatList = [], setChatList } = useContext(InboxContext);

  const navigator = useNavigate()

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);

    const response = await getChatList()
    if (size(response)) setChatList((oldChatList) => [...oldChatList, ...response]);
    setLoading(false);
  };

  const handleMessage = (values) => {
    setMessages(values?.messages || [])
    console.log({ values })
    navigator(`/inbox/${values._id}`)
  }
  console.log({ chatList })
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
        // next={loadMoreData}
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
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.participantOtherUsers[0]?.profileUrl} />}
                title={<div onClick={() => handleMessage(item)}>{item.participantOtherUsers[0]?.name}</div>}
                description={<div>
                  <p>{item.lastMessage}</p>
                  <h4>{moment(item.lastMessageAt).fromNow()}</h4>
                </div>}
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