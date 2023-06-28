import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private firestore: AngularFirestore) { }

  save(collectionName:string, document:any){
    const col = this.firestore.collection(collectionName);
    const id = this.firestore.createId()
    const doc = col.doc(id)
    document.id = id;
    doc.set({...document})
  }

  get(collectionName:string){
    return this.firestore.collection(collectionName).valueChanges();
  }

  update(collectionName:string, document:any){
    const path = collectionName +"/"+document.id;
    const doc = this.firestore.doc(path)
    doc.update({...document})
  }

  delete(collectionName:string, document:any){
    const path = collectionName +"/"+document.id;
    const doc = this.firestore.doc(path)
    doc.delete();
  }
}
