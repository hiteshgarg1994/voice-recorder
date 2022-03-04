import {Component} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  templateUrl: './secure-component.html'
})

export class secureComponent {
  callBusy = (busy: any):void => {
    console.log(busy);
  }
}
