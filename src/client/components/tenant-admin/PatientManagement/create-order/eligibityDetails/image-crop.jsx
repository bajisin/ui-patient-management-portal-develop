import "react-image-crop/dist/ReactCrop.css";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import ReactCrop from "react-image-crop";

const ImageCrop = ({ isDialogOpen, setIsDialogOpen, providerSign, setCroppedImage, handleSubmit }) => {
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleImageLoad = (image) => {
    if (image.naturalWidth < 50 || image.naturalHeight < 50) {
      alert("Image is too small for cropping");
      return;
    }
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    setCrop({ unit: "%", width: 30, aspect: aspectRatio });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const saveCroppedImage = () => {
    if (!completedCrop || !providerSign) return;

    const image = new Image();
    image.src = URL.createObjectURL(providerSign);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );

      // Convert the canvas to a Blob with binary data
      canvas.toBlob(
        (blob) => {
          // Store the Blob in the state as binary data
          setCroppedImage(blob);

          // Close the dialog after saving
          handleCloseDialog();
          setIsDialogOpen(false);
        },
        "image/jpeg",
        1
      );
    };
    // handleSubmit();
  };

  return (
    <div>
      {/* ... your cropping component ... */}

      {/* {completedCrop && <Button onClick={handleCropComplete}>Open Cropped Image</Button>} */}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        {providerSign && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onImageLoaded={handleImageLoad}
              onComplete={handleCropComplete}
            >
              <img src={URL.createObjectURL(providerSign)} alt="Signature" />
            </ReactCrop>

            <DialogActions>
              <Button onClick={saveCroppedImage} color="primary">
                Save
              </Button>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};
export default ImageCrop;
