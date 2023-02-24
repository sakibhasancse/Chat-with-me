import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";

import Teams from '../../../assets/audio/teams.mp3'
import Phone from "../../../assets/images/phone.gif";
import InboxContext from '../../../context/Inbox/inboxContext';
import "./Options.module.css";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const Options = () => {
  const { call = {}, answerCall } = useContext(InboxContext);
  const [showCallingModal, setShowCallingModal] = useState(false)
  const Audio = useRef();

  const navigator = useNavigate()

  const handleRedirectUrl = (isVideoCall = false) => {
    const path = `/call?has_video=${isVideoCall}&ig_thread_id=${currentChatId}&callAccepted=true`
    navigator(path)
  }

  const handleCancel = () => {
    setShowCallingModal(false)
    leaveCall();
  }

  const acceptUserCall = () => {
    answerCall();
    handleRedirectUrl()
  }

  useEffect(() => {
    if (call.isReceivingCall && !call.callAccepted) {
      setShowCallingModal(true);
      // setOtherUser(call.from);
    } else setShowCallingModal(false);
    console.log('calling', call)
  }, [call.isReceivingCall])

  useEffect(() => {
    if (showCallingModal) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [showCallingModal]);

  return (
    <>
      <audio src={Teams} loop ref={Audio} />
      <Modal
        title="Incoming Call"
        visible={showCallingModal}
        onOk={() => showModal(false)}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>
            {call.name} is calling you:{" "}
            <img
              src={Phone}
              alt="phone ringing"
              // className={classes.phone}
              style={{ display: "inline-block" }}
            />
          </h1>
        </div>
        <div className="btnDiv">
          <Button
            variant="contained"
            className="answer"
            color="#29bb89"
            icon={<PhoneOutlined />}
            onClick={() => {
              acceptUserCall()
              Audio.current.pause();
            }}
            tabIndex="0"
          >
            Answer
              </Button>
          <Button
            variant="contained"
            className="decline"
            icon={<PhoneOutlined />}
            onClick={() => {
              setShowCallingModal(false);
              Audio?.current?.pause();
            }}
            tabIndex="0"
          >
            Decline
              </Button>
        </div>
      </Modal>
    </>
  )
}

export default Options