import { useEffect, useRef, useState } from "react";

export default function usePhotoPreview(DEFAULT_PHOTO: string) {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const [photoSrc, setPhotoSrc] = useState(DEFAULT_PHOTO);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {
    if (file) {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = (e) => {
        setPhotoSrc(String(e.target?.result));
      };
    } else {
      setPhotoSrc(DEFAULT_PHOTO);
    }
  }, [file]);

  return { file, clearFile, resetRef, photoSrc, setFile };
}
