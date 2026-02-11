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
  IonLabel,
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { imagesOutline, cameraOutline, closeOutline, trashOutline } from 'ionicons/icons';
import './style.scss';

interface UploadImagesProps {
  uploadedImages: string[];
  isEditing: boolean;
  onUploadImages: (files: File[]) => void;
  onRemoveImage?: (imageUrl: string) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ uploadedImages, isEditing, onUploadImages, onRemoveImage }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handlePreview = () => {
    setSelectedImages(uploadedImages);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const takePicture = async () => {
    try {
      // Check if running on web browser
      const isWeb = window.location.protocol.startsWith('http');

      if (isWeb) {
        // Web fallback: use HTML5 camera
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.setAttribute('capture', 'environment');
        input.onchange = (e: any) => {
          const file = e.target?.files?.[0];
          if (file) onUploadImages([file]);
        };
        input.click();
        return;
      }

      // Native: use Capacitor Camera
      const permissions = await Camera.checkPermissions();
      if (permissions.camera !== 'granted') {
        const request = await Camera.requestPermissions({ permissions: ['camera'] });
        if (request.camera !== 'granted') {
          alert('Camera permission denied.');
          return;
        }
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (image && image.webPath) {
        const res = await fetch(image.webPath);
        const blob = await res.blob();
        const file = new File([blob], `cam-${Date.now()}.${image.format}`, { type: `image/${image.format}` });
        onUploadImages([file]);
      }
    } catch (e: any) {
      console.error('Camera error:', e);
      if (e?.message && !e.message.includes('cancel')) {
        alert(`Camera error: ${e.message}`);
      }
    }
  };

  const pickFromGallery = async () => {
    try {
      // Check if running on web browser
      const isWeb = window.location.protocol.startsWith('http');

      if (isWeb) {
        // Web fallback: use file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e: any) => {
          const files = e.target?.files;
          if (files && files.length > 0) {
            onUploadImages(Array.from(files));
          }
        };
        input.click();
        return;
      }

      // Native: use Capacitor Camera
      const result = await Camera.pickImages({
        quality: 90,
        limit: 5,
      });

      if (result && result.photos && result.photos.length > 0) {
        const files: File[] = [];
        for (const photo of result.photos) {
          const res = await fetch(photo.webPath);
          const blob = await res.blob();
          const file = new File([blob], `gal-${Date.now()}.${photo.format}`, { type: `image/${photo.format}` });
          files.push(file);
        }
        onUploadImages(files);
      }
    } catch (e: any) {
      console.error('Gallery error:', e);
      if (e?.message && !e.message.includes('cancel')) {
        alert('Gallery failed.');
      }
    }
  };

  return (
    <div className="upload-images-wrapper">
      <div className="upload-actions">
        {isEditing && (
          <div className="upload-buttons-container">
            <IonButton className="upload-btn" fill="outline" onClick={takePicture}>
              <IonIcon slot="start" icon={cameraOutline} />
              <IonLabel>Camera</IonLabel>
            </IonButton>
            <IonButton className="upload-btn" fill="outline" onClick={pickFromGallery}>
              <IonIcon slot="start" icon={imagesOutline} />
              <IonLabel>Gallery</IonLabel>
            </IonButton>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="image-preview-scroller">
          {uploadedImages.map((image, index) => (
            <div key={index} className="thumbnail-container">
              <img
                src={image}
                alt="Upload"
                className="img-thumb"
                onClick={handlePreview}
              />
              {isEditing && onRemoveImage && (
                <div className="remove-image-overlay" onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage(image);
                }}>
                  <IonIcon icon={trashOutline} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && uploadedImages.length === 0 && (
        <IonText color="medium" className="empty-text">
          No images attached. Use Camera or Gallery.
        </IonText>
      )}

      <IonModal isOpen={isPreviewOpen} onDidDismiss={closePreview} className="image-modal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>View Images</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closePreview}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent color="light">
          <div className="full-image-list">
            {uploadedImages.map((image, idx) => (
              <IonImg key={idx} src={image} className="full-width-img" />
            ))}
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default UploadImages;
