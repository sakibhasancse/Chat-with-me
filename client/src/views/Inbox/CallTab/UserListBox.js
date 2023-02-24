import { UserOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import Avatar from "antd/es/avatar/avatar"
import Card from "antd/es/card/Card"

const UserListBox = ({ userList = [], callUser, calling = false, cancelCall, isCallAcceptedTab = false }) => {
  return (
    <div>
      {userList.map(user => {
        return (
          <div class="card" style={{ minHeight: 400 }}>
            {callAccepted && !callEnded && userVideo && (
              <div className="card2" style={{ textAlign: "center" }} id="video2">
                <div style={{ height: "2rem" }}>
                  <h3>{userVdoStatus && (call.name || userName)}</h3>
                </div>

                <div className="video-avatar-container">
                  <video
                    playsInline
                    ref={userVideo}
                    onClick={fullScreen}
                    autoPlay
                    className="video-active"
                    style={{
                      opacity: `${userVdoStatus ? "1" : "0"}`,
                    }}
                  />

                  <Avatar
                    style={{
                      backgroundColor: "#116",
                      position: "absolute",
                      opacity: `${userVdoStatus ? "-1" : "2"}`,
                    }}
                    size={98}
                    icon={!(userName || call.name) && <UserOutlined />}
                  >
                    {userName || call.name}
                  </Avatar>
                  {!userMicStatus && (
                    <i
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        padding: "0.3rem",
                        backgroundColor: "#fefefebf",
                      }}
                      className="fad fa-volume-mute fa-2x"
                      aria-hidden="true"
                      aria-label="microphone muted"
                    ></i>
                  )}
                </div>
              </div>
            )}
            {!isCallAcceptedTab && (
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
            )}
            <h1 class="card-title">
              {user?.name}
            </h1>
            {calling ? (
              <>
                Calling ...
                <Button danger onClick={() => cancelCall()}>
                  Cancel call
                </Button>
              </>
            ) : (
              <>
                Ready to join?
                <Button type="primary" shape="round" onClick={() => callUser()}>
                  Join call
            </Button>
              </>
            )
            }
          </div>
        )
      })}
    </div >
  )
}
export default UserListBox