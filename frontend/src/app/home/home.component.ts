import { Component,OnInit } from '@angular/core';
import { FrontendService } from '../services/frontend.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]

})
export class HomeComponent implements OnInit {

  consumption : any = null ;

  data : Array<any> = [];

  constructor(
    private frontendService: FrontendService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {

  }

  getTariffs(){
    if (this.consumption == 0 ){
      this.messageService.add({severity:'warn', summary: '', detail: 'Consumption can not be 0', life: 3000});
      return
    }
    if (this.consumption == null ){
      this.messageService.add({severity:'warn', summary: '', detail: 'Consumption can not be empty', life: 3000});
      return
    }

    this.frontendService.getTariffs(this.consumption).subscribe(
      res => {
        if(res.body.status && res.status == 200) {
          this.data = res.body.data;
        }
        else{
          this.messageService.add({severity:'error', summary:'Error', detail:'Something went wrong!'});
        }
      },
      err => {
        console.log(err.error);
        this.handleGetSheetErr();
      }
    );
  }

  handleGetSheetErr(){
    this.messageService.add({severity:'error', summary:'Error', detail:'Something went wrong!'});
    this.data = [];
  }
}
