import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"ng-task-18-dce00","appId":"1:692748331775:web:bf0a84afc53c69bf51baca","storageBucket":"ng-task-18-dce00.firebasestorage.app","apiKey":"AIzaSyAQGj18ez03yog2kKapllVhpLX9kHK7-oU","authDomain":"ng-task-18-dce00.firebaseapp.com","messagingSenderId":"692748331775"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
