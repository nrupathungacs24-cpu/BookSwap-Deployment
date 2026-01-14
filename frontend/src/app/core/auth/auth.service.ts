import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user$: Observable<User | null>;

    constructor(private afAuth: AngularFireAuth) {
        this.user$ = afAuth.authState.pipe(
            map(user => {
                if (user) {
                    return {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        emailVerified: user.emailVerified
                    } as User;
                }
                return null;
            })
        );
    }

    async register(email: string, password: string): Promise<firebase.auth.UserCredential | null> {
        try {
            const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return userCredential;
        } catch (error) {
            console.error('Registration error:', error);
            throw error; // Throw so component handles UI
        }
    }

    async login(email: string, password: string): Promise<firebase.auth.UserCredential | null> {
        try {
            const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
            return userCredential;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    isAuthenticated(): boolean {
        return !!this.afAuth.currentUser;
    }

    getCurrentUser() {
        return this.afAuth.currentUser;
    }

    async getIdToken(): Promise<string | null> {
        const user = await this.afAuth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        return null;
    }

    signOut(): Promise<void> {
        return this.afAuth.signOut();
    }
}
