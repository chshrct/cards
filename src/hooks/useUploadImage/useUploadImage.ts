import { useState } from 'react';

import { ZERO } from 'constant';

export const useUploadImage = (imageSRC: string | null): ReturnedValueType => {
  const [image, setImage] = useState<string | null>(imageSRC);

  const onImageChange = (e: any): void => {
    if (e.target?.files[ZERO]) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(e.target.files[ZERO]);
      fileReader.onload = event => {
        const imageSrc = event.target?.result as string;
        setImage(imageSrc);
      };
    }
  };

  return { image, onImageChange };
};

type ReturnedValueType = {
  image: string | null;
  onImageChange: (e: any) => void;
};
