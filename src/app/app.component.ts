import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {InfoDialogComponent} from "./info-dialog/info-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private recorder: MediaRecorder | undefined;
  private audio_stream: MediaStream | undefined;
  private preview: HTMLAudioElement | undefined;
  private base: string = "http://localhost:3000/voice-recorder/";
  public fileName: string = "";
  public link: string = "";
  public stopVisible: boolean = false;
  public audioDesciptionForm: FormGroup = new FormGroup({});
  public recordButtonText = "Start Recording";

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private fb: FormBuilder, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.loadAudioRecorder();
    this.initAudioDescriptionForm();
  }

  initAudioDescriptionForm = (): void => {
    this.audioDesciptionForm =
      this.fb.group({
        title: ['Untitled'],
        description: ['Sample Audio']
      });
  }

  loadAudioRecorder = () => {
    this.preview = <HTMLAudioElement>document.getElementById("audio-playback");
  }

  stopRecording = () => {
    this.recorder && this.recorder.stop();
    this.audio_stream && this.audio_stream.getAudioTracks()[0].stop();
    this.recordButtonText = "Redo Recording";
    this.stopVisible = false;
  }

  startRecording = () => {
    this.fileName = "";
    this.stopVisible = true;
    this.recordButtonText = "Recording...";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia != undefined) {
      this.initMediaDevices();
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

  initMediaDevices = () => {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        this.audio_stream = stream;
        this.recorder = new MediaRecorder(stream);
        let chunks: BlobPart[] | undefined = [];
        this.recorder.ondataavailable = e => {
          chunks && chunks.push(e.data);
        };
        this.recorder.onstop = ev => {
          const blob = new Blob(chunks, {'type': 'audio/mp3'});
          const url = URL.createObjectURL(blob);
          this.preview && (this.preview.src = url);
          this.preview?.pause();
          this.preview?.load();
          this.uploadAudio(blob);
        }
        this.recorder.start();
        const timeout_status = setTimeout(() => {
          this.stopRecording();
        }, 300000);
        return;
      }).catch(err => {
      console.log(err)
      return;
    });
  }

  uploadAudio = (blob: Blob): void => {
    if (blob.size === 44) { // 44 bytes means something is wrong. reload to fix
      if (window.confirm('Sorry, no audio was captured. Click OK to reload the page.'))
        window.location.reload();
      else return;
    }
    const fd = new FormData();
    fd.append("audioData", blob);

    this.http.post('http://localhost:3000/voice-recorder', fd)
      .subscribe((response: any) => {
        if (response.ResponseCode == 200) {
          this.fileName = response.data.fileName;
          this.link = this.base + this.fileName;
        } else {
          alert(response.exceptionMessage);
        }
        this.cd.detectChanges();
      })
    return;
  }

  copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = this.link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  onSubmit = (): void => {

  }

  openDialog = ():void => {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(InfoDialogComponent, dialogConfig);
  }

}
