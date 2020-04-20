import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/admin_modules/admin_dashboard/services/user-data.service';
import * as moment from 'moment';  


@Component({
  selector: 'app-generate-api-token-modal',
  templateUrl: './generate-api-token-modal.component.html',
  styleUrls: ['./generate-api-token-modal.component.scss']
})
export class GenerateApiTokenModalComponent implements OnInit {

  public apiUser : any;
  public tokenItem : any;
  public date: NgbDateStruct;
  apiForm: FormGroup;
  apiTokenError = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userData: UserDataService) { }

  ngOnInit() {
    this.apiForm = this.formBuilder.group({
      apiUser: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      date: [''],
      apiKey:[{value:'', disabled: true},[Validators.maxLength(100)]]
  });
  }
  get f() { return this.apiForm.controls; }

  toDateModel(date: NgbDateStruct | null): string | null {
    console.log(' date ', date)
    return date ? date.day + '/' + date.month + '/' + date.year : null;
  }

   submit() {

    this.apiTokenError = true;
    //form.apiKey.$setValidity('apiTokenError', true);

    if (this.apiForm.valid) {
   
        var momentSelectedDt = moment(this.toDateModel(this.apiForm.get('date').value));
        console.log('momentSelectedDt', momentSelectedDt)
        var timemsendOfDay = momentSelectedDt.endOf('day').valueOf();

        var apitoken = {
            "apiUser" : this.apiForm.get('apiUser').value,
            "expirationDt" : timemsendOfDay
        };

        this.userData
            .createToken(apitoken)
            .subscribe( (response)=> {
                console.log(response);
                //$scope.apiKey = response;
                this.apiForm.get('apiKey').setValue(response);
                //$uibModalInstance.close();
                this.apiTokenError = false;
            }, (error) => {
                console.log('eroor ', error);
              //  ctrl.apiKey = response;
                //form.apiKey.$setValidity('apiTokenError', false);
                this.apiTokenError = true;
            });
    }
}

}
