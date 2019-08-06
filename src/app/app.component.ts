import { Component } from '@angular/core';
import { DeployService } from './widget_modules/deploy/deploy.service';
import { BuildService } from 'src/app/widget_modules/build/build.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'hygieia-ui';

  constructor(private deployService: DeployService,
    private buildService: BuildService) {}
  
  ngOnInit(){ 
    console.log(this.deployService.fetchDetails('59f88f5e6a3cf205f312c62e').subscribe(result => console.log(result)));
    
  }


}
