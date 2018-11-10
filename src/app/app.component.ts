import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { SQLite } from '@ionic-native/sqlite';
import { TaskServiceProvider } from '../providers/task-service/task-service';
import { UsersProvider } from '../providers/users/users';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;
  rootParams: any = null;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    public sqlite: SQLite,
    private taskService: TaskServiceProvider,
    private usersService: UsersProvider
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('android')){
        this.statusBar.styleLightContent();
      }else {
        this.statusBar.styleDefault();
      }
      // this.destroyDB();
      this.createDB();
    });
  }


  createDB(){
    this.sqlite.create({
      name: 'mio',
      location: 'default'
    })
    .then((db)=>{
      console.log('DB created')
      this.taskService.setDB(db);
      this.usersService.setDB(db);
      this.taskService.createTableTasks();
      this.usersService.createTableUserInCookie();
      this.usersService.createTableUsers();
    })
    .then(()=>{
      this.splashScreen.hide();
      this.rootPage = HomePage;
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  destroyDB(){
    this.sqlite.deleteDatabase({name:'mio',location:'default'});
    console.log('db deleted');
  }
}

