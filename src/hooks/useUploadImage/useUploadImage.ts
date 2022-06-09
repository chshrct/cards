import { useState } from 'react';

export const useUploadImage = (imageSRC: string | null) => {
  const [image, setImage] = useState<string | null>(imageSRC);

  const onImageChange = (e: any) => {

    if (e.target?.files[0]) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = e => {
        const imageSrc = e.target?.result as string;
        setImage(imageSrc);
      }
    }
  }

  return { image, onImageChange }
}

