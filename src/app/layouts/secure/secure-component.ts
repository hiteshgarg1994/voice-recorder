import {Component} from '@angular/core';
import {DataService} from "../../common/data.service";

@Component({
  templateUrl: './secure-component.html'
})

export class secureComponent {
  constructor(public data_service: DataService) {
  }

}

