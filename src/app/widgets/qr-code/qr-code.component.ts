import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var QRCode: any;

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements AfterViewInit {
  @ViewChild('qrcode', {static: false}) qrcode: ElementRef;
  private base64: string;
  private redirectURL = window.location.origin + '/view-QR/';

  constructor() {
  }

  ngAfterViewInit(): void {
    this.generateQR();
  }

  generateQR = (): void => {
    const options = {
      text: this.redirectURL,
      logo: "/assets/images/logo-icon-3.png",
      tooltip: true,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      onRenderingEnd: (canvas: HTMLElement, base64: string) => {
        this.base64 = base64;
      }
    };
    new QRCode(this.qrcode.nativeElement, options);
  }

  download_QR_as_PNG = (): void => {
    const a = document.createElement("a");
    a.href = this.base64;
    a.download = "BiteApps_QR.png";
    a.click();
    a.remove();
  }


}
