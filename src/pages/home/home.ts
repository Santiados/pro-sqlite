import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController, Navbar} from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';

import { UserProfilePage } from '../../pages/user-profile/user-profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('navbar') navBar: Navbar;
  userData: any = {
    username: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    private userProvider: UsersProvider, 
    public alertCtrl: AlertController
    ){
      
  }

  ionViewDidLoad(){
    this.getUserLoged();
  }



  getUserLoged(){
    this.userProvider.getUserInMemory()
    .then(response => {
      if(response != undefined){
          this.userProvider.getUserById(response.userid)
          .then(user => {
            this.navCtrl.push(UserProfilePage,{
              userdata: user
            })
          })
          .catch(error => console.log(error.message))
      }
    })
    .catch( error => console.error(error.message))
  }

  getUserByCredentials(){
    this.userProvider.getUserByCredentials(this.userData)
    .then(response => {
      if (response == undefined) {
        this.showWarningAlert('Credenciales Incorrectas');
      }else {
        this.userProvider.setUserInMemory(response);
        this.navCtrl.push(UserProfilePage,{
          userdata: response
        });
      }
    })
    .catch(error => error.message)
    // this.navCtrl.push(UserProfilePage,{
    //   'userdata':this.userData
    // })
  }

  createUser(){
    let alert = this.alertCtrl.create({
      title: 'Vas a crear una cuenta',
      inputs: [
        {
          name:'username',
          placeholder: 'Pon algo',
          type: 'text'
        },
        {
          name:'password',
          placeholder:'Pon una contra',
          type: 'password'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          handler: () => {
            console.log('cancelado crear usuario')
          }
        },
        {
          text:'Crear',
          handler: (data) =>{
            this.userProvider.createUser(data)
            .then(response => {
              this.userData = data
            })
            .catch(e=>console.log(e.message))
          }
        }
      ]
    });
    alert.present();
  }

  showWarningAlert(msg){
    let alert = this.alertCtrl.create({
      title: 'Ops',
      subTitle: msg,
      buttons:[
        {
          text: 'Okey'
        }
      ]
    });

    alert.present()
  }
}
