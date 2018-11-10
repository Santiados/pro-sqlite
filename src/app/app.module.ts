import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TaskServiceProvider } from '../providers/task-service/task-service';
import { UsersProvider } from '../providers/users/users';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TaskServiceProvider,
    UsersProvider
  ]
})
export class AppModule {}
