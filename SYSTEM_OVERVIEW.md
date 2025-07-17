# Aksharakalam E-Paper System Overview

## How the System Works

### Automatic PDF Detection
When a user opens the website, the system automatically and quickly:

1. **Checks for Today's PDF**: 
   - Searches for PDFs with today's date in multiple filename formats
   - Uses parallel checking for faster loading
   - Supports formats like: `epaper-DD-MM-YY.pdf`, `epaper_DD-MM-YY.pdf`, etc.

2. **Displays Today's Edition**:
   - If today's PDF exists, it shows in the main "Today's Edition" viewer
   - If not available, displays a "No E-Paper Available" message with today's date

3. **Populates Archive**:
   - Automatically scans the last 30 days for available PDFs
   - Shows only existing PDFs (excludes today's edition)
   - Displays in a grid format for easy browsing

### File Naming Convention
The system looks for PDFs in these formats:
- `epaper-DD-MM-YY.pdf` (preferred)
- `epaper_DD-MM-YY.pdf`
- `newspaper-DD-MM-YY.pdf`
- `DD-MM-YY.pdf`
- And many other variations

### Performance Optimizations
- **Parallel File Checking**: All possible filenames are checked simultaneously
- **Efficient Archive Loading**: Multiple date checks run in parallel
- **Smart Caching**: Reduces repeated file system calls
- **Responsive Design**: Fast loading on all devices

### User Experience
1. **Website Opens** → Immediately checks for today's PDF
2. **Today's Edition** → Shows current day's newspaper if available
3. **Archive Section** → Browse previous editions (excluding today's)
4. **Mobile Optimized** → Touch-friendly navigation and responsive design

### File Upload Instructions
To add a new e-paper:
1. Name the PDF file: `epaper-DD-MM-YY.pdf` (e.g., `epaper-17-07-25.pdf`)
2. Place it in the `/public/` folder
3. The system will automatically detect it on next page load

### Navigation System
- **Home**: Today's edition viewer
- **Archive**: Historical newspapers
- **About Us**: Company information (placeholder)
- **Contact Us**: Contact details (placeholder)
- **Privacy Policy**: Privacy information (placeholder)

### Mobile Features
- Side menu navigation
- Bottom navigation bar for PDF pages
- Responsive PDF scaling
- Touch-friendly controls

## Current File Structure
```
public/
├── aksharakalam.png (logo)
├── epaper-15-07-2025 .pdf
├── epaper-16-07-25.pdf
├── epaper-17-07-25.pdf (today's edition)
├── epaper-18-07-25.pdf
└── ... (other PDF files)
```

The system is production-ready and will automatically handle new PDF uploads with the correct naming convention.
