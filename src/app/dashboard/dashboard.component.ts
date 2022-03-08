import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {
  }

  public widgets = [{
    "name": "Voice Recorder",
    "description": "Asynchronous voice communication",
    "icon": "mic",
    "route": "/voice-recorder"
  },
    {
      "name": "QR Code",
      "description": "Scan & Contact",
      "icon": "qr_code_2",
      "route": "/qr-code"
    }]

  widgetClicked = (widget: any): void => {
    this.router.navigate([widget.route]);
  }
}
