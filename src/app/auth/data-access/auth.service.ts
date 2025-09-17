import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInWithGoogle() {
    throw new Error('Method not implemented.');
  }

  private _auth = inject(Auth);

  singUp (user: User){
    return createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }
  singIn(user: User){
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }
  singInWithGoogle(){
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this._auth, provider);
  } 
}
