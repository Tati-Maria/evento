"use client";
import { CldUploadButton } from "next-cloudinary";
import { useCallback } from "react";
import {FcOk} from "react-icons/fc";
import { TbPhotoPlus } from "react-icons/tb";


declare global {
  var cloudinary: any;
}

type ImageUploaderProps = {
  onUpload: (url: string) => void;
  value?: string;
  htmlFor?: string;
  label?: string;
};

const ImageUploader = ({
  onUpload,
  value,
  htmlFor,
  label,
}: ImageUploaderProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onUpload(result.info.secure_url);
    },
    [onUpload]
  );

  return (
    <div
    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 ${
      value ? "border-green-500" : "border-gray-500"
    }`}
    >
      <label htmlFor={htmlFor} className="text-sm text-gray-500 font-medium">
        {label}
      </label>
      <CldUploadButton
        uploadPreset="fvi7whwb"
        onUpload={handleUpload}
        options={{
          maxFiles: 1,
          resourceType: "image",
          maxFileSize: 10000000,
          clientAllowedFormats: ["png", "gif", "jpeg"],
        }}
      >
        <div
          className={`flex flex-col items-center justify-between space-y-2 ${
            value ? "text-green-500" : "text-gray-500"
          }`}
        >
          {value ? (
            <FcOk size={32} />
          ) : (
            <TbPhotoPlus size={32} />
          )}
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUploader;
