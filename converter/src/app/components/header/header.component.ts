import { Component, OnInit } from '@angular/core';
import {ICurrency} from "../../app-interfaces";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  euro: ICurrency | undefined;
  dollar: ICurrency | undefined;

  constructor(private readonly restApiService: RestApiService) { }

  ngOnInit(): void {
    this.restApiService.getCurrencyList(this.url).subscribe(currencyList => {
      this.euro = currencyList.filter((item: ICurrency) => item.r030 === 978)[0];
      this.dollar = currencyList.filter((item: ICurrency) => item.r030 === 840)[0];
    })
  }

}
