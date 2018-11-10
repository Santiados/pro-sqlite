webpackJsonp([1],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_task_service_task_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_users_users__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
* Generated class for the UserProfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var UserProfilePage = /** @class */ (function () {
    function UserProfilePage(navCtrl, alertCtrl, taskService, nav, userProvider) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.taskService = taskService;
        this.nav = nav;
        this.userProvider = userProvider;
        this.tasks = [];
        this.logs = [];
        this.userData = {
            username: '',
            userid: ''
        };
        this.dataParams = this.nav['rootParams'];
    }
    UserProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userData = this.nav.get('userdata');
        this.getAllTasks(this.userData.id);
        this.navbar.backButtonClick = function () {
            _this.logOut();
            _this.navCtrl.pop();
        };
        // this.getAll();
    };
    UserProfilePage.prototype.logOut = function () {
        this.userProvider.logOut();
    };
    UserProfilePage.prototype.getAll = function () {
        var _this = this;
        this.taskService.getAll()
            .then(function (tasks) {
        })
            .catch(function (error) {
            _this.logs.push(error.message);
        });
    };
    UserProfilePage.prototype.getAllTasks = function (id) {
        var _this = this;
        this.taskService.getAllTasksOfUser(id)
            .then(function (tasks) {
            _this.tasks = tasks;
            console.log(tasks);
        })
            .catch(function (error) {
            _this.logs.push(error.message);
        });
    };
    UserProfilePage.prototype.deleteAll = function () {
        var _this = this;
        this.taskService.deleteBD()
            .then(function (resp) {
            _this.tasks = [];
            _this.logs.push('DEL ALL');
        })
            .catch(function (error) {
            _this.logs.push(error.message);
        });
    };
    UserProfilePage.prototype.showInfoAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: 'Debes poner algo',
            cssClass: 'danger',
            buttons: [
                {
                    text: 'Vale'
                }
            ]
        });
        alert.present();
    };
    UserProfilePage.prototype.updateTask = function (task, index) {
        var _this = this;
        task = Object.assign({}, task);
        task.completed = !task.completed;
        this.taskService.updateTask(task)
            .then(function (response) {
            _this.tasks[index] = task;
            _this.logs.push('Update: tarea ' + task.title);
        })
            .catch(function (error) {
            _this.logs.push(error.message);
        });
    };
    UserProfilePage.prototype.deleteTask = function (task, index) {
        var _this = this;
        this.taskService.deleteTask(task)
            .then(function (response) {
            _this.logs.push('DEL: tarea ');
            _this.tasks.splice(index, 1);
        })
            .catch(function (error) {
            _this.logs.push(error.message);
        });
    };
    UserProfilePage.prototype.editTask = function (task, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function () {
                        console.log('edit canceled');
                    }
                },
                {
                    text: 'Cambiar',
                    handler: function (data) {
                        if (data.title.trim() == '') {
                            _this.showInfoAlert();
                        }
                        else {
                            _this.taskService.editTask(data.title, task.id)
                                .then(function (response) {
                                _this.tasks[index].title = data.title;
                                _this.logs.push('EDIT: tarea ' + data.title);
                            })
                                .catch(function (error) {
                                _this.logs.push(error.message);
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    UserProfilePage.prototype.openAdder = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            cssClass: 'reder',
            title: 'Crear tarea',
            message: 'Escribe el nombre de la nueva tarea',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Nombre nueva tarea'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('NANAI');
                    }
                },
                {
                    text: 'Crear',
                    handler: function (data) {
                        if (data.title.trim() == '') {
                            _this.showInfoAlert();
                        }
                        else {
                            console.log('Add: tarea ' + data.title);
                            data.completed = false;
                            _this.taskService.createTask(data, _this.userData)
                                .then(function (task) {
                                _this.tasks.unshift(data);
                            })
                                .catch(function (error) {
                                console.log(error.message);
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('navbar'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Navbar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Navbar */]) === "function" && _a || Object)
    ], UserProfilePage.prototype, "navbar", void 0);
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"C:\Users\makrokevin-sensation\Desktop\DAW\SEGUNDO CURSO DAW\PROYECTO\ionic\pro-sqlite\src\pages\user-profile\user-profile.html"*/'\n<ion-header>\n  <ion-navbar color="primary"#navbar>\n  	<button ion-button menuToggle>\n      	<ion-icon name="menu"></ion-icon>\n  	</button>\n    <ion-title>\n      Tareas de {{userData.username}}\n    </ion-title>\n    <ion-buttons right>\n    	<button ion-button round (click)="openAdder()" color="light">\n    		<ion-icon name="add-circle"></ion-icon>\n    	</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-nav [root]="rootPage" [rootParams]="rootPageParams"></ion-nav>\n<ion-content padding>\n<ion-list>\n	<ion-item *ngIf="tasks == 0">\n		No hay ninguna tarea aún\n	</ion-item>\n	<ion-item-sliding *ngFor="let task of tasks; let i = index">\n		<ion-item>\n			<ion-label>{{task.title}}</ion-label>\n			<ion-checkbox (ionChange)="updateTask(task, i)" [checked]="task.completed"></ion-checkbox>\n		</ion-item>\n		<ion-item-options side="right" icon-left>\n			<ion-buttons>\n				<button ion-button round (click)="editTask(task,i)">\n				<ion-icon name="settings" icon-left></ion-icon>\n				</button>\n				<button ion-button round color="danger" (click)="deleteTask(task,i)">\n					<ion-icon name="trash" icon-left></ion-icon>\n				</button>\n			</ion-buttons>\n		</ion-item-options>\n	</ion-item-sliding>\n</ion-list>\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\makrokevin-sensation\Desktop\DAW\SEGUNDO CURSO DAW\PROYECTO\ionic\pro-sqlite\src\pages\user-profile\user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_task_service_task_service__["a" /* TaskServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_task_service_task_service__["a" /* TaskServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_users__["a" /* UsersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_users__["a" /* UsersProvider */]) === "function" && _f || Object])
    ], UserProfilePage);
    return UserProfilePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/user-profile/user-profile.module": [
		272,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_users_users__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_user_profile_user_profile__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, userProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.userProvider = userProvider;
        this.alertCtrl = alertCtrl;
        this.userData = {
            username: '',
            password: ''
        };
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.getUserLoged();
    };
    HomePage.prototype.getUserLoged = function () {
        var _this = this;
        this.userProvider.getUserInMemory()
            .then(function (response) {
            if (response != undefined) {
                _this.userProvider.getUserById(response.userid)
                    .then(function (user) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_user_profile_user_profile__["a" /* UserProfilePage */], {
                        userdata: user
                    });
                })
                    .catch(function (error) { return console.log(error.message); });
            }
        })
            .catch(function (error) { return console.error(error.message); });
    };
    HomePage.prototype.getUserByCredentials = function () {
        var _this = this;
        this.userProvider.getUserByCredentials(this.userData)
            .then(function (response) {
            if (response == undefined) {
                _this.showWarningAlert('Credenciales Incorrectas');
            }
            else {
                _this.userProvider.setUserInMemory(response);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_user_profile_user_profile__["a" /* UserProfilePage */], {
                    userdata: response
                });
            }
        })
            .catch(function (error) { return error.message; });
        // this.navCtrl.push(UserProfilePage,{
        //   'userdata':this.userData
        // })
    };
    HomePage.prototype.createUser = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Vas a crear una cuenta',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Pon algo',
                    type: 'text'
                },
                {
                    name: 'password',
                    placeholder: 'Pon una contra',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('cancelado crear usuario');
                    }
                },
                {
                    text: 'Crear',
                    handler: function (data) {
                        _this.userProvider.createUser(data)
                            .then(function (response) {
                            _this.userData = data;
                        })
                            .catch(function (e) { return console.log(e.message); });
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.showWarningAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: msg,
            buttons: [
                {
                    text: 'Okey'
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('navbar'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Navbar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Navbar */]) === "function" && _a || Object)
    ], HomePage.prototype, "navBar", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\makrokevin-sensation\Desktop\DAW\SEGUNDO CURSO DAW\PROYECTO\ionic\pro-sqlite\src\pages\home\home.html"*/'\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Lobby\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-nav #mycontent [root]="rootPage"></ion-nav>\n<ion-content padding>\n<form>\n	<ion-item>\n		<ion-input type="text" placeholder="Escribe tu nombre" name="username" [(ngModel)]="userData.username" ></ion-input>\n	</ion-item>\n	<ion-item>\n		<ion-input type="password" placeholder="Escribe tu pass" name="password" [(ngModel)]="userData.password" ></ion-input>\n	</ion-item>\n</form>\n	<button ion-button (click)="getUserByCredentials()" left round full margin-bottom>\n		Entrar\n	</button>\n	<button ion-button (click)="createUser()" right color="secondary" full>\n		Registrarme\n	</button>\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\makrokevin-sensation\Desktop\DAW\SEGUNDO CURSO DAW\PROYECTO\ionic\pro-sqlite\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_users__["a" /* UsersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_users__["a" /* UsersProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_user_profile_user_profile__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_task_service_task_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_users_users__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_user_profile_user_profile__["a" /* UserProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/user-profile/user-profile.module#UserProfilePageModule', name: 'UserProfilePage', segment: 'user-profile', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_user_profile_user_profile__["a" /* UserProfilePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__["a" /* SQLite */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_task_service_task_service__["a" /* TaskServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_users_users__["a" /* UsersProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_task_service_task_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_users_users__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, sqlite, taskService, usersService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.sqlite = sqlite;
        this.taskService = taskService;
        this.usersService = usersService;
        this.rootPage = null;
        this.rootParams = null;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (_this.platform.is('android')) {
                _this.statusBar.styleLightContent();
            }
            else {
                _this.statusBar.styleDefault();
            }
            // this.destroyDB();
            _this.createDB();
        });
    }
    MyApp.prototype.createDB = function () {
        var _this = this;
        this.sqlite.create({
            name: 'mio',
            location: 'default'
        })
            .then(function (db) {
            console.log('DB created');
            _this.taskService.setDB(db);
            _this.usersService.setDB(db);
            _this.taskService.createTableTasks();
            _this.usersService.createTableUserInCookie();
            _this.usersService.createTableUsers();
        })
            .then(function () {
            _this.splashScreen.hide();
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    MyApp.prototype.destroyDB = function () {
        this.sqlite.deleteDatabase({ name: 'mio', location: 'default' });
        console.log('db deleted');
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\makrokevin-sensation\Desktop\DAW\SEGUNDO CURSO DAW\PROYECTO\ionic\pro-sqlite\src\app\app.html"*/'<ion-nav [root]="rootPage" [rootParams]="rootParams"></ion-nav>\n'/*ion-inline-end:"C:\Users\makrokevin-sensation\Desktop\DAW\SEGUNDO CURSO DAW\PROYECTO\ionic\pro-sqlite\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__providers_task_service_task_service__["a" /* TaskServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_task_service_task_service__["a" /* TaskServiceProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__providers_users_users__["a" /* UsersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_users_users__["a" /* UsersProvider */]) === "function" && _f || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsersProvider = /** @class */ (function () {
    function UsersProvider() {
        this.db = null;
        console.log('Hello UsersProvider Provider');
    }
    UsersProvider.prototype.setDB = function (dataBase) {
        if (this.db === null) {
            this.db = dataBase;
        }
    };
    UsersProvider.prototype.createTableUserInCookie = function () {
        var sql = 'CREATE TABLE IF NOT EXISTS userloged (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT, userid INTEGER)';
        return this.db.executeSql(sql, []);
    };
    UsersProvider.prototype.getUserInMemory = function () {
        var sql = 'SELECT * FROM userloged';
        return this.db.executeSql(sql, [])
            .then(function (response) {
            return Promise.resolve(response.rows.item(0));
        })
            .catch(function (error) { return console.log(error.message); });
    };
    UsersProvider.prototype.setUserInMemory = function (userData) {
        var sql = 'INSERT INTO userloged (username,password,userid) VALUES(?,?,?)';
        return this.db.executeSql(sql, [userData.username, userData.password, userData.id]);
    };
    UsersProvider.prototype.createTableUsers = function () {
        var sql = 'CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)';
        console.log('tabla usuarios creada');
        return this.db.executeSql(sql, []);
    };
    UsersProvider.prototype.createUser = function (userData) {
        var sql = 'INSERT INTO users (username,password) VALUES(?,?)';
        return this.db.executeSql(sql, [userData.username, userData.password]);
    };
    UsersProvider.prototype.getUserByCredentials = function (userData) {
        var sql = 'SELECT * FROM users WHERE username = ? and password = ?';
        return this.db.executeSql(sql, [userData.username, userData.password])
            .then(function (response) {
            return Promise.resolve(response.rows.item(0));
        })
            .catch(function (error) { return console.log(error.message); });
    };
    UsersProvider.prototype.getUserById = function (id) {
        var sql = 'SELECT * FROM users WHERE id = ?';
        return this.db.executeSql(sql, [id])
            .then(function (response) {
            return Promise.resolve(response.rows.item(0));
        })
            .catch(function (error) { return console.log(error.message); });
    };
    UsersProvider.prototype.logOut = function () {
        var sql = 'DELETE FROM userloged';
        return this.db.executeSql(sql, []);
    };
    UsersProvider.prototype.ionViewWillLeave = function () {
        console.log('adios');
    };
    UsersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UsersProvider);
    return UsersProvider;
}());

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the TaskServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var TaskServiceProvider = /** @class */ (function () {
    function TaskServiceProvider() {
        this.db = null;
        console.log('Hello TaskServiceProvider Provider');
    }
    TaskServiceProvider.prototype.setDB = function (dataBase) {
        if (this.db === null) {
            this.db = dataBase;
        }
    };
    TaskServiceProvider.prototype.createTableTasks = function () {
        var sql = 'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER, userid INTEGER )';
        console.log('tabla task creada');
        return this.db.executeSql(sql, []);
    };
    TaskServiceProvider.prototype.createTask = function (task, user) {
        var sql = 'INSERT INTO tasks (title,completed,userid) VALUES(?,?,?)';
        return this.db.executeSql(sql, [task.title, task.completed, user.id]);
    };
    TaskServiceProvider.prototype.deleteTask = function (task) {
        var sql = 'DELETE FROM tasks where id = ?';
        return this.db.executeSql(sql, [task.id]);
    };
    TaskServiceProvider.prototype.updateTask = function (task) {
        var sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
        return this.db.executeSql(sql, [task.completed, task.id]);
    };
    TaskServiceProvider.prototype.editTask = function (title, id) {
        var sql = 'UPDATE tasks SET title = ? WHERE id = ?';
        return this.db.executeSql(sql, [title, id]);
    };
    TaskServiceProvider.prototype.getAllTasksOfUser = function (userId) {
        var sql = 'SELECT * FROM tasks WHERE userid = ?';
        return this.db.executeSql(sql, [userId])
            .then(function (response) {
            var tasks = [];
            for (var i = 0; i < response.rows.length; i++) {
                tasks.unshift(response.rows.item(i));
            }
            return Promise.resolve(tasks);
        })
            .catch(function (error) {
            Promise.reject(error);
        });
    };
    TaskServiceProvider.prototype.getAll = function () {
        var sql = 'SELECT * FROM tasks';
        return this.db.executeSql(sql, [])
            .then(function (response) {
            var tasks = [];
            for (var i = 0; i < response.rows.length; i++) {
                tasks.unshift(response.rows.item(i));
            }
            return Promise.resolve(tasks);
        })
            .catch(function (error) {
            Promise.reject(error);
        });
    };
    TaskServiceProvider.prototype.deleteBD = function () {
        var sql = 'DELETE FROM tasks';
        return this.db.executeSql(sql, []);
    };
    TaskServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], TaskServiceProvider);
    return TaskServiceProvider;
}());

//# sourceMappingURL=task-service.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map