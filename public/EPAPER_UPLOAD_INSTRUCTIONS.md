# E-Paper Upload Instructions

## How to upload daily e-papers

### File Naming Convention
- **Format**: `epaper-DD-MM-YY.pdf`
- **Example**: `epaper-17-07-25.pdf` (for July 17, 2025)
- **Date Format**: 
  - DD = Day (2 digits with leading zero if needed)
  - MM = Month (2 digits with leading zero if needed) 
  - YY = Year (last 2 digits)

### Upload Process
1. Name your PDF file following the exact format above
2. Place the file in the `public/` folder
3. The system will automatically detect and display it

### How it works
- **Today's News**: Shows the current date's e-paper automatically
- **Archive**: Shows all available e-papers from the last 30 days
- **Automatic Detection**: No manual configuration needed

### Examples
- Today (July 17, 2025): `epaper-17-07-25.pdf`
- Tomorrow (July 18, 2025): `epaper-18-07-25.pdf` 
- August 1, 2025: `epaper-01-08-25.pdf`

### Important Notes
- Files must be in PDF format
- Use exact naming convention (case-sensitive)
- Place files directly in the `public/` folder
- System checks for today's file first, then shows archive for older dates
