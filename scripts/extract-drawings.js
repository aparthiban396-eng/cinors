const { pdfToPng } = require('pdf-to-png-converter');
const JimpLib = require('jimp');
const Jimp = JimpLib.Jimp || JimpLib;
const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\parth\\.gemini\\antigravity\\brain\\8daeeae5-f917-4be2-a733-d3350cb57b01';
const outputDir = 'd:/website/public/images/drawings';

// PDF mappings
const pdfFiles = [
  {
    filename: 'media__1782013701939.pdf',
    name: 'floor_plan',
    pages: [
      { num: 1, suffix: 'ground', cropBottomPercent: 0.17 },
      { num: 2, suffix: 'first', cropBottomPercent: 0.17 },
      { num: 3, suffix: 'second', cropBottomPercent: 0.17 },
      { num: 4, suffix: 'third', cropBottomPercent: 0.17 }
    ]
  },
  {
    filename: 'media__1782013701921.pdf',
    name: 'footing',
    pages: [
      { num: 1, suffix: 'layout', cropBottomPercent: 0.17 },
      { num: 2, suffix: 'details', cropBottomPercent: 0.17 }
    ]
  },
  {
    filename: 'media__1782013701864.pdf',
    name: 'grade_beam',
    pages: [
      { num: 1, suffix: 'layout', cropBottomPercent: 0.17 },
      { num: 2, suffix: 'details-1', cropBottomPercent: 0.17 },
      { num: 3, suffix: 'details-2', cropBottomPercent: 0.17 }
    ]
  },
  {
    filename: 'media__1782013701909.pdf',
    name: 'proposed_rcc',
    pages: [
      { num: 1, suffix: 'elevation-plan', cropRightPercent: 0.30 } // Crop title block on the right
    ]
  }
];

async function extractAndCrop() {
  console.log("Ensuring output folder exists: " + outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const doc of pdfFiles) {
    const fullPath = path.join(brainDir, doc.filename);
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping missing file: ${doc.filename}`);
      continue;
    }

    console.log(`\nProcessing ${doc.filename} (${doc.name})...`);
    
    // Convert PDF to PNGs in memory
    const pages = await pdfToPng(fullPath, { viewportScale: 1.8 });
    console.log(`Converted ${pages.length} pages.`);

    for (const pageCfg of doc.pages) {
      const pageData = pages.find(p => p.pageNumber === pageCfg.num);
      if (!pageData) {
        console.log(`Page ${pageCfg.num} not found, skipping.`);
        continue;
      }

      console.log(`Cropping Page ${pageCfg.num}...`);
      const image = await Jimp.read(pageData.content);
      const w = image.bitmap.width;
      const h = image.bitmap.height;

      let cropX = 0;
      let cropY = 0;
      let cropW = w;
      let cropH = h;

      if (pageCfg.cropBottomPercent) {
        cropH = Math.round(h * (1 - pageCfg.cropBottomPercent));
      } else if (pageCfg.cropRightPercent) {
        cropW = Math.round(w * (1 - pageCfg.cropRightPercent));
      }

      console.log(`Dimensions: ${w}x${h} -> Cropped: ${cropW}x${cropH}`);
      
      // Perform crop
      image.crop({ x: cropX, y: cropY, w: cropW, h: cropH });

      // Save output file
      const outName = `${doc.name}-${pageCfg.suffix}.png`;
      const outPath = path.join(outputDir, outName);

      const writeMethod = typeof image.writeAsync === 'function' ? image.writeAsync.bind(image) : image.write.bind(image);
      await writeMethod(outPath);
      console.log(`Saved: drawings/${outName}`);
    }
  }
  
  console.log("\nAll drawings extracted and cropped successfully!");
}

extractAndCrop().catch(err => {
  console.error("Error during extraction:", err);
});
