import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '../shared/country';
import { ICountry } from '../shared/models/country';

@Component({
  selector: 'app-commpany-list',
  templateUrl: './commpany-list.component.html',
  styleUrls: ['./commpany-list.component.scss']
})
export class CommpanyListComponent {
  public countries: ICountry[] = COUNTRIES.slice();

  addCountry(country: string, capital: string): void{
    if(!country || capital) return;
    this.countries.push({country, capital})
  }

  deleteCountry(countryName: string): void{
    this.countries = this.countries.filter( (country: ICountry) => country.country != countryName);
  }
}
