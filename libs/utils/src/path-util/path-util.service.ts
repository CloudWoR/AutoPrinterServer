import { Injectable } from '@nestjs/common';
import * as regedit from 'regedit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PathUtilService {
  private key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders';
  private startPath  = path.join(__dirname, '..');
  private userPath = process.env.USERPROFILE;
  private userDocPath: string;
  private appdataPath = process.env.APPDATA;

  public assetsDir() {
    if (process.env.DEV) {
      return path.join(__dirname, '../../src/main/assets');
    } else {
      return path.join(__dirname, '../../../');
    }
  }

  public resolvePath(dirPath: string) {
    return path.join(this.startPath, dirPath || '');
  }

  private resolveUserDocPath(dirPath: string) {
    return new Promise((resolve) => {
      void this.getUserDoc().then((docPath) => {
        this.userDocPath = docPath as string;
        resolve(this.userDocPath);
      })
    })
  }

  async getUserDoc() {
    return new Promise((resolve, reject) => {
      regedit.setExternalVBSLocation(this.resolvePath('vbs'));
      regedit.list(this.key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          try {
            resolve(result[this.key].values.Personal.value);
          } catch (e) {
            const docPath = path.join(this.userPath, 'Documents');
            if (!fs.existsSync(docPath)) {
              fs.mkdirSync(docPath);
            }
            resolve(docPath);
          }
        }
      })
    })
  }
}
