/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */


import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;

}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value
}) => {

  const onUploadz = (result: any) => {
    console.log(result,"result upload");
    onChange(result.info.secure_url);
  }
  return (
    <div>
      <div className='flex mb-4 flex-wrap items-center gap-4 '>
        
        {value.map((url, i) => (
            <div key={i} className='relative w-[200px] h-[200px]'>
              <div className='absolute top-0 right-0 z-10'
              >
                <Button onClick={() => onRemove(url)}
                size="sm"
                className='bg-red-1 text-white'
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
              <Image 
              
              src={url} 
              alt='img-collection' 
              className='object-cover rounded-lg ' 
              width={400}
              height={400}
              />
            </div>
            
          ))}
      </div>
      <CldUploadWidget 
      uploadPreset="hgdskjdhs" 
      onSuccess={onUploadz}
      >
      {({ open }) => {
          return (
          <Button type='button' onClick={() => open()}
          className='bg-grey-1 text-white'
          >
          <Plus className='h-4 w-4 mr-2' />    Upload an Image
          </Button>
          );
      }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload