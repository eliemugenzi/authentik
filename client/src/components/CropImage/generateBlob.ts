import getResizedCanvas from "./getResizedCanvas";

const generateImg = (previewCanvas: any, crop: any) => {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

  return new Promise((res) => {
    canvas.toBlob((blob) => res(blob), "image/png", 1);
  });
};

export default generateImg;
