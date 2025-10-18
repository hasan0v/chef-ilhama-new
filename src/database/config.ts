// Database configuration and connection utilities
import fs from 'fs';
import path from 'path';

export interface DatabaseConfig {
  dataPath: string;
  backupPath: string;
  maxBackups: number;
}

export const dbConfig: DatabaseConfig = {
  dataPath: path.join(process.cwd(), 'src', 'database', 'data'),
  backupPath: path.join(process.cwd(), 'src', 'database', 'backups'),
  maxBackups: 5
};

// Ensure directories exist
export function initializeDatabase() {
  if (!fs.existsSync(dbConfig.dataPath)) {
    fs.mkdirSync(dbConfig.dataPath, { recursive: true });
  }
  if (!fs.existsSync(dbConfig.backupPath)) {
    fs.mkdirSync(dbConfig.backupPath, { recursive: true });
  }
}

// Generic file operations
export async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

export async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
}

// Backup functionality
export async function createBackup(fileName: string): Promise<void> {
  const sourcePath = path.join(dbConfig.dataPath, fileName);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(dbConfig.backupPath, `${fileName}-${timestamp}`);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, backupPath);
    
    // Clean old backups
    cleanOldBackups(fileName);
  }
}

function cleanOldBackups(fileName: string): void {
  try {
    const backupFiles = fs.readdirSync(dbConfig.backupPath)
      .filter(file => file.startsWith(fileName))
      .map(file => ({
        name: file,
        path: path.join(dbConfig.backupPath, file),
        stat: fs.statSync(path.join(dbConfig.backupPath, file))
      }))
      .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());

    // Keep only the latest backups
    for (let i = dbConfig.maxBackups; i < backupFiles.length; i++) {
      fs.unlinkSync(backupFiles[i].path);
    }
  } catch (error) {
    console.error('Error cleaning old backups:', error);
  }
}