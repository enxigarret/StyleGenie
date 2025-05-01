import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { PlusIcon } from "@/components/icons/plus-icon";
import Image from 'next/image';
import Compress from "compress.js";
import styles from '@/styles/image-uploader.module.css';


function getDefaultValue(attachment: string |string[] | null) {
  if (!attachment) return null;
  return Array.isArray(attachment) ? attachment : [attachment];
}

interface UploaderProps {
  onChange: (value: any) => void;
  value: string |string[] | null;
  name: string;
  onBlur: () => void;
  multiple: boolean;
  maxSize?: number;
  isLoading?: boolean;
}

export default function Uploader({
  onChange,
  value,
  name,
  onBlur,
  multiple,
  isLoading,
  maxSize
}: UploaderProps) {
  const [attachments, setAttachments] = useState<string[] | null>(
    getDefaultValue(value)
  );

  const compressor = new Compress();

  useEffect(() => {
    setAttachments(getDefaultValue(value));
  }, [value]);

  const compress = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const newFile = await compressor.compress(file, {
      quality: 0.8,
      crop: true,
      maxWidth: 230,
      maxHeight: 230,
    });
    return newFile;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const imageCompress = await compress(acceptedFiles);
        // Handle the compressed image here
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    // @ts-expect-error - accept type is valid
    accept: 'image/*',
    multiple,
    onDrop
  });

  return (
    <div className={styles.uploadContainer}>
      <input
        {...getInputProps({
          name,
          onBlur
        })}
        className={styles.uploadInput}
      />
      {Array.isArray(attachments) ? (
        attachments.map((at, index) => (
          <div key={index} className={styles.uploadPreview}>
            <Image
              alt="Uploaded image"
              src={at}
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
        ))
      ) : (
        <div {...getRootProps()}>
          <label className={styles.uploadLabel}>
            Upload Your Dream Style Image (80 X 80)
          </label>
          {isLoading && (
            <div className="flex items-center justify-center gap-2">
              <PlusIcon className="h-4 w-4 animate-spin" />
              <span>Uploading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}