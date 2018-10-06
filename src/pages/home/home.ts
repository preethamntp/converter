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
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public currencyService: CurencyApiProvider) {
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

    this.currencyService.getCurrencyRate().subscribe(data => {
      localStorage.setItem('currencies', JSON.stringify(data));
      var currencies = JSON.parse(localStorage.getItem('currencies'));
      reqObj.currencyValue = ((reqObj.currencyValue * currencies.rates[reqObj.currencyFrom]) / currencies.rates[reqObj.currencyTo])
      console.log(reqObj.currencyValue);
      this.value = reqObj.currencyValue;
    });
  }
}
