import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart, Router, NavigationError, RouterEvent} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public current_tool: string = '';
  current_tool_enum: any = {
    "/dashboard": "Dashboard",
    "/analysis": "Analysis",
    "/voice-recorder": "Tools | Voice Recorder",
    "/qr-code": "Tools | QR Code",
    "/speech-voice": "Tools | Memo",
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.current_tool = this.current_tool_enum[event.url] || '';
      }

      if (event instanceof NavigationEnd) {
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
    this.current_tool = this.current_tool_enum[this.router.url] || '';
  }
}
