import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private firestore: Firestore) { }

    getUserProfile(uid: string): Observable<any> {
        const docRef = doc(this.firestore, 'users', uid);
        return from(getDoc(docRef)).pipe(
            map(docSnap => {
                if (docSnap.exists()) {
                    return { ...docSnap.data(), id: docSnap.id };
                }
                return null;
            })
        );
    }

    // Add updateProfile here later
}
