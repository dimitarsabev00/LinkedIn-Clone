/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from "react";
import { Modal } from "antd";
const PreviewImageModal = ({
  showImageModal,
  setShowImageModal,
  postImage,
}) => {
  return (
    <div>
      <Modal
        centered
        open={showImageModal}
        onOk={() => setShowImageModal(false)}
        onCancel={() => setShowImageModal(false)}
        footer={[]}
        width={1000}
      >
        <img
          onClick={() => setShowImageModal(true)}
          src={postImage}
          className="post-image modal"
          alt="post-image"
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};
export default PreviewImageModal;
