import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent implements OnInit {

  public title = '';
  public bntName2 = 'Ok';
  public bntName1 = 'Cancel';
  public message = '';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
