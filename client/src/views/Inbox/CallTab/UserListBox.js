import { UserOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import Avatar from "antd/es/avatar/avatar"
import Card from "antd/es/card/Card"

const UserListBox = ({ userList = [] }) => {
  return (
    <div>
      {userList.map(user => {
        return (
          <div class="card" style={{ minHeight: 400 }}>
            <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              style={{
                backgroundColor: "#116",
                // position: "absolute",
                // opacity: "-1",
              }}
              src={user.profileUrl}
              icon={!user?.name && <UserOutlined />}
            />
            <h1 class="card-title">
              {user?.name}
            </h1>
            Ready to join?
            <Button type="primary" shape="round">
              Join call
            </Button>
          </div>
        )
      })}
    </div>
  )
}
export default UserListBox