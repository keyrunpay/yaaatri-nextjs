import { Modal } from "antd";
import React from "react";
import { onFileUpload } from "../../services/file.service";
import CropperJS from "./KCropper";
let croppedImage;

export default function KImageCropperModal(props) {
  const { src, visible, onCancel, ratio, sub_path, file_name, onCompleted } =
    props;
  const [loading, setLoading] = React.useState(false);

  const imageRef = React.useRef(null);

  const onUpload = async () => {
    setLoading(true);
    try {
      const res = await onFileUpload(croppedImage, sub_path, file_name);
      if (onCompleted) onCompleted(res);
      setLoading(false);
      onCancel();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onCropComplete = (_) => {
    imageRef.current.getCroppedCanvas().toBlob(
      (blob) => {
        blob.name = "croppedImage.png";
        blob.lastModifiedDate = new Date();
        croppedImage = blob;
      },
      "image/png",
      1
    );
  };

  return (
    <div>
      <Modal
        title="Crop Image"
        visible={visible}
        onCancel={() => {
          onCancel();
        }}
        onOk={() => {
          onUpload();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
      >
        <CropperJS
          ref={imageRef}
          style={{ height: 400, width: "100%" }}
          crop={onCropComplete}
          aspectRatio={ratio || 4 / 3}
          guides={true}
          src={src}
        />
      </Modal>
    </div>
  );
}
