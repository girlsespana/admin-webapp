import {FC} from "react";
import {useDropzone} from "react-dropzone";
import {v4} from "uuid";
import clsx from "clsx";
import {BiImageAdd} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import {ImageFile} from "@/modules/banners/types";

interface Props {
  value: ImageFile | null;
  onChange: (image: ImageFile | null) => void;
  label?: string;
}

const ImageUploadField: FC<Props> = ({value, onChange, label}) => {

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      onChange({
        id: v4(),
        file,
        preview,
      });
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">{label}</label>
      )}
      <div
        {...getRootProps()}
        className={clsx([
          "relative border border-dashed rounded-lg p-2 w-full flex items-center justify-center transition-all cursor-pointer",
          isDragActive ? "border-blue-500" : "border-neutral-500",
        ])}
      >
        <input {...getInputProps()} />

        {value ? (
          <div className="relative group w-full h-full rounded-lg overflow-hidden">
            <img
              src={value.preview}
              alt="Uploaded preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent dropzone trigger
                onChange(null);
              }}
              className="p-1 absolute top-1 right-1 text-3xl text-primary-500 bg-white/80 rounded-full hover:bg-white"
            >
              <IoClose/>
            </button>
          </div>
        ) : (
          <div className="mx-12 text-center text-neutral-500 flex flex-col items-center">
            <BiImageAdd size={48}/>
            <p>Subir imagen</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploadField