import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';

import { TaskServiceProvider } from '../../providers/task-service/task-service';
import { UsersProvider } from '../../providers/users/users';

/**
* Generated class for the UserProfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-user-profile',
	templateUrl: 'user-profile.html',
})
export class UserProfilePage {

	@ViewChild('navbar') navbar: Navbar;
	tasks: any[] = [];
	logs: any[] = [];
	userData: any = {
		username:'',
		userid:''
	};

	dataParams: any = this.nav['rootParams'];

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		public taskService: TaskServiceProvider,
		private nav: NavParams,
		private userProvider: UsersProvider
		) {}

	ionViewDidLoad(){
		this.userData = this.nav.get('userdata');
		this.getAllTasks(this.userData.id);
		 this.navbar.backButtonClick = () => {
	      this.logOut();
	      this.navCtrl.pop();
	    };
	    // this.getAll();
	}

	

	



    logOut(){
     this.userProvider.logOut();
    }

    getAll(){
    	this.taskService.getAll()
    	.then(tasks => {
			
		})
		.catch( error => {
			this.logs.push(error.message);
		});
    }


	getAllTasks(id:any){
		this.taskService.getAllTasksOfUser(id)
		.then(tasks => {
			this.tasks = tasks;
			console.log(tasks)
		})
		.catch( error => {
			this.logs.push(error.message);
		});
	}

	deleteAll(){
		this.taskService.deleteBD()
		.then(resp => {
			this.tasks = [];
			this.logs.push('DEL ALL');
		})
		.catch(error => {
			this.logs.push(error.message);
		})
	}

	showInfoAlert(){
		let alert = this.alertCtrl.create({
			title: 'Ops',
			subTitle: 'Debes poner algo',
			cssClass: 'danger',
			buttons:[
			{
				text:'Vale'
			}
			]
		});
		alert.present();
	}

	updateTask(task, index){
		task = Object.assign({}, task);
		task.completed = !task.completed;
		this.taskService.updateTask(task)
		.then(response => {
			this.tasks[index] = task;
			this.logs.push('Update: tarea ' + task.title);
		})
		.catch(error => {
			this.logs.push(error.message);
		})
	}

	deleteTask(task, index){
		this.taskService.deleteTask(task)
		.then(response => {
			this.logs.push('DEL: tarea ');
			this.tasks.splice(index,1);
		})
		.catch(error => {
			this.logs.push(error.message);
		})
	}

	editTask(task, index){
		let alert = this.alertCtrl.create({
			title: 'Editar tarea ',
			message: 'Cambia lo que quieras',
			inputs: [
			{
				name: 'title',
				placeholder: task.title
			}
			],
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {
					console.log('edit canceled')
				}
			},
			{
				text: 'Cambiar',
				handler: (data) => {
					if(data.title.trim() == ''){
						this.showInfoAlert();
					}else {
						this.taskService.editTask(data.title,task.id)
						.then(response => {
							this.tasks[index].title = data.title;
							this.logs.push('EDIT: tarea '+data.title);
						})
						.catch((error)=>{ 
							this.logs.push(error.message)
						})
					}
				}
			}
			]
		});
		alert.present();
	}

	openAdder(){
		let alert = this.alertCtrl.create({
			cssClass: 'reder',
			title: 'Crear tarea',
			message: 'Escribe el nombre de la nueva tarea',
			inputs: [
			{
				name:'title',
				placeholder: 'Nombre nueva tarea'
			}
			],
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {
					console.log('NANAI');
				}
			},
			{
				text: 'Crear',
				handler: (data) => {
					if(data.title.trim() == ''){
						this.showInfoAlert();
					}else {
						console.log('Add: tarea ' + data.title)
						data.completed = false;
						this.taskService.createTask(data,this.userData)
						.then(task => {
							this.tasks.unshift(data);
						})
						.catch(error => {
							console.log(error.message)
						});
					}
				}
			}
			]

		});
		alert.present()
	}


}
