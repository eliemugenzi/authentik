import { FC, useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import { Modal, Upload, message } from "antd";
import dayjs from "dayjs";
import validator from "validator";
import { CameraOutlined } from "@ant-design/icons";

import drawImage, { clearImage } from "./drawImage";
import generateBlob from "./generateBlob";

import styles from "./index.module.scss";

interface Props {
  isProfile?: boolean;
  file: any[];
  image: any;
  uploadFile?: any;
  onCancel: () => void;
  onOk: (image: any, file: any[], uploadFile: any) => void;
}

const CropImage: FC<Props> = ({
  isProfile = false,
  file: fl,
  image,
  uploadFile,
  onCancel,
  onOk,
}) => {
  const [crop, setCrop] = useState<any>({
    aspect: isProfile ? 1 : 16 / 9,
    width: 100,
    unit: "%",
  });
  const [cropped, setCropped] = useState<any>();
  const [completedCrop, setCompletedCrop] = useState<any>(image);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const [file, setFile] = useState<any[]>(fl);
  const [show, setShow] = useState<boolean>(false);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const cancel = useCallback((r: any) => {
    setFile([]);
    setShow(false);
    setCropped(null);
    setCompletedCrop(null);

    clearImage(r);

    onCancel();
  }, []);

  const props = {
    name: "image",
    multiple: false,
    accept: "image/*",
    fileList: file,
    showUploadList: !isProfile,
    beforeUpload: () => false,
    onChange: ({ file, fileList }: any) => {
      if (fileList.length > 0) {
        setFile([file]);
        setShow(true);
        setCropped(null);
      } else {
        setPreview(null);
        cancel(previewCanvasRef);
      }
    },
  };

  useEffect(() => {
    if (file.length > 0 && show) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setCropped(reader.result));
      reader.readAsDataURL(file[0]);
    }
  }, [file, show]);

  useEffect(() => {
    if (uploadFile instanceof File) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setPreview(reader.result));
      reader.readAsDataURL(uploadFile);
    }
  }, [uploadFile]);

  useEffect(() => {
    setFile(fl);
  }, [fl]);

  useEffect(() => {
    setCompletedCrop(image);
  }, [image]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    drawImage(imgRef, previewCanvasRef, completedCrop);
  }, [completedCrop]);

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  return (
    <div className={styles.cropping} data-profile-canvas={isProfile}>
      {!isProfile && <strong>{'Image'}</strong>}
      {isProfile && (
        <div className={styles.cropping__profile_hint}>
          <CameraOutlined />
        </div>
      )}
      <Upload.Dragger className={styles.cropping__upload} {...props}>
        <div className={styles.cropping__upload__inner}>
          <div
            className={styles.cropping__upload__inner__canvas}
            data-profile-canvas={isProfile}
          >
            {validator.isURL(
              typeof completedCrop === "string" ? completedCrop : "",
            ) ? (
              <img src={completedCrop} alt="cropped image" />
            ) : typeof preview === "string" ? (
              <img src={preview} alt="image preview" />
            ) : (
              <canvas ref={previewCanvasRef} />
            )}
          </div>
        </div>
        {!isProfile && (
          <p className={styles.cropping__upload__hint}>
            {completedCrop ? 'Change Image' : 'Choose an image to upload'}
          </p>
        )}
      </Upload.Dragger>
      <Modal
        title={'Crop Image'}
        visible={show}
        destroyOnClose
        onCancel={() => cancel(previewCanvasRef)}
        onOk={() => {
          setShow(false);

          generateBlob(previewCanvasRef.current, crop)
            ?.then((blob: any) => {
              onOk(
                completedCrop,
                file,
                new File([blob], `${dayjs().unix()}`, {
                  type: "image/png",
                  lastModified: dayjs().unix(),
                }),
              );
            })
            .catch((exc) => {
              message.error(exc.message);
              cancel(previewCanvasRef);
            });
        }}
        okText={'Done'}
        cancelText={'Cancel'}
        okButtonProps={{
          disabled:
            !completedCrop ||
            completedCrop?.width === 0 ||
            completedCrop?.height === 0,
        }}
      >
        <ReactCrop
          src={cropped}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c: any) => setCrop(c)}
          onComplete={(c: any) => setCompletedCrop(c)}
        />
      </Modal>
    </div>
  );
};

export default CropImage;
