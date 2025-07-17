// Service to manage e-paper PDF files
export interface EPaperInfo {
  date: string;
  fileName: string;
  url: string;
  exists: boolean;
}

export class EPaperService {
  private static instance: EPaperService;
  private baseUrl = '/'; // Since files are in public folder

  private constructor() {}

  public static getInstance(): EPaperService {
    if (!EPaperService.instance) {
      EPaperService.instance = new EPaperService();
    }
    return EPaperService.instance;
  }

  /**
   * Get today's date in DD-MM-YY format
   */
  private getTodayDateString(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  }

  /**
   * Get formatted date for display (DD.MM.YYYY)
   */
  private getDisplayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  }

  /**
   * Generate possible filename patterns for today's e-paper
   */
  private generatePossibleFilenames(dateStr: string): string[] {
    const baseNames = [
      'epaper',
      'newspaper',
      'flashindia',
      'news',
      'paper'
    ];

    const patterns: string[] = [];
    
    // Add various filename patterns
    baseNames.forEach(baseName => {
      patterns.push(`${baseName}-${dateStr}.pdf`);
      patterns.push(`${baseName}_${dateStr}.pdf`);
      patterns.push(`${baseName}${dateStr}.pdf`);
      patterns.push(`${dateStr}-${baseName}.pdf`);
      patterns.push(`${dateStr}_${baseName}.pdf`);
      patterns.push(`${dateStr}${baseName}.pdf`);
    });

    // Add date-only patterns
    patterns.push(`${dateStr}.pdf`);
    
    return patterns;
  }

  /**
   * Check if a file exists by trying to fetch it
   */
  private async checkFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok && response.status === 200;
    } catch (error) {
      console.log(`File not found: ${url}`);
      return false;
    }
  }

  /**
   * Find today's e-paper PDF file
   */
  public async getTodayEPaper(): Promise<EPaperInfo> {
    const dateStr = this.getTodayDateString();
    const displayDate = this.getDisplayDate();
    const possibleFilenames = this.generatePossibleFilenames(dateStr);

    console.log('Looking for e-paper with date string:', dateStr);
    console.log('Possible filenames:', possibleFilenames);

    // Try to find an existing PDF file
    for (const filename of possibleFilenames) {
      const url = `${this.baseUrl}${filename}`;
      console.log('Checking file:', url);
      const exists = await this.checkFileExists(url);
      
      if (exists) {
        console.log('Found e-paper:', filename);
        return {
          date: displayDate,
          fileName: filename,
          url: url,
          exists: true
        };
      }
    }

    console.log('No e-paper found for today');
    // If no file found, return info for the preferred filename
    const preferredFilename = `epaper-${dateStr}.pdf`;
    return {
      date: displayDate,
      fileName: preferredFilename,
      url: `${this.baseUrl}${preferredFilename}`,
      exists: false
    };
  }

  /**
   * Get e-paper for a specific date
   */
  public async getEPaperForDate(date: Date): Promise<EPaperInfo> {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const dateStr = `${day}-${month}-${year}`;
    
    const displayDay = String(date.getDate()).padStart(2, '0');
    const displayMonth = String(date.getMonth() + 1).padStart(2, '0');
    const displayYear = date.getFullYear();
    const displayDate = `${displayDay}.${displayMonth}.${displayYear}`;

    const possibleFilenames = this.generatePossibleFilenames(dateStr);

    // Try to find an existing PDF file
    for (const filename of possibleFilenames) {
      const url = `${this.baseUrl}${filename}`;
      const exists = await this.checkFileExists(url);
      
      if (exists) {
        return {
          date: displayDate,
          fileName: filename,
          url: url,
          exists: true
        };
      }
    }

    // If no file found, return info for the preferred filename
    const preferredFilename = `epaper-${dateStr}.pdf`;
    return {
      date: displayDate,
      fileName: preferredFilename,
      url: `${this.baseUrl}${preferredFilename}`,
      exists: false
    };
  }

  /**
   * Get list of available e-papers for the archive
   */
  public async getAvailableEPapers(daysToCheck: number = 30): Promise<EPaperInfo[]> {
    const papers: EPaperInfo[] = [];
    const today = new Date();
    
    // Check for papers from the last N days
    for (let i = 0; i < daysToCheck; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const paperInfo = await this.getEPaperForDate(date);
      papers.push(paperInfo);
    }
    
    return papers;
  }

  /**
   * Get only available e-papers (that exist)
   */
  public async getExistingEPapers(daysToCheck: number = 30): Promise<EPaperInfo[]> {
    const allPapers = await this.getAvailableEPapers(daysToCheck);
    return allPapers.filter(paper => paper.exists);
  }

  /**
   * Get instructions for uploading today's e-paper
   */
  public getUploadInstructions(): { filename: string; path: string } {
    const dateStr = this.getTodayDateString();
    const filename = `epaper-${dateStr}.pdf`;
    
    return {
      filename,
      path: `public/${filename}`
    };
  }
}
