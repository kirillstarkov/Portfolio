import { Component, Input, OnChanges, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ICounterEvent } from './shared/models/counter-event.interface';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, OnChanges,OnDestroy {
  @Input() public counterName: string = "default";
  @Input('initialValue') public counterValue: number = 0;

  @Output() public onChangeValue: EventEmitter<ICounterEvent> = new EventEmitter();

  private readonly _DETECT_VALUE = 10;

  constructor() {}

  public ngOnInit(): void {
    console.log('ngOnInit',this.counterName);
  }

  public ngOnChanges(): void {
    console.log('ngOnChanges',this.counterValue);
  }

  public ngOnDestroy(): void{
    console.log('ngOnDestroy');
  }

  public increment(): void {
    this.counterValue++;

    this.listeningValueOnTen();
  }

  public listeningValueOnTen() {
    if(this.counterValue >= this._DETECT_VALUE) {
      this.onChangeValue.emit({
        value: this.counterValue,
        name: this.counterName
      })
    }
  }
}
