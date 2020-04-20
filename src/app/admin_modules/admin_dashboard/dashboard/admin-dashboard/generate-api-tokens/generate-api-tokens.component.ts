import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import {NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { EditTokenModalComponent } from '../modal/edit-token-modal/edit-token-modal.component';
import { GenerateApiTokenModalComponent } from '../modal/generate-api-token-modal/generate-api-token-modal.component';
import { DeleteConfirmModalComponent } from '../modal/delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-generate-api-tokens',
  templateUrl: './generate-api-tokens.component.html',
  styleUrls: ['./generate-api-tokens.component.scss']
})
export class GenerateApiTokensComponent implements OnInit {

  error: any = {}
  apitokens: any[]=[]
  tokenSearch : string = ''
  constructor(private userData: UserDataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadApiToken();
  }

  loadApiToken() {
    this.userData.apitokens().subscribe((response:any) => {
      this.apitokens = response;
      console.log('api token ', response)
    })
  }

  editToken(apitoken){
   console.log("edit", apitoken)
   this.openModal(apitoken);
  }

  generateToken(){
    const modalRef = this.modalService.open(GenerateApiTokenModalComponent);
    //  modalRef.componentInstance.tokenItem = item 
    //  modalRef.componentInstance.apiUser = item.apiUser 
    //  modalRef.componentInstance.date = this.parseNgbDate(item.expirationDt)

  }

  deleteToken(id){
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);
     modalRef.componentInstance.title = 'Are you sure you want to delete?';
     modalRef.componentInstance.bntName='Ok';

  }

  openModal(item){
    const modalRef = this.modalService.open(EditTokenModalComponent);
    
   // modalRef.tokenItem = 
    modalRef.componentInstance.tokenItem = item 
    modalRef.componentInstance.apiUser = item.apiUser 
    modalRef.componentInstance.date = this.parseNgbDate(item.expirationDt)
    //modalRef.componentInstance.modalType = ConfirmationModalComponent;
  }

  parseNgbDate(value: string): NgbDateStruct | null {
    if (value) {
      let date = new Date(value);
     // let date = value.split(this.DELIMITER);
      return {
        day : date.getDate(),
        month : date.getMonth()+1,
        year : date.getFullYear()
      };
    }
    return null;
  }

}
