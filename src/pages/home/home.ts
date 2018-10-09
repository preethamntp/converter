import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CurencyApiProvider } from '../../providers/curency-api/curency-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private converterForm: FormGroup;
  value: any;
  currencies: any;
  items: any;
  countries: any;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public currencyService: CurencyApiProvider) {
    this.getCountryList();
    this.converterForm = this.formBuilder.group({
      currencyValue: ['', Validators.required],
      currencyFrom: ['', Validators.required],
      currencyTo: ['', Validators.required]
    });
  }
  convert() {
    let reqObj = {
      currencyFrom: this.converterForm.value.currencyFrom,
      currencyTo: this.converterForm.value.currencyTo,
      currencyValue: this.converterForm.value.currencyValue
    }
    if (!(JSON.parse(localStorage.getItem('currencies')))) {
      this.currencyService.getCurrencyRate().subscribe(data => {
        localStorage.setItem('currencies', JSON.stringify(data));
        var currencies = JSON.parse(localStorage.getItem('currencies'));
        reqObj.currencyValue = ((reqObj.currencyValue * currencies.rates[reqObj.currencyTo]) / currencies.rates[reqObj.currencyFrom])
        console.log(reqObj.currencyValue);
        this.value = reqObj.currencyValue;
      });
    }
    else if (JSON.parse(localStorage.getItem('currencies'))) {
      var currencies = JSON.parse(localStorage.getItem('currencies'));
      reqObj.currencyValue = ((reqObj.currencyValue * currencies.rates[reqObj.currencyTo]) / currencies.rates[reqObj.currencyFrom])
      console.log(reqObj.currencyValue);
      this.value = reqObj.currencyValue;
    }
  }
  doRefresh(event) {
    console.log('Begin async operation', event);

    setTimeout(() => {
      console.log('Async operation has ended');
      localStorage.removeItem('currencies')
      event.complete();
    }, 2000);
  }
  getCountryList() {
    this.currencyService.getCuntriesList().subscribe(response => {
      this.items = response;
    });
  }

  // getItems(ev: any) {
  //   this.currencyService.getCuntriesList().subscribe(response => {
  //     this.countries = response;

  //     let val = ev.target.value;

  //     if (val && val.trim() != '') {
  //       this.countries = this.countries.filter((country) => {
  //         return (country.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //       })
  //     }
  //   });
  // }

  // itemSelected(item) {
  //   this.items = item;
  //   this.converterForm
  // }
}
