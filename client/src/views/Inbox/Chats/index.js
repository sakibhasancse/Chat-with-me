
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
  const { setMessages, setOtherUsers } = useContext(InboxContext)
  const [loading, setLoading] = useState(false);

  const { chatList = [], setChatList } = useContext(InboxContext);
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [skip, setSkip] = useState(0)

  const navigator = useNavigate()

  const getChatListAndDocuments = async (currentSkip = 0) => {
    if (loading) return;
    setLoading(true);
    // `/chat?skip=${currentSkip || skip}&limit=10`
    const response = await getChatList()
    if (size(response)) {
      console.log({ response })
      setTotalDocuments(response.totalDocuments)
      setChatList((oldChatList) => [...oldChatList, ...response.chatList]);
    }
    setLoading(false);
  }

  const loadMoreData = async () => {
    console.log('calling')
    setSkip(oldSkip => oldSkip + 10)
    getChatListAndDocuments(skip + 10)
  };

  const handleMessage = (values) => {
    setMessages(values?.messages || [])
    navigator(`/inbox/${values._id}`)
  }


  useEffect(() => {
    console.log({ chatList })
    return () => getChatListAndDocuments();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: '800px',
        overflow: 'auto',
        // padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={totalDocuments}
        next={loadMoreData}
        hasMore={chatList.length < totalDocuments}
        loader={
          <Skeleton
            avatar
            paragraph={{ rows: 1 }}
            active
          />
        }
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
                  <h4>{moment(item.lastMessageAt || item.createdAt).fromNow()}</h4>
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