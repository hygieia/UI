import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent implements OnInit {

  public title : string = ''
  public bntName2: string = 'Ok'
  public bntName1: string = 'Cancel'
  public message: string = ''
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
