import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@Angular/forms';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { AppComponent } from './app.component';

// --> para configurar o locale em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
// <--

import { AccessModule } from './pages/access/access.module';
import { AplicationErrorHandle } from './config/app.error-handle';
import { AppRoutingModule } from './config/app-routing.module';
import { BlogModule } from './pages/blog/blog.module';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './pages/layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const firebase = {
  apiKey: 'AIzaSyBjDdjd6OkwCZbMJMC-IFWbqA6CfbZfpMs',
    authDomain: 'faecefafor.firebaseapp.com',
    databaseURL: 'https://faecefafor.firebaseio.com',
    projectId: 'faecefafor',
    storageBucket: 'faecefafor.appspot.com',
    messagingSenderId: '77247144900'
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AccessModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ComponentsModule,
    BlogModule,
    HttpModule,
    LayoutModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-Br'},
   // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AplicationErrorHandle},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
