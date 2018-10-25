import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { timeout } from 'rxjs/operator/timeout';
import { NavParams, NavController } from 'ionic-angular';
import { ColdObservable } from 'rxjs/testing/ColdObservable';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html'

})
export class TabsPage {

  // tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = ContactPage;
  onclickCurr: boolean = false;
  onclickSi: boolean = false;
  constructor(public navParams: NavParams, public navCtrl: NavController) {

  }
  helloWorld() {
    console.log("hello")
    this.onclickCurr = !this.onclickCurr;
    setTimeout(() => {
      this.onclickCurr = !this.onclickCurr;
      this.navCtrl.push(HomePage)
    }, 100)
  }
  helloSiUnits() {
    console.log("hello")
    this.onclickSi = !this.onclickSi;
    setTimeout(() => {
      this.onclickSi = !this.onclickSi;
      this.navCtrl.push(ContactPage)
    }, 100)
  }
}
