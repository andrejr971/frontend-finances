import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { Container } from './styles';

interface DropzoneProps {
  onFileUploaded(file: File): void;
  imageURL?: string;
  isProfile?: boolean;
  isIcon?: boolean;
}

const InputImage: React.FC<DropzoneProps> = ({
  onFileUploaded,
  imageURL,
  isProfile,
  isIcon,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(imageURL || '');

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Container
      {...getRootProps()}
      isFilled={!!selectedFileUrl}
      isProfile={isProfile}
      isIcon={isIcon}
    >
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Imagem" />
      ) : isDragActive ? (
        <p>Solte a imagem aqui...</p>
      ) : (
        <p style={{ textAlign: 'center' }}>
          <FiUpload />
          Arraste e solte ou clique para selecionar a imagem
        </p>
      )}
    </Container>
  );
};

export default InputImage;
