import React, { useState } from 'react';
import {
  IonIcon,
  IonText,
  IonImg,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonRow,
  IonCol,
} from '@ionic/react';
import { imagesOutline, closeOutline } from 'ionicons/icons';
import './style.scss';

interface UploadImagesProps {
  uploadedImages: string[];
  isEditing: boolean;
  onUploadImages: (images: FileList | null) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ uploadedImages, isEditing, onUploadImages }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handlePreview = () => {
    setSelectedImages(uploadedImages);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Add validation for image formats (e.g., jpg, png)
      const validFiles = Array.from(files).filter((file) =>
        ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      );

      if (validFiles.length < files.length) {
        alert('Some files were not valid images (only jpg/png allowed)');
      }

      onUploadImages(files);
    }
  };

  return (
    <div className="upload-images-wrapper">
      {uploadedImages.length > 0 ? (
        <div className="image-preview-grid">
          {uploadedImages.slice(0, 3).map((image, index) => (
            <div key={index} className="image-preview-thumbnail">
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="image-thumbnail"
                onClick={handlePreview}
              />
            </div>
          ))}
          {uploadedImages.length > 3 && (
            <div className="extra-image-count" onClick={handlePreview}>
              +{uploadedImages.length - 3}
            </div>
          )}
        </div>
      ) : (
        <div className={`upload-placeholder ${isEditing ? '' : 'disabled'}`}>
          <IonIcon icon={imagesOutline} className="upload-icon" />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              multiple
              className="upload-input"
              onChange={handleFileChange}
            />
          )}
          <IonText color="medium">No images uploaded. Click to upload images.</IonText>
        </div>
      )}

      <IonModal isOpen={isPreviewOpen} onDidDismiss={closePreview}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Image Preview</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closePreview}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="image-preview-grid">
            {selectedImages.map((image, idx) => (
              <IonImg key={idx} src={image} className="preview-image" />
            ))}
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default UploadImages;