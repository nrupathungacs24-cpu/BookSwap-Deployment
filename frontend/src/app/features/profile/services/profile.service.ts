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
        const userRef = collection(this.firestore, 'users');
        const q = query(userRef, where('userUID', '==', uid));

        return from(getDocs(q)).pipe(
            map(snapshot => {
                if (snapshot.empty) return null;
                return { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
            })
        );
    }

    // Add updateProfile here later
}
