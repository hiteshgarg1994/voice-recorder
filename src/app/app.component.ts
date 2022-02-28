import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl} from '@angular/forms';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private recorder: MediaRecorder | undefined;
  private audio_stream: MediaStream | undefined;
  private recordButton: HTMLInputElement | undefined;
  private downloadAudio: HTMLAnchorElement | undefined;
  private downloadContainer: HTMLElement | null | undefined;
  private preview: HTMLAudioElement | undefined;
  private base: string = "http://localhost:3000/voice-recorder/";
  public fileName: string = "";
  public link: string = "";
  public stopVisible: boolean = false;
  public audioDesciptionForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private fb: FormBuilder) {
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
    this.recordButton = <HTMLInputElement>document.getElementById("recordButton");
    this.preview = <HTMLAudioElement>document.getElementById("audio-playback");
    this.downloadAudio = <HTMLAnchorElement>document.getElementById("downloadButton");
    this.downloadContainer = document.getElementById("downloadContainer");
  }

  stopRecording = () => {
    this.recorder && this.recorder.stop();
    this.audio_stream && this.audio_stream.getAudioTracks()[0].stop();

    if (this.recordButton) {
      this.recordButton["disabled"] = false;
      this.recordButton.innerText = "Redo Recording";
      this.recordButton.classList.remove("button-animate");
    }

    this.preview && this.preview.classList.remove("hidden");
    this.downloadContainer && this.downloadContainer.classList.remove("hidden");
    this.stopVisible = false;
  }

  startRecording = () => {
    this.fileName = "";
    this.stopVisible = true;
    if (this.recordButton) {
      this.recordButton.disabled = true;
      this.recordButton.innerText = "Recording...";
      this.recordButton.classList.add("button-animate");
    }

    if (this.downloadContainer && !this.downloadContainer.classList.contains("hidden")) {
      this.downloadContainer.classList.add("hidden");
    }
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
          console.log("data available", e);
          chunks && chunks.push(e.data);
        };
        this.recorder.onstop = ev => {
          const blob = new Blob(chunks, {'type': 'audio/mp3'});
          const url = URL.createObjectURL(blob);
          this.preview && (this.preview.src = url);
          this.downloadAudio && (this.downloadAudio.href = url);
          console.log("recorder stopped");
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
          console.log('response received is ', response);
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

}
