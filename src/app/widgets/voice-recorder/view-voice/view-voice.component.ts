import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-view-voice',
  templateUrl: './view-voice.component.html',
  styleUrls: ['./view-voice.component.css']
})
export class ViewVoiceComponent implements OnInit {
  private preview: HTMLAudioElement | undefined;
  error: string = "";

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    const fileName = this.activatedRoute.snapshot.params['fileName'];
    this.getFileFromAPI(fileName);
    this.preview = <HTMLAudioElement>document.getElementById("audio-playback");
  }

  getFileFromAPI = (fileName: string): void => {
    this.http.get(environment.voiceApi + fileName, {responseType: 'blob'})
      .subscribe((response: any) => {
        if (response.type.indexOf('audio') > -1) {
          const url = window.URL.createObjectURL(response)
          this.preview && (this.preview.src = url);
          this.preview?.pause();
          this.preview?.load();
        } else {
          this.error = "Something Went Wrong !!!"
        }
      })
  }

}
