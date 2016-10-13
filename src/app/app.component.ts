import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, SQLite } from 'ionic-native';
//import {ionicBootstrap} from '@angular/core';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
      platform.ready().then(() => {
          StatusBar.styleDefault();
          let db = new SQLite();
          db.openDatabase({
              name: "data.db",
              location: "default"
          }).then(() => {
              db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
                  console.log("TABLE CREATED: ", data);
              }, (error) => {
                  console.error("Unable to execute sql", error);
              })
          }, (error) => {
              console.error("Unable to open database", error);
          });
      });
  }
}

//ionicBootstrap(MyApp);
