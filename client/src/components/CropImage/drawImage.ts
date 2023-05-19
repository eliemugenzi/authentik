const pixelRatio = 4;

export const clearImage = (previewCanvasRef: any) => {
  const canvas = previewCanvasRef.current;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawImage = (imgRef: any, previewCanvasRef: any, completedCrop: any) => {
  const image = imgRef.current;
  const canvas = previewCanvasRef.current;
  const crop = completedCrop;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );
};

export default drawImage;
