import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {Notes} from "./notes";
import {MediaMatcher} from "@angular/cdk/layout";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit, AfterViewInit, OnDestroy {
  mobileQuery: MediaQueryList;
  activeIndex: number;
  fillerNav: Array<Notes>;
  @ViewChildren('textArea') textArea: QueryList<ElementRef>;
  filterQuery: string;
  private mobileQueryListener: () => void;
  transcript: string = "";
  recognition: any;
  listening: boolean;
  abort: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.activeIndex = 0;
    this.fillerNav = JSON.parse(localStorage.getItem('notes') || '[]') || [];
  }

  ngAfterViewInit() {
    this.initSpeech();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.abort = true;
    this.recognition.abort();
  }

  addNote = (): void => {
    this.fillerNav.unshift(new Notes());
    this.activeIndex = 0;
    this.focusTextArea();
    this.updateLocalStorage();
  };

  editNote = (index: number): void => {
    if (index === this.activeIndex) {
      this.focusTextArea();
      return;
    }
    if (this.fillerNav[this.activeIndex].content) {
      this.activeIndex = index;
    } else {
      this.deleteNote();
    }
    this.focusTextArea();
    this.updateLocalStorage();
  };

  deleteNote = (): void => {
    const lastElement = this.activeIndex === this.fillerNav.length - 1;
    this.fillerNav.splice(this.activeIndex, 1);
    this.activeIndex = lastElement ? this.activeIndex - 1 : this.activeIndex;
    this.focusTextArea();
    this.updateLocalStorage();
    if (!this.fillerNav.length) {
      this.filterQuery = '';
    }
  };

  updateLocalStorage = (): void => {
    localStorage.setItem('notes', JSON.stringify(this.fillerNav));
  };

  trackByFn = (index: number, item: Notes) => index;

  focusTextArea = (): void => {
    setTimeout(() => {
      this.textArea.first.nativeElement.focus();
    });
  };

  textAreaValueChange = (newValue: string): void => {
    this.setTitle(this.fillerNav[this.activeIndex], newValue);
    this.updateLocalStorage();
  };

  setTitle = (notes: Notes, newValue: string): void => {
    notes.content = newValue;
    newValue = newValue.trim();
    if (!newValue) {
      notes.title = 'New Note';
      notes.navContent = 'No description text';
    } else {
      const splitArray = newValue.split('\n');
      const tempTitle = splitArray.shift() || '';
      const tempNavContent = splitArray.join('\n').trim() || '';
      notes.title = tempTitle.length > 20 ? tempTitle.slice(0, 20) + '...' : tempTitle;
      notes.navContent = (tempTitle.length > 60 ? (tempTitle + tempNavContent).slice(60, 80) + '...' :
          (tempNavContent.length > 20 ? tempNavContent.slice(0, 20) + '...' :
            tempNavContent || 'No description text')
      )
    }
    notes.time = (new Date()).toJSON();
  };

  detectChanges = (): void => this.changeDetectorRef.detectChanges();

  initSpeech = (): void => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new window.SpeechRecognition();
    // This allows live transcription. If it was false, you would have to wait until done speaking to see the results.

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map(result => result.transcript)
        .join('');
      const p: HTMLElement | null = document.getElementById("words");
      p && (p.textContent = transcript);
      p && (p.classList.add("words-active"));
      if (e.results[0].isFinal) {
        p && (p.textContent = "");
        p && (p.classList.remove("words-active"));
        this.fillerNav[this.activeIndex].content += ' ' + transcript;
        const element = this.textArea.first.nativeElement;
        element.value = this.fillerNav[this.activeIndex].content;
        this.textAreaValueChange(element.value);
      }
    });
    this.recognition.addEventListener('end', () => {
      !this.abort && this.recognition.start();
    });
  }

  startSpeech = (): void => {
    const p: HTMLElement | null = document.getElementById("words");
    p && (p.textContent = "");
    this.listening = !this.listening;
    if (this.listening) {
      this.abort = false;
      this.recognition.start();
    } else {
      this.abort = true;
      this.recognition.abort();
    }
  }

}
