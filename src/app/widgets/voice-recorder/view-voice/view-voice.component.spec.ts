import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVoiceComponent } from './view-voice.component';

describe('ViewVoiceComponent', () => {
  let component: ViewVoiceComponent;
  let fixture: ComponentFixture<ViewVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
