import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  
  db: SQLiteObject = null;

  constructor() {
    console.log('Hello UsersProvider Provider');
  }

  

  setDB(dataBase:SQLiteObject):void{
  	if(this.db === null){
  		this.db = dataBase;
  	}
  }

  createTableUserInCookie(){
    let sql = 'CREATE TABLE IF NOT EXISTS userloged (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, userid INTEGER)';
    return this.db.executeSql(sql,[]);
  }

  getUserInMemory(){
    let sql = 'SELECT * FROM userloged';
    return this.db.executeSql(sql,[])
    .then(response => {
        return Promise.resolve(response.rows.item(0));
      })
      .catch(error => console.log(error.message));
  }

  setUserInMemory(userData){
    let sql = 'INSERT INTO userloged (username,password,userid) VALUES(?,?,?)';
    return this.db.executeSql(sql,[userData.username,userData.password,userData.id]);
  }

  createTableUsers(){
    let sql = 'CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)';
    console.log('tabla usuarios creada');
    return this.db.executeSql(sql,[]);
  }

  createUser(userData){
  	let sql = 'INSERT INTO users (username,password) VALUES(?,?)';
  	return this.db.executeSql(sql,[userData.username,userData.password]);
  }

  getUserByCredentials(userData){
  	let sql = 'SELECT * FROM users WHERE username = ? and password = ?';
  	return this.db.executeSql(sql,[userData.username,userData.password])
  		.then(response => {
  			return Promise.resolve(response.rows.item(0));
  		})
  		.catch(error => console.log(error.message));
  }

  getUserById(id){
    let sql = 'SELECT * FROM users WHERE id = ?';
    return this.db.executeSql(sql,[id])
      .then(response => {
        return Promise.resolve(response.rows.item(0));
      })
      .catch(error => console.log(error.message));
  }

  logOut(){
    let sql = 'DELETE FROM userloged';
    return this.db.executeSql(sql,[]);
  }

  ionViewWillLeave(){
    console.log('adios')
  }
}
