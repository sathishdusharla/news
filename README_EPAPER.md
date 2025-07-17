# E-Paper Setup Instructions

## How to Upload Daily E-Papers

To use the e-paper functionality, you need to upload PDF files to the `public` folder with specific naming conventions.

### File Naming Convention

The system will automatically detect today's e-paper using these filename patterns:

1. `epaper-DD-MM-YY.pdf` (recommended)
2. `newspaper-DD-MM-YY.pdf`
3. `flashindia-DD-MM-YY.pdf`
4. `news-DD-MM-YY.pdf`
5. `DD-MM-YY.pdf`

Where:
- DD = Day (01-31)
- MM = Month (01-12)  
- YY = Year (last 2 digits)

### Example for July 17, 2025:
- `epaper-17-07-25.pdf`
- `newspaper-17-07-25.pdf`
- `flashindia-17-07-25.pdf`

### Upload Steps:
1. Place your daily PDF file in the `public` folder
2. Name it using one of the patterns above
3. The application will automatically detect and display it

### Features:
- ✅ Automatic date detection
- ✅ Page navigation (left/right arrows or buttons)
- ✅ Zoom in/out functionality
- ✅ Download PDF option
- ✅ No scrolling (page-by-page viewing like real e-paper)
- ✅ Responsive design for mobile and desktop
- ✅ Keyboard navigation (arrow keys)

### Current UI Design:
The existing newspaper layout design is preserved and can be accessed via the "News Layout" tab. The e-paper viewer maintains the same visual style and branding as your current design.

### File Size Recommendations:
- Optimize PDFs for web viewing
- Recommended maximum size: 50MB per PDF
- Use appropriate compression for faster loading

### Troubleshooting:
- If PDF doesn't appear, check the filename format
- Ensure the PDF is in the `public` folder
- Refresh the page after uploading
- Check browser console for any errors
