import {Component, OnInit} from '@angular/core';
import {ICurrency} from "../../app-interfaces";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  private url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  exchangeTo: ICurrency = {
    'r030': 980,
    'txt': 'hryvna',
    'rate': 1,
    'cc': 'UAH',
    'exchangedate': new Date().toDateString(),
  }

  exchangeFrom: ICurrency = {
    'r030': 840,
    'txt': 'dollar',
    'rate': NaN,
    'cc': 'USD',
    'exchangedate': new Date().toDateString(),
  }

  constructor(private readonly restApiService: RestApiService) { }

  ngOnInit(): void {
    this.calcTo(840, 980, true);
  }

  calcTo(currencyCodeFrom: number, currencyCodeTo: number, direction: boolean)  {
    this.restApiService.getCurrencyList(this.url).subscribe(currencyList => {
      let currencyValueTo = this.getCurrencyValue(currencyCodeFrom, currencyList);
      let currencyValueFrom = this.getCurrencyValue(currencyCodeTo, currencyList);
      direction ?
          this.exchangeFrom.rate = Math.round(this.exchangeTo.rate / currencyValueTo * currencyValueFrom * 100)/100
        : this.exchangeTo.rate = Math.round(this.exchangeFrom.rate / currencyValueTo * currencyValueFrom * 100)/100
    })
  }

  getCurrencyValue(currencyCode: number, currencyList:ICurrency[]): number {
    if (currencyList.filter((item: ICurrency) => item.r030 == currencyCode).length > 0) {
      return currencyList.filter((item: ICurrency) => item.r030 == currencyCode)[0].rate;
    } else return 1
  }
}
