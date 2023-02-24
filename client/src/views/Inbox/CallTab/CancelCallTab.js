import { UserOutlined } from "@ant-design/icons"
import Avatar from "antd/es/avatar/avatar"

const CancelCallTab = ({ user = {} }) => {
  return (
    <div class="card" style={{ minHeight: 550 }}>
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
      Call Canceled
    </div >
  )
}
export default CancelCallTab