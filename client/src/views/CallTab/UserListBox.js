import { useContext } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Avatar from "antd/es/avatar/avatar"

import VideoOff from "../../assets/images/video-off.svg";
import { CallContext } from "../../context/callContext";

const UserListBox = ({ userList = [], callUser, calling = false, handleCancelCall, isCallAcceptedTab = false, currentRouterPath }) => {
  const { call = {}, userVideo, userVdoStatus, userMicStatus, currentChatId, leaveCall } = useContext(CallContext);
  console.log({ userList, call, isCallAcceptedTab, userVideo, calling, currentChatId })

  const handleFullScreen = (event) => {
    const elem = event.target;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  return (
    <div>

      {/* // We will implement the multi user later */}
      {/*
         { userList.map(user => {
        console.log("test", call)
           return ( */}
      <div class="card" style={{ minHeight: 400, maxHeight: "400px" }}>

        {call?.callAccepted && !call?.callEnded && (
          <div className="card2" style={{ textAlign: "center" }} id="video2">
            <div style={{ height: "2rem" }}>
              <h3>{userVdoStatus && (call.name)}</h3>
            </div>
            {
              !userVdoStatus && (
                <div className="bouncing-loader">
                  <img src={VideoOff} alt="video off icon" />
                </div>
              )
            }
            {
              userVideo ? (
                <div className="video-avatar-container">
                  <video
                    playsInline
                    ref={userVideo}
                    onClick={handleFullScreen}
                    autoPlay
                    className="video-active"
                    style={{
                      opacity: `${userVdoStatus ? "1" : "0"}`,
                    }}
                  />
                </div>
              )
                : (
                  <Avatar
                    style={{
                      backgroundColor: "#116",
                      position: "absolute",
                      opacity: `${userVdoStatus ? "-1" : "2"}`,
                    }}
                    size={98}
                    icon={<UserOutlined />}
                  >
                    {call.name}
                  </Avatar>
                )
            }
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
              >
              </i>
            )}
            <Button type="primary" danger onClick={leaveCall}>Leave call</Button>

          </div>
        )}

        {!call?.callAccepted && (
          <>
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
                src={userList[0]?.profileUrl}
                icon={!userList[0]?.name && <UserOutlined />}
              />
            )}
            <h1 class="card-title">
              {userList[0]?.name}
            </h1>
            {calling ? (
              <>
                Calling ...
                      <Button danger onClick={handleCancelCall}>
                  Cancel call
                   </Button>
              </>
            ) : (
              <>
                Ready to join?
                      <Button type="primary" shape="round" onClick={() => callUser(userList[0], currentChatId, currentRouterPath)}>
                  Join call
                 </Button>
              </>
            )
            }
          </>
        )}

      </div>
      {/* )
         })
      } */}
    </div >
  )
}
export default UserListBox