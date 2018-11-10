import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the TaskServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskServiceProvider {
  
  db: SQLiteObject = null;

  constructor() {
    console.log('Hello TaskServiceProvider Provider');
  }

  setDB(dataBase:SQLiteObject):void{
  	if(this.db === null){
  		this.db = dataBase;
  	}
  }
  createTableTasks(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER, userid INTEGER )';
  	console.log('tabla task creada');
    return this.db.executeSql(sql,[]);
  }

  createTask(task: any, user){
  	let sql = 'INSERT INTO tasks (title,completed,userid) VALUES(?,?,?)';
  	return this.db.executeSql(sql, [task.title,task.completed,user.id]);
  }

  deleteTask(task: any){
  	let sql = 'DELETE FROM tasks where id = ?';
  	return this.db.executeSql(sql,[task.id]);
  }

  updateTask(task: any){
  	let sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
  	return this.db.executeSql(sql, [task.completed,task.id]);
  }

  editTask(title:any, id: any){
  	let sql = 'UPDATE tasks SET title = ? WHERE id = ?';
  	return this.db.executeSql(sql,[title, id]);
  }

  getAllTasksOfUser(userId):any{
  	let sql = 'SELECT * FROM tasks WHERE userid = ?';
  	return this.db.executeSql(sql,[userId])
  		.then(response => {
  			let tasks = [];
  			for (var i = 0; i < response.rows.length; i++) {
  				tasks.unshift(response.rows.item(i));
  			}
  			return Promise.resolve(tasks);
  		})
  		.catch(error => {
  			Promise.reject(error);
  		})
  }

  getAll(){
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql,[])
      .then(response => {
        let tasks = [];
        for (var i = 0; i < response.rows.length; i++) {
          tasks.unshift(response.rows.item(i));
        }
        return Promise.resolve(tasks);
      })
      .catch(error => {
        Promise.reject(error);
      })
  }
  deleteBD(){
  	let sql = 'DELETE FROM tasks';
  	return this.db.executeSql(sql,[]);
  }


}
