import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from "@angular/fire/compat/firestore";
import {collection, getDocs, query, where} from "firebase/firestore";
import {Diary} from "../class/diary";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private path = 'diary'
  public diaries: Diary[] = [];
  diaryRef: AngularFirestoreCollection<Diary>;

  constructor(private db: AngularFirestore, private firestore: AngularFirestore) {
    this.diaryRef = db.collection(this.path);
  }

  get() {
    return this.firestore.collection('diary').valueChanges();
  }

  create(diary: any): any {
    const col = this.firestore.collection('diary');
    const id = this.firestore.createId()
    const doc = col.doc(id)
    diary.id = id;
    doc.set({...diary})
  }

  async update(diary: any): Promise<void> {
    // const q = query(collection(this.db.firestore, this.path),
    //   where("doctor", "==", diary.doctor),
    //   where("day", "==", diary.day),
    //   where("specialty", "==", diary.specialty));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   //console.log(doc.id, " => ", doc.data());
    //   const path = this.path +"/"+doc.id;
    //   const docRefFirebase = this.db.doc(path)
    //   docRefFirebase.update({...diary})
    //   //this.diaryRef.doc(doc.id).update({...diary})
    // });
    const path = 'diary'+"/"+diary.id;
    const doc = this.firestore.doc(path)
    doc.update({...diary})
  }

  async delete(diary: any): Promise<void> {
    // const q = query(collection(this.db.firestore, this.path),
    //   where("doctor", "==", diary.doctor),
    //   where("day", "==", diary.day),
    //   where("specialty", "==", diary.specialty));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // console.log(doc.id, " => ", doc.data());
    //   this.diaryRef.doc(doc.id).delete()
    // });
    const path = 'diary' +"/"+diary.id;
    const doc = this.firestore.doc(path)
    doc.delete();
  }
}
