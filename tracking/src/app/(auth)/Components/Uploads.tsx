
import React, { useState, ChangeEvent, FormEvent } from 'react';

export function Uploads() {
  const [file, setFile] = useState<File | null>(null);

  // Handle file change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Handle form submit
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <form action={'/api/uploads'} method='POST' encType="multipart/form-data">
      <input type="file" name='file' onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
