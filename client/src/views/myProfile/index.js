import { Avatar, Button, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Form from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

const MyProfile = () => {
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

  return (
    <div>
      <Row justify="space-around" align="middle" >
        <Col span={24} xs={20} xl={14}>
          <h4>My profile</h4>
          <Form
            // form={form}
            layout="vertical">
            <Row >
              <Col xs={8} xl={8} align="middle">
                <div style={{
                  paddingTop: "8px"
                }}>
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
                      xl: 152,
                      xxl: 160,
                    }}
                    gap={gap}
                  >
                    {user}
                  </Avatar>
                </div>
              </Col>
              <Col span={16} xs={16} xl={16}>
                <Form.Item
                  label="Disply name"
                  tooltip={{
                    title: 'Enter your name',
                    icon: <InfoCircleOutlined />,
                  }}>
                  <Input
                    placeholder="Enter your name"
                    value="Sakib Hasan"
                  />
                </Form.Item>


                <Form.Item
                  label="Job title"
                  tooltip={{
                    title: 'Enter your job title',
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input
                    placeholder="Enter your job title"
                    value="Full stuck developer"
                  />
                </Form.Item>
              </Col>
            </Row>


            <Form.Item
              label="Email"
              tooltip={{
                title: 'Enter your Email',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                placeholder="Enter your Email"
                value="sakib@gmail.com"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              tooltip={{
                title: 'Enter your phone',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                placeholder="Enter your phone"
                value="01763553147"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              tooltip={{
                title: 'Description',
                icon: <InfoCircleOutlined />,
              }}
            >
              <TextArea rows={4} placeholder="Together with my team, i create winners in the digital transformation .... " maxLength={1000} />

            </Form.Item>
            <Form.Item>
              <Button type="primary">Update</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default MyProfile