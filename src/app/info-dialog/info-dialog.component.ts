import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<InfoDialogComponent>) { }

  ngOnInit(): void {
  }

  closeBottomSheet = (event: MouseEvent):void => {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
