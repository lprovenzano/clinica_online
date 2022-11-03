import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ImagestorageService {

  images = []

  constructor(private storage: AngularFireStorage) {
  }

  upload(file: File, uid: string) {
    const filePath = `${uid}/${file.name}`;
    this.storage.upload(filePath, file);
  }

  bulkUpload(files: File[], uid: string) {
    files.forEach(f => this.upload(f, uid))
  }

  async getImagesById(uid: string): Promise<string[]> {
    let urls: string[] = [];
    const ref = this.storage.ref(uid);
    ref.listAll().forEach(lr => lr.items.forEach(i => i.getDownloadURL().then(url => urls.push(url))))
    return urls;
  }
}
