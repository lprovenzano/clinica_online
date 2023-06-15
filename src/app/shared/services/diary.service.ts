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

  constructor(private db: AngularFirestore) {
    this.diaryRef = db.collection(this.path);
  }

  getAll(): AngularFirestoreCollection<Diary> {
    return this.diaryRef;
  }

  getAllByIdNumber(idNumber: string) {
    setTimeout(() => {
      this.diaryRef.valueChanges().subscribe(x => x.filter(s => JSON.parse(s.doctor).idNumber === idNumber).forEach(x => this.diaries.push(x)));
    }, 3000);
  }

  create(diary: Diary): any {
    return this.diaryRef.add({...diary});
  }

  async update(diary: Diary): Promise<void> {
    const q = query(collection(this.db.firestore, this.path),
      where("doctor", "==", diary.doctor),
      where("day", "==", diary.day),
      where("specialty", "==", diary.specialty));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const path = this.path +"/"+doc.id;
      const docRefFirebase = this.db.doc(path)
      docRefFirebase.update({...diary})
      //this.diaryRef.doc(doc.id).update({...diary})
    });
  }

  async delete(diary: Diary): Promise<void> {
    const q = query(collection(this.db.firestore, this.path),
      where("doctor", "==", diary.doctor),
      where("day", "==", diary.day),
      where("specialty", "==", diary.specialty));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      this.diaryRef.doc(doc.id).delete()
    });
  }

  async getShiftsByStatus(status: string) {
    let shifts: any[] = [];
    const q = query(collection(this.db.firestore, this.path), where("shifts", "array-contains", status));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      shifts.push(doc.data());
    });
    return shifts[0];
  }
}
