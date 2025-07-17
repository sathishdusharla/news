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
   * Find today's e-paper PDF file with optimized parallel checking
   */
  public async getTodayEPaper(): Promise<EPaperInfo> {
    const dateStr = this.getTodayDateString();
    const displayDate = this.getDisplayDate();
    const possibleFilenames = this.generatePossibleFilenames(dateStr);

    console.log('Looking for e-paper with date string:', dateStr);
    console.log('Possible filenames:', possibleFilenames);

    // Check files in parallel for faster loading
    const fileCheckPromises = possibleFilenames.map(async (filename) => {
      const url = `${this.baseUrl}${filename}`;
      const exists = await this.checkFileExists(url);
      return { filename, url, exists };
    });

    // Wait for all checks to complete
    const results = await Promise.all(fileCheckPromises);
    
    // Find the first existing file
    const existingFile = results.find(result => result.exists);
    
    if (existingFile) {
      console.log('Found e-paper:', existingFile.filename);
      return {
        date: displayDate,
        fileName: existingFile.filename,
        url: existingFile.url,
        exists: true
      };
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
   * Get e-paper for a specific date with optimized parallel checking
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

    // Check files in parallel for faster loading
    const fileCheckPromises = possibleFilenames.map(async (filename) => {
      const url = `${this.baseUrl}${filename}`;
      const exists = await this.checkFileExists(url);
      return { filename, url, exists };
    });

    // Wait for all checks to complete
    const results = await Promise.all(fileCheckPromises);
    
    // Find the first existing file
    const existingFile = results.find(result => result.exists);
    
    if (existingFile) {
      return {
        date: displayDate,
        fileName: existingFile.filename,
        url: existingFile.url,
        exists: true
      };
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
   * Get list of available e-papers for the archive with optimized batch checking
   */
  public async getAvailableEPapers(daysToCheck: number = 30): Promise<EPaperInfo[]> {
    const papers: EPaperInfo[] = [];
    const today = new Date();
    
    // Prepare all date checks
    const dateCheckPromises: Promise<EPaperInfo>[] = [];
    
    for (let i = 0; i < daysToCheck; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dateCheckPromises.push(this.getEPaperForDate(date));
    }
    
    // Execute all checks in parallel
    const results = await Promise.all(dateCheckPromises);
    papers.push(...results);
    
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
   * Get all available e-papers excluding today's edition
   */
  public async getArchiveEPapers(daysToCheck: number = 30): Promise<EPaperInfo[]> {
    const allPapers = await this.getAvailableEPapers(daysToCheck);
    const todayDateStr = this.getTodayDateString();
    
    // Filter out today's paper and only return existing papers
    return allPapers.filter(paper => {
      // Extract date from filename to check if it's today's paper
      const isToday = paper.fileName.includes(todayDateStr);
      return paper.exists && !isToday;
    });
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
