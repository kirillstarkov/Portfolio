import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { ICounterEvent } from './counter/shared/models/counter-event.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('button', {static: true}) public toggleButton: ElementRef<any> | undefined;
  @ViewChildren(CounterComponent) public counters: QueryList<CounterComponent> | undefined; 

  public title = 'components';
  public show: boolean = true;

 public toggleCounters(): void{    
    this.show = !this.show;
  }

  public onChangeValue(event: ICounterEvent): void {
    console.log(event.value, 'from COUNTER' + event.name); 
  }

  public ngOnInit(): void {
    console.log(this.toggleButton?.nativeElement);
    
  }

  public ngAfterViewInit(): void{
    console.log(this.toggleButton?.nativeElement)
    console.log(this.counters?.toArray());
    
  }

  public incrementAll(): void{
    this.counters?.forEach((counter: CounterComponent) => counter.increment())
  }
}
