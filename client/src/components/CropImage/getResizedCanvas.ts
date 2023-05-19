const getResizedCanvas = (canvas: any, newWidth: number, newHeight: number) => {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;
  
    const ctx = tmpCanvas.getContext("2d");
    ctx?.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight,
    );
  
    return tmpCanvas;
  };
  
  export default getResizedCanvas;
  