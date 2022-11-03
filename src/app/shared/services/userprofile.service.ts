import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Userprofile} from "../class/userprofile";
import { collection, query, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  private path = 'user-profile'
  userProfileRef: AngularFirestoreCollection<Userprofile>;

  constructor(private db: AngularFirestore) {
    this.userProfileRef = db.collection(this.path);
  }

  getAll(): AngularFirestoreCollection<Userprofile> {
    return this.userProfileRef;
  }

  create(userProfile: Userprofile): any {
    return this.userProfileRef.add({...userProfile});
  }

  async update(idNumber: string, userProfile: Userprofile): Promise<void> {
    const q = query(collection(this.db.firestore, this.path), where("idNumber", "==", idNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      this.userProfileRef.doc(doc.id).update(userProfile)
    });
  }

  async delete(idNumber: string, userProfile: Userprofile): Promise<void> {
    const q = query(collection(this.db.firestore, this.path), where("idNumber", "==", idNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      this.userProfileRef.doc(doc.id).delete()
    });
  }

  async getById(id: string) {
    let userProfile: any[] = [];
    const q = query(collection(this.db.firestore, this.path), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      userProfile.push(doc.data());
    });
    return userProfile[0]
  }

  async getByIdNumber(idNumber: string) {
    let userProfile: any[] = [];
    const q = query(collection(this.db.firestore, this.path), where("idNumber", "==", idNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      userProfile.push(doc.data());
    });
    return userProfile[0]
  }

  get getLoggedProfile(){
    return JSON.parse(localStorage.getItem('user-profile')!);
  }
}
