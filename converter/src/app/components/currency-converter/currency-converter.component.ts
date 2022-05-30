import {Component, OnInit} from '@angular/core';
import {ICurrency, ICurrencyItem} from "../../app-interfaces";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  private url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  euro: ICurrency | undefined;
  dollar: ICurrency | undefined;
  exchangeTo: ICurrencyItem = {
    amount: 1,
    currency: 980
  };
  exchangeFrom: ICurrencyItem = {
    amount: 1,
    currency: 840
  };
  constructor(private readonly restApiService: RestApiService) { }

  ngOnInit(): void {
    this.restApiService.getCurrencyList(this.url).subscribe(currencyList => {
      this.euro = currencyList.filter((item: ICurrency) => item.r030 === 978)[0];
      this.dollar = currencyList.filter((item: ICurrency) => item.r030 === 840)[0];
    })
  }

}
