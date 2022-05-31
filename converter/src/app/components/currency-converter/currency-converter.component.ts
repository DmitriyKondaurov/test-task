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
  exchangeValue: ICurrency =
    {
      'r030': 980,
      'txt': 'UAH',
      'rate': 1,
      'cc': 'string',
      'exchangedate': new Date().toDateString(),
    };

  exchangeTo: ICurrency = {
    'r030': 980,
    'txt': 'гривня',
    'rate': 1,
    'cc': 'UAH',
    'exchangedate': new Date().toDateString(),
  }

  exchangeFrom: ICurrency = {
    'r030': NaN,
    'txt': '',
    'rate': 0,
    'cc': '',
    'exchangedate': new Date().toDateString(),
  }

  constructor(private readonly restApiService: RestApiService) { }

  ngOnInit(): void {
    this.calcTo(978, 1);
  }

  calcTo(currencyCodeFrom: number, currencyCodeTo: number)  {
    this.restApiService.getCurrencyList(this.url).subscribe(currencyList => {
      let currencyValue = currencyList.filter((item: ICurrency) => item.r030 === currencyCodeFrom)[0].rate;
      this.exchangeFrom.rate = currencyValue * this.exchangeTo.rate;
      this.exchangeFrom.r030 = currencyCodeFrom;
    })
  }

  calcFrom()  {
    this.restApiService.getCurrencyList(this.url).subscribe(currencyList => {
      let currencyValueTo = 0;
      let currencyValueFrom = 0;

      if (currencyList.filter((item: ICurrency) => item.r030 == this.exchangeTo.r030).length > 0) {
        currencyValueTo = currencyList.filter((item: ICurrency) => item.r030 == this.exchangeTo.r030)[0].rate;
      } else currencyValueTo = 1

      if (currencyList.filter((item: ICurrency) => item.r030 == this.exchangeFrom.r030).length > 0) {
        currencyValueFrom = currencyList.filter((item: ICurrency) => item.r030 == this.exchangeFrom.r030)[0].rate;
      } else currencyValueFrom = 1

      this.exchangeTo.rate = Math.round(this.exchangeFrom.rate * currencyValueTo * currencyValueFrom * 100)/100;
    })
  }

}
