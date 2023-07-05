
import { Avatar, Button, Row, Col, Tooltip, Space, List, Table, Skeleton } from 'antd';
import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

import Input from 'antd/es/input/Input';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

import { useNavigate, useParams } from 'react-router';

import { createChat } from '../../data/chat'
import Card from 'antd/es/card/Card';
import Link from 'antd/es/typography/Link';
import { getUserProfile } from '../../data/users';
import { getAllPosts, getUserPosts } from '../../data/posts';

const UserProfile = () => {
  const navigate = useNavigate()
  const { username } = useParams()

  const initiateMessage = async () => {
    const conversation = await createChat(username)
    console.log({ conversation, username })
    // if (conversation?._id) navigate.push(`/inbox/${conversation._id}`)
  }


  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const [userProfileData, setUserProfileData] = useState([])

  const myProfileApiCall = () => {
    getUserProfile(username).then(response => {
      console.log({ response })
      setProfile(response || [])
      setUserProfileData([
        {
          name: "Name",
          value: response.name
        },
        {
          name: "Email",
          value: response.email
        },
        {
          name: "Phone",
          value: response.phoneNumber
        },
        {
          name: "Address",
          value: response.address
        },
      ])
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }

  useEffect(() => {
    myProfileApiCall()
  }, [])


  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);

  const columns = [
    {
      title: 'Social Media',
      dataIndex: 'name'
    },
    {
      title: 'Links',
      dataIndex: 'url',
      render: (text) => <a href={text}>{text}</a>
    }
  ];

  const userProfileColumns = [
    {
      title: 'Keys',
      dataIndex: 'name'
    },
    {
      title: 'value',
      dataIndex: 'value'
    }
  ]
  const limit = 3;
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [skip, setSkip] = useState(0)
  const [paging, setPaging] = useState({ currentPage: 1, totalDocuments: 4, totalPages: 2 })

  useEffect(() => {
    getUserPosts(`/${username}?skip=${skip}&limit=${limit}`)
      .then((res) => {
        console.log(res)
        setInitLoading(false);
        setData(res.data);
        setList(res.data);
        setPaging(res.paging)
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setSkip((oldSkip) => oldSkip + limit)
    setList(
      data.concat(
        [...new Array(limit)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );

    getUserPosts(`/${username}?skip=${skip + limit}&limit=${limit}`)
      .then((res) => {
        console.log({ res })
        const newData = data.concat(res.data);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };


  const loadMore =
    !initLoading && !loading && data.length !== paging?.totalDocuments ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <div>
      <Row justify="space-around" align="middle" >
        <Col span={24} xs={20} xl={20}>
          <Row >
            <Col xl={10} xs={24} md={10} xl={10} align="middle">
              <Card bordered={false}>
                <Avatar
                  style={{
                    backgroundColor: color,
                    verticalAlign: 'middle'
                  }}
                  size={{
                    xs: 90,
                    sm: 120,
                    md: 120,
                    lg: 140,
                    xl: 120,
                    xxl: 160,
                  }}
                  gap={gap}
                >
                  {user}
                </Avatar>
                <h3>{profile.name}</h3>
                <p>{profile.designation}</p>
                <Space direction="vertical">
                  <Space wrap>
                    <Button type="primary" shape="round" size="large">Follow</Button>
                    <Button shape="round" size="large" onClick={initiateMessage}>Message</Button>
                  </Space>
                </Space>
              </Card>
              <Card bordered={false}>

                <Table
                  pagination={{
                    position: ["none", "none"],
                  }}
                  columns={columns}
                  dataSource={profile.links || []}
                />
              </Card>


            </Col>
            <Col xl={14} xs={24} md={14} xl={14}>
              <Card bordered={false}>

                <Table
                  pagination={{
                    position: ["none", "none"],
                  }}
                  columns={userProfileColumns}
                  dataSource={userProfileData}
                />
              </Card>
              {profile.description && (<Card >
                <p style={{ minHeight: "223px", maxHeight: "223px" }}>
                  {profile.description.length > 500 ? `${profile.description.substring(0, 918)} ...` : profile.description}
                </p> </Card>)
              }

            </Col>
          </Row>
          <h3>Posts</h3>
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[<a key="list-loadmore-more">view</a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar || 'https://www.w3schools.com/w3images/avatar2.png'} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                  {/* <div>{item.description}</div> */}
                </Skeleton>
              </List.Item>
            )} />
          <br />
        </Col>
      </Row>
    </div >
  )
}
export default UserProfile