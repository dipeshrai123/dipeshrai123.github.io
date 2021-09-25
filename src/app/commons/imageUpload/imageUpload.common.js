import React, { useEffect, useState } from "react";
import { useAuth } from "react-auth-navigation";

export function ImageUpload(props) {
  const {
    onChange,
    children,
    multiple,
    buttonStyle,
    title,
    buttonclick,
    accept,
    fixedResolution,
  } = props;

  const { toast } = useAuth();
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    onChange(imageData);
  }, [imageData]);
  const onUploadImage = (e) => {
    let { files } = e.target;

    let data = [];
    if (!!fixedResolution) {
      for (let i = 0; i < files.length; i++) {
        let img = new Image();
        img.src = URL.createObjectURL(files[i]);

        img.onload = () => {
          if (img.width !== 1920 || img.height !== 1080) {
            toast({
              message: `Sorry, this image doesn't look like the size we wanted. It's 
            ${img.width} x ${img.height} but we require 1920 x 1080 size image.`,
              type: "error",
            });

            return;
          } else {
            let impath = URL.createObjectURL(files[i]);
            data.push({ url: impath, file: files[i] });

            if (multiple) {
              setImageData([...imageData, ...data]);
            } else setImageData([...data]);
          }
        };
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        let impath = URL.createObjectURL(files[i]);
        data.push({ url: impath, file: files[i] });
      }
      if (multiple) {
        setImageData([...imageData, ...data]);
      } else setImageData([...data]);
    }

    // setFunction(data);
  };

  const onRemove = (i) => {
    let data = [...imageData];
    data.splice(i, 1);
    setImageData(data);
  };

  const deleteAllHandler = () => {
    setImageData([]);
  };

  return (
    <>
      {children({ imageData, onUploadImage, onRemove, deleteAllHandler })}
      <label style={{ display: "inline-block" }}>
        <input
          id="click"
          style={{ display: "none" }}
          type="file"
          multiple={multiple}
          name="files"
          onChange={(e) => onUploadImage(e)}
          accept={accept}
        />
        {buttonclick}
      </label>
    </>
  );
}
