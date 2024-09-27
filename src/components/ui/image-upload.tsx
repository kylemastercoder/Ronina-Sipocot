"use client";

import { uploadToS3 } from "@/lib/s3";
import { Inbox, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ImageUpload = ({
  onImageUpload,
  className,
  defaultValue = [],
}: {
  onImageUpload: (urls: string[]) => void;
  defaultValue?: string[];
  className?: string;
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(defaultValue);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
    },
    maxFiles: 5,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }

      const newImageUrls: string[] = [];
      const newUploadProgress: number[] = [];

      for (const file of acceptedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error("Please upload a smaller image.");
          continue;
        }

        const previewUrl = URL.createObjectURL(file);
        newImageUrls.push(previewUrl);

        try {
          for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
              const updatedProgress = [...newUploadProgress, i];
              setUploadProgress(updatedProgress);
            }, i * 30);
          }

          const { url } = await uploadToS3(file);
          toast.success("Image uploaded successfully!");
          console.log(url);
          newImageUrls[newImageUrls.indexOf(previewUrl)] = url; // Replace preview with actual URL
        } catch (error) {
          newImageUrls.splice(newImageUrls.indexOf(previewUrl), 1); // Remove the preview if upload fails
          toast.error("Image upload failed.");
          console.log(error);
        }
      }

      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
      onImageUpload([...imageUrls, ...newImageUrls]);
    },
  });

  const handleRemoveImage = (index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);
    toast.info("Image removed.");
    onImageUpload(updatedUrls);
  };

  return (
    <div className={cn("rounded-xl", className)}>
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer dark:bg-neutral-800 bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {imageUrls.length > 0 ? (
          <div className="flex items-center gap-4">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-[100px] h-[100px] rounded-md overflow-hidden"
              >
                <div className="z-10 absolute top-0 right-0">
                  <Button
                    variant="destructive"
                    type="button"
                    size="icon"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Image src={url} alt="Image" className="object-cover" fill />
              </div>
            ))}
          </div>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-orange-600" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drop your images here (up to 4).
            </p>
          </>
        )}
      </div>

      {uploadProgress.some((progress) => progress > 0) && (
        <div className="mt-4">
          {uploadProgress.map((progress, index) => (
            <div key={index}>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-orange-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-orange-600">{progress}% uploaded</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
