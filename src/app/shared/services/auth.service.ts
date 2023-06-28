import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import * as auth from 'firebase/auth';
import {UserprofileService} from "./userprofile.service";
import {ImagestorageService} from "./imagestorage.service";
import Swal from "sweetalert2";
import {ImageServiceService} from "./image-service.service";
import { LogService } from './log.service';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private userProfileService: UserprofileService,
    private imageStorage: ImagestorageService,
    private imageService: ImageServiceService,
    private log: LogService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe(async (user) => {
          if (user) {
            if (user.emailVerified) {
              let userImages: any[] = [];
              this.imageStorage.getImagesById(user.uid).then(async i => {
                const userProfile = await this.userProfileService.getById(user.uid);
                userProfile.profilePhotos = i;
                userImages.push(i)
                setTimeout(() => {
                  if (userProfile.approved) {
                    const now = moment().format().toString()
                    let log = {user: user.uid, idNumber: userProfile.idNumber, date: now}
                    this.log.save('user-metrics', log)
                    this.imageService.create({idNumber: userProfile.idNumber, images: JSON.stringify(userImages)});
                    localStorage.setItem('user-profile', JSON.stringify(userProfile));
                    this.router.navigate(['/clinic'])
                  } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('user-profile');
                    this.router.navigate(['/not-approved'])
                  }
                }, 1000);
              })
            } else {
              this.router.navigate(['/verify-email']);
            }
          }
        });
      })
      .catch((error) => {
        let message;
        if (error.message.includes('auth/user-not-found') || error.message.includes('auth/wrong-password')) {
          message = 'Usuario inválido'
        } else {
          message = error.message;
        }
        Swal.fire(
          'Ups!',
          message,
          'error'
        );
      });
  }


  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire(
          'Ups!',
          error.message,
          'error'
        );
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        Swal.fire(
          'Ups!',
          error.message,
          'error'
        );
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  get loggedUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire(
          'Ups!',
          error.message,
          'error'
        );
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('user-profile');
      this.router.navigate(['/login']);
    });
  }
}
