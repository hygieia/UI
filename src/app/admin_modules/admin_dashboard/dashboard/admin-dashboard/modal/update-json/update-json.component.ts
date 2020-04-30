import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from '../../../../services/user-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-json',
  templateUrl: './update-json.component.html',
  styleUrls: ['./update-json.component.scss']
})
export class UpdateJsonComponent implements OnInit {
  public title: string;
  jsonForm: FormGroup;
  public placeholder = '{\"name\": \"name\", \"description\":\"Default description\", \"flags\": {}},{\"name\": ' +
    '\"name\", \"description\":\"Default description\", \"flags\": {}},{\"name\": \"name\", \"description\":\"Default ' +
    'description\", \"flags\": {}},{...';

  constructor(
    public activeModal: NgbActiveModal,
    private userData: UserDataService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  private createForm() {
    this.jsonForm = this.formBuilder.group({
      featureflags: '',
    });
  }

  ngOnInit() {
  }

  submitJSON() {
    const inputJSON = this.jsonForm.get('featureflags').value;
    const jsonList = inputJSON.split(',{');

    jsonList.forEach((curr, i) => {
      if (i >= 1) {
        curr = '{' + curr;
        console.log(curr);
      }
      this.userData
        .createOrUpdateFeatureFlags(curr)
        .subscribe( (response) => {
          console.log(response);
          this.activeModal.close('close');
        }, (error) => {
          console.log(error);
        });
    });
  }
}
