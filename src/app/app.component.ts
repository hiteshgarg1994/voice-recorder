import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  private stopButton: HTMLInputElement | undefined;
  public fileName: string = "";
  public link: string = "http://localhost:3000/voice-recorder/";

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadAudioRecorder();
  }

  loadAudioRecorder = () => {
    this.recordButton = <HTMLInputElement>document.getElementById("recordButton");
    this.stopButton = <HTMLInputElement>document.getElementById("stopButton");
    this.stopButton.disabled = true;
    this.preview = <HTMLAudioElement>document.getElementById("audio-playback");
    this.downloadAudio = <HTMLAnchorElement>document.getElementById("downloadButton");
    this.downloadContainer = document.getElementById("downloadContainer");
  }

  downloadRecording = () => {
    const name = new Date();
    const res = name.toISOString().slice(0, 10);
    this.downloadAudio && (this.downloadAudio.download = res + '.mp3');
  }

  stopRecording = () => {
    this.recorder && this.recorder.stop();
    this.audio_stream && this.audio_stream.getAudioTracks()[0].stop();

    if (this.recordButton) {
      this.recordButton["disabled"] = false;
      this.recordButton.innerText = "Redo Recording";
      this.recordButton.classList.remove("button-animate");
    }

    if (this.stopButton) {
      this.stopButton.classList.add("inactive")
      this.stopButton["disabled"] = true;
    }
    this.preview && this.preview.classList.remove("hidden");
    this.downloadContainer && this.downloadContainer.classList.remove("hidden");
  }

  startRecording = () => {
    this.fileName = "";
    if (this.recordButton) {
      this.recordButton.disabled = true;
      this.recordButton.innerText = "Recording...";
      this.recordButton.classList.add("button-animate");
    }

    if (this.stopButton) {
      this.stopButton.classList.remove("inactive");
      this.stopButton.disabled = false;
    }

    if (this.preview && !this.preview.classList.contains("hidden")) {
      this.preview.classList.add("hidden");
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
          this.link += this.fileName;
        } else {
          alert(response.exceptionMessage);
        }
        this.cd.detectChanges();
      })
    return;
  }

  shareAudio = (): void => {

  }

  copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = this.link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

}
