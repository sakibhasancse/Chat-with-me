import { Avatar, Button, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { pick, isEqual } from 'lodash'

import Form from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { getMyProfile, updateUserProfile } from '../../data/users';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

const MyProfile = () => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);

  const [profile, setProfile] = useState({})
  const [oldProfileData, setOldProfileData] = useState({})
  const [loading, setLoading] = useState(true)

  const myProfileApiCall = () => {
    getMyProfile().then(response => {
      console.log({ response })
      setProfile(response || [])
      setOldProfileData(response || [])
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }

  useEffect(() => {
    myProfileApiCall()
  }, [])

  const onReset = () => {
    formRef.current?.setFieldsValue(oldProfileData);
  };

  const formRef = React.useRef(null);

  const onFinish = async (value) => {
    console.log(profile);
    const updatedProfileData = pick(profile, ['name', 'description', 'phoneNumber', 'designation', 'facebook', 'instragram', 'tweeter', 'website'])
    console.log(updatedProfileData)
    const response = await updateUserProfile(updatedProfileData)
    console.log({ response, updatedProfileData })
  };

  const buttonDisabled = isEqual(profile, oldProfileData)

  return (
    <div>
      {loading ? (<h2>Loading</h2>) : (
        <Row justify="space-around" align="middle" >
          <Col span={24} xs={20} xl={14}>
            <h4>My profile</h4>
            <Form
              // form={form}
              onFinish={onFinish}
              ref={formRef}
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
                      name="name"
                      placeholder="Enter your name"
                      value={profile?.name}
                      onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, name: e.target.value })) }}
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
                      value={profile?.designation}
                      onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, designation: e.target.value })) }}
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
                  disabled
                  value={profile?.email}
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, email: e.target.value })) }}
                />
              </Form.Item>
              <Form.Item
                label="phoneNumber"
                tooltip={{
                  title: 'Enter your phone',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  placeholder="Enter your phone"
                  value={profile?.phoneNumber}
                  type="number"
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, phoneNumber: e.target.value })) }}
                />
              </Form.Item>

              <p>Sociale links</p>

              <Form.Item
                label="Website"
                tooltip={{
                  title: 'Enter your website',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  placeholder="Enter your website"
                  value={profile?.website}
                  type="text"
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, website: e.target.value })) }}
                />
              </Form.Item>

              <Form.Item
                label="Facebook"
                tooltip={{
                  title: 'Enter your facebook',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  placeholder="Enter your facebook"
                  value={profile?.facebook}
                  type="text"
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, facebook: e.target.value })) }}
                />
              </Form.Item>
              <Form.Item
                label="Instragram"
                tooltip={{
                  title: 'Enter your instragram',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  placeholder="Enter your instragram"
                  value={profile?.instragram}
                  type="text"
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, instragram: e.target.value })) }}
                />
              </Form.Item>
              <Form.Item
                label="tweeter"
                tooltip={{
                  title: 'Enter your tweeter',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  placeholder="Enter your tweeter"
                  value={profile?.tweeter}
                  type="text"
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, tweeter: e.target.value })) }}
                />
              </Form.Item>


              <Form.Item
                label="Description"
                tooltip={{
                  title: 'Description',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <TextArea rows={4} placeholder="Together with my team, i create winners in the digital transformation .... " maxLength={1000}
                  value={profile?.description}
                  onChange={(e) => { setProfile((oldValue) => ({ ...oldValue, description: e.target.value })) }}
                />
              </Form.Item>
              <Form.Item >
                <Button type="primary" disabled={buttonDisabled} htmlType="submit">Update</Button>
              </Form.Item>
              {/* <Button htmlType="button" onClick={onReset}>
              Reset
             </Button> */}
            </Form>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default MyProfile