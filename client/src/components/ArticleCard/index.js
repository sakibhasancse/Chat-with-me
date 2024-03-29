import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Tag } from "antd";
import Link from "antd/es/typography/Link";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Button, Popover } from "antd";
import InboxContext from "../../context/Inbox/inboxContext";
import { getUser } from "../../context/AuthContext";
import moment from 'moment'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ArticleCard = ({ posts = [], loading = false }) => {
  const { handleMessage } = useContext(InboxContext);
  const navigate = useNavigate();

  return (
    <List
      loading={loading}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={posts}
      footer={<div></div>}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={
              <Popover
                content={
                  <div>
                    <Avatar
                      style={{
                        verticalAlign: "middle",
                      }}
                      onClick={() => navigate(`/user/${item?.creator?.userId}`)}
                      src={
                        item.avatar ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                      }
                    />
                    {item.creator?.name}
                    <br />
                    <Button
                      size="small"
                      style={{
                        verticalAlign: "middle",
                      }}
                      onClick={() => navigate(`/user/${item?.creator?.userId}`)}
                    >
                      View profile
                    </Button>

                    {
                      item?.creator?.userId !== getUser()?.userId && (
                        <Button
                          size="small"
                          style={{
                            margin: "0 16px",
                            verticalAlign: "middle",
                          }}
                          onClick={() => handleMessage(item.creator?.userId)}
                        >
                          Send message
                        </Button>
                      )
                    }
                  </div>
                }
              >
                <Avatar
                  onClick={() => navigate(`/user/${item?.creator?.userId}`)}
                  src={
                    item.avatar ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              </Popover>
            }
            title={
              <div>
                <Link onClick={() => navigate(`/user/${item.creator.userId}`)}>
                  {" "}
                  {item.creator?.name}
                </Link>
                <br />
                <small style={{ fontWeight: 300 }}>{moment(item.createdAt).fromNow()}</small>
                <p style={{ cursor: "pointer" }} >{item.title.length > 107 ? `${item.title.substring(0, 107)}...` : item.title}</p>
              </div>
            }
            description={
              <p
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/posts/${item.slug}`)}
              >
                {item.description.length > 200 ? `${item.description.substring(0, 200)}...` : item.description}
                <Space size={[0, 8]} wrap>
                  {item.tags && item.tags.map((item, key) => (
                    <Tag color="success">{item}</Tag>
                  ))}
                </Space>
              </p>
            }
          />
          {/* {item.content} */}
          {/* <Space size={[0, 8]} wrap>
            {item.tags && item.tags.map((item, key) => (
              <Tag color="success">{item}</Tag>
            ))}
          </Space> */}
        </List.Item>
      )}
    />
  );
};

export default ArticleCard;
