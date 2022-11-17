import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Diary} from "../class/diary";
import {collection, getDocs, query, where} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private path = 'images'
  imageRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.imageRef = db.collection(this.path);
  }

  create(images: any): any {
    return this.imageRef.add({... images});
  }

  async getByIdNumber(idNumber: string): Promise<any> {
    let images: any[] = [];
    const q = query(collection(this.db.firestore, this.path), where("idNumber", "==", idNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      images.push(doc.data());
    });
    return images[0]
  }
}
