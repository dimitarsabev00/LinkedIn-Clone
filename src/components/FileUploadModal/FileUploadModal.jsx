/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from "react";
import { Button, Modal, Progress } from "antd";
import styled from "styled-components";
const FileUploadModal = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) => {
  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage?.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <ImageUploadMain>
          <p>{currentImage?.name}</p>
          <label className="upload-btn" for="image-upload">
            Add an Image
          </label>
          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input hidden id="image-upload" type={"file"} onChange={getImage} />
        </ImageUploadMain>
      </Modal>
    </div>
  );
};
const ImageUploadMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  flex-direction: column;
  label {
    border: 1px solid #212121;
    padding: 10px;
    cursor: pointer;
    font-family: system-ui;
  }

  .progress-bar {
    padding: 20px;
  }
`;
export default FileUploadModal;
