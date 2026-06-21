const JimpLib = require('jimp');
const Jimp = JimpLib.Jimp || JimpLib;

async function processLogo() {
  console.log("Loading logo from d:/website/public/images/cinors-logo.png...");
  const image = await Jimp.read('d:/website/public/images/cinors-logo.png');
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  
  console.log(`Original dimensions: ${width}x${height}`);
  
  // Scan all pixels to find bounding box of actual logo mark/text
  image.scan(0, 0, width, height, function(x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const a = this.bitmap.data[idx + 3];
    
    // If it's a white pixel (R > 240, G > 240, B > 240) make it transparent
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // Transparent alpha
    } else {
      // It's a colored logo pixel (navy or orange text)
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  });
  
  console.log(`Detected content box: X: ${minX} to ${maxX}, Y: ${minY} to ${maxY}`);
  
  if (maxX >= minX && maxY >= minY) {
    // Add small padding (e.g., 20px) to prevent layout cuts
    const padding = 20;
    const cropX = Math.max(0, minX - padding);
    const cropY = Math.max(0, minY - padding);
    const cropW = Math.min(width - cropX, (maxX - minX) + (padding * 2));
    const cropH = Math.min(height - cropY, (maxY - minY) + (padding * 2));
    
    console.log(`Cropping to: X: ${cropX}, Y: ${cropY}, W: ${cropW}, H: ${cropH}`);
    
    // In newer Jimp versions, crop is a method. We call it with an object.
    image.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
    
    // Save cropped transparent logo
    const writeMethod = typeof image.writeAsync === 'function' ? image.writeAsync.bind(image) : image.write.bind(image);
    await writeMethod('d:/website/public/images/cinors-logo.png');
    console.log("Logo successfully cropped and white background made transparent!");
  } else {
    console.log("Could not find any content pixels in the image.");
  }
}

processLogo().catch(err => {
  console.error("Error processing logo:", err);
});
