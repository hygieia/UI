import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';  
import { UserDataService } from 'src/app/admin_modules/admin_dashboard/services/user-data.service';

@Component({
  selector: 'app-edit-token-modal',
  templateUrl: './edit-token-modal.component.html',
  styleUrls: ['./edit-token-modal.component.scss']
})
export class EditTokenModalComponent implements OnInit {


  @Input() public apiUser: string = '';
  public tokenItem: any;
  @Input() public date: NgbDateStruct;
  apiEditForm: FormGroup;
  apiTokenError = false;


  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private userData: UserDataService) {

  }

  toDateModel(date: NgbDateStruct | null): string | null {
    console.log(' date ', date)
    return date ? date.day + '/' + date.month + '/' + date.year : null;
  }

  ngOnInit() {
    this.apiEditForm = this.formBuilder.group({
      apiUser: [{value: ''}, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      date: [{value: ''}]
  });
setTimeout( ()=> {
  this.apiEditForm.get('apiUser').setValue(this.apiUser)
  this.apiEditForm.get('date').setValue(this.date);
}, 100)
    console.log('api user , token item'+ this.apiUser, ' item ', this.tokenItem, 'date'+ this.date)
  }

  get f() { return this.apiEditForm.controls; }

  submit() {
this.apiTokenError = true;

  //  form.expDt.$setValidity('apiTokenError', true);

    if (this.apiEditForm.valid) {
       // console.log('val is ' + document.cdf.apiUser);
       // console.log('val is ' + document.cdf.apiUser.value);
       // console.log('dt is ' + document.cdf.expDt);
      //  console.log('dt is ' + document.cdf.expDt.value);
        var id = this.tokenItem.id
        var momentSelectedDt = moment(this.toDateModel(this.apiEditForm.get('date').value));
        var timemsendOfDay = momentSelectedDt.endOf('day').valueOf();

        var apitoken = {
            "apiUser" : this.apiEditForm.get('apiUser').value,
            "expirationDt" : timemsendOfDay
        };

        this.userData
            .updateToken(apitoken, id)
            .subscribe( (response) => {
                console.log(response);
                this.apiTokenError = false;
              //  $uibModalInstance.close();
                this.activeModal.close('close')
            }, (error) => {
                console.log(error);
                //form.expDt.$setValidity('apiTokenError', false);
            });
    }

  }
}
