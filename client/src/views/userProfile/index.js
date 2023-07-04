
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

const UserProfile = () => {
  const navigate = useNavigate()
  const { username } = useParams()

  const initiateMessage = async () => {
    const conversation = await createChat('63d5506d67a2310bda2645ca')
    console.log({ conversation, username })
    // if (conversation?._id) navigate.push(`/inbox/${conversation._id}`)
  }
  const [userData, setUserData]= useState([
    'Name : Sakib Hasan',
    'Email : sakib@gmail.com',
    'Phone : sakib@gmail.com',
    'Address : sakib@gmail.com',
    'Mobile : sakib@gmail.com'
  ])
  const [socielInfo, setSocielInfo] = useState( [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ])

  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);

  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  };

  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };
  const columns = [
    {
      title: 'Social Media',
      dataIndex: 'name'
    },
    {
      title: 'Links',
      dataIndex: 'link',
      render: (text) => <a href={text}>{text}</a>
    }
  ];

  const socialData = [
    {
      key: '1',
      name: 'Facebook',
      link: 'sakibhasancse',
    },
    {
      key: '2',
      name: 'Instragram',
      link: 'sakibhasancse',
    },
    {
      key: '3',
      name: 'Tweeter',
      link: 'sakibhasancse',
    },
    {
      key: '4',
      name: 'Website',
      link: 'sakibhasancse',
    },
  ];

  const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
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
    !initLoading && !loading ? (
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
    <did>
      User profile {username}
      <div style={{ padding: "50px" }}>
        <Button onClick={initiateMessage}>Send messages</Button>
      </div>
      <div>
        <Row justify="space-around" align="middle" >
          <Col span={24} xs={20} xl={20}>
            <Row >
              <Col xl={10} xs={24} md={10}  xl={10} align="middle">
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
                  <h3>Sakib Hasan</h3>
                  <p>Full stuck developer</p>
                  <Space direction="vertical">
                    <Space wrap>
                      <Button type="primary" shape="round" size="large">Follow</Button>
                      <Button shape="round" size="large">Message</Button>
                    </Space>
                  </Space>
                </Card>
                <Card bordered={false}>
                {/* <List
                  itemLayout="horizontal"
                  dataSource={socielInfo}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                  )}
                /> */}

                <Table
                  pagination={{
                    position: ["none", "none"],
                  }}
                    columns={columns}
                    dataSource={socialData}
                  />
                </Card>

                
              </Col>
              <Col xl={14} xs={24} md={14} xl={14}>
                <Card bordered={false}>
                <List
                  size="small"
                  dataSource={userData}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </Card>
                <Card >
              <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque ullam consequatur voluptates tempora, id sed iste, nam rem officiis neque laboriosam laudantium dolorem nostrum sit laborum cumque quia consequuntur nihil.
                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab beatae, fugiat voluptate, odit facilis modi quidem recusandae alias laboriosam qui eos, tempore sequi eligendi quia! Minus quod ratione provident ipsum quis dolorum, asperiores quidem fugiat quos facilis iure beatae, cum hic, itaque repellat possimus laboriosam velit vitae. Beatae eligendi at qui atque cumque, reprehenderit iure inventore, numquam modi suscipit minus.
                  
              </p> </Card>
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
                  actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name?.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>content</div>
                  </Skeleton>
                </List.Item>
              )}/>
              <br/>
          </Col>
        </Row>
      </div>

    </did >

  )
}
export default UserProfile