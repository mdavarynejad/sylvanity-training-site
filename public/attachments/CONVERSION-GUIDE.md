# Sylvanity Training Flyer - Conversion Guide

This guide explains how to convert the training flyer SVG to various high-quality formats.

## 📁 Available Files

- `sylvanity-training-flyer-final.svg` - Source vector file (13KB, scalable)
- `sylvanity-training-flyer-final.png` - Optimized PNG (1.3MB, 3515x4687px, 450 DPI)
- `sylvanity-training-flyer-final.tiff` - High-quality TIFF (8.4MB, 4687x6250px, 600 DPI)
- `qr-code-registration.png` - QR code pointing to academy.sylvanity.eu (500x500px)

## 🔄 Conversion Methods

### 1. SVG to PNG (Using ImageMagick)

**Standard Quality PNG** (450 DPI, ~1.3MB):
```bash
cd /home/mohsen/sylvanity-training-site/public/attachments
convert -density 450 -background white -flatten \
  sylvanity-training-flyer-final.svg \
  -colorspace sRGB -depth 8 -quality 92 \
  -define png:compression-level=9 \
  output.png
```

**High Quality PNG** (600 DPI, larger file):
```bash
convert -density 600 -background white -flatten \
  sylvanity-training-flyer-final.svg \
  -resize 2250x3000 -quality 95 -sharpen 0x1.0 \
  output-hq.png
```

**Options Explained**:
- `-density 450`: Resolution (DPI) - higher = sharper
- `-background white`: Set white background
- `-flatten`: Merge all layers
- `-colorspace sRGB`: Standard color space
- `-depth 8`: 8-bit color (sufficient for most uses)
- `-quality 92`: PNG compression quality (0-100)
- `-define png:compression-level=9`: Maximum PNG compression

### 2. SVG to TIFF (Lossless, Best for Printing)

```bash
cd /home/mohsen/sylvanity-training-site/public/attachments
convert -density 600 -background white -flatten \
  sylvanity-training-flyer-final.svg \
  -compress lzw \
  output.tiff
```

**Result**:
- 16-bit color
- 600 DPI
- Lossless LZW compression
- ~8.4MB file size

### 3. SVG to PDF (Vector - Infinitely Scalable)

#### Option A: Browser Print to PDF (Recommended - Easiest)

1. Open the SVG in browser:
   - Local: `http://localhost:3000/attachments/sylvanity-training-flyer-final.svg`
   - Or open the file directly in Chrome/Firefox

2. Print to PDF:
   - Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
   - Destination: "Save as PDF"
   - Paper size: Custom (750 x 1000 pixels) or A4
   - Margins: None or Minimum
   - Scale: 100%
   - Background graphics: Enabled
   - Click "Save"

#### Option B: Online Converter (No Installation)

1. Visit: https://cloudconvert.com/svg-to-pdf
2. Upload: `sylvanity-training-flyer-final.svg`
3. Settings:
   - Output format: PDF
   - Quality: High
   - Preserve vector graphics: Yes
4. Download the converted PDF

#### Option C: wkhtmltopdf (Command Line)

**Install** (requires sudo):
```bash
sudo apt install wkhtmltopdf
```

**Convert**:
```bash
wkhtmltopdf --page-width 750px --page-height 1000px \
  --margin-top 0 --margin-bottom 0 \
  --margin-left 0 --margin-right 0 \
  sylvanity-training-flyer-final.svg \
  output.pdf
```

#### Option D: Inkscape (Vector Graphics Editor)

**Install**:
```bash
sudo apt install inkscape
```

**Convert**:
```bash
inkscape sylvanity-training-flyer-final.svg \
  --export-type=pdf \
  --export-filename=output.pdf
```

**Or via GUI**:
1. Open `sylvanity-training-flyer-final.svg` in Inkscape
2. File → Save As → PDF
3. Choose settings and save

### 4. SVG to JPEG (Smaller file, lossy compression)

```bash
convert -density 300 -background white -flatten \
  sylvanity-training-flyer-final.svg \
  -quality 90 \
  output.jpg
```

## 📊 Format Comparison

| Format | File Size | Quality | Best For | Scalable |
|--------|-----------|---------|----------|----------|
| **SVG** | 13KB | Perfect | Web, source file | ✅ Yes |
| **PNG** | 1.3MB | Excellent | Web, digital display | ❌ No |
| **TIFF** | 8.4MB | Highest | Professional printing | ❌ No |
| **PDF** | ~50-200KB | Perfect | Print, sharing, archiving | ✅ Yes |
| **JPEG** | ~200-500KB | Good | Email, quick sharing | ❌ No |

## 🎯 Recommended Usage

- **Web Display**: Use PNG (1.3MB, 450 DPI)
- **Professional Printing**: Use TIFF (8.4MB, 600 DPI) or PDF
- **Email/Sharing**: Use PDF (vector, small size) or compressed PNG
- **Editing**: Keep SVG as source, edit before converting

## 🔧 Troubleshooting

### Issue: QR Code Missing in Converted Image

**Cause**: The SVG references an external QR code file (`qr-code-registration.png`)

**Solution**: Make sure both files are in the same directory:
- `sylvanity-training-flyer-final.svg`
- `qr-code-registration.png`

### Issue: ImageMagick PDF Conversion Blocked

**Cause**: Security policy blocks PDF conversion

**Solution**: Use browser print-to-PDF or online converter instead

### Issue: Colors Look Different

**Cause**: Color space mismatch

**Solution**: Add `-colorspace sRGB` to conversion command:
```bash
convert -density 450 -colorspace sRGB -background white ...
```

### Issue: Image Too Large/Small

**Cause**: Wrong DPI setting

**Solutions**:
- Web: Use 72-150 DPI
- Print: Use 300-600 DPI
- Professional print: Use 600 DPI

## 📝 Notes

1. **SVG File Structure**: The SVG has been cleaned and optimized:
   - Removed 8 duplicate copies (2312 lines → 310 lines)
   - Externalized QR code from base64 to PNG file
   - File size reduced from 120KB to 13KB

2. **QR Code**: Points to `https://academy.sylvanity.eu` (500x500px PNG)

3. **Address**: Updated to "Unit 59, FLEX Treubstraat 21, 2288 EH, Rijswijk"

4. **Always convert from the same directory** to ensure QR code is found:
   ```bash
   cd /home/mohsen/sylvanity-training-site/public/attachments
   convert ... sylvanity-training-flyer-final.svg ... output.png
   ```

## 🌐 Quick Access URLs (Development)

- SVG: http://localhost:3000/attachments/sylvanity-training-flyer-final.svg
- PNG: http://localhost:3000/attachments/sylvanity-training-flyer-final.png
- TIFF: http://localhost:3000/attachments/sylvanity-training-flyer-final.tiff
- QR Code: http://localhost:3000/attachments/qr-code-registration.png

---

**Last Updated**: October 3, 2025
**Maintained By**: Sylvanity B.V.
