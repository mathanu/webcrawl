import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 // @Output() tagDataObj = new EventEmitter();
  public tagDataObj={"SURVEYDATA":{},"TOTAL":0,"RECORDS":[]}
  public tagDataObjFlag = false;
  public tagValueTxt = ""
  public tagId=1;
  public toggleId=1;
  headElements = ['Questionid', 'Title', 'Answers', 'Views','Votes','Author', 'Dateadded'];
  loading=false;
  constructor(private httpdataservice: HttpService) {}

  ngOnInit(): void {
    this.getTagValues(1)

  }

   tagArray =['php','javascript','java','android','html','python','css','jquery','sql','c','angularjs'] 

  getTagValues(tag:any)
  {
    console.log("tag ", tag)
    this.tagId = tag
    this.tagValueTxt= this.tagArray[tag]
    this.loading=true;
    this.httpdataservice.httpgettagdata(tag).subscribe((response:any)=>{
      if(response)
      {
        this.tagDataObjFlag =true
        this.tagDataObj.SURVEYDATA = response.result.COUNT;
        this.tagDataObj.TOTAL = response.result.TOTAL;
        this.tagDataObj.RECORDS = <any>response.result.RECORDS;
        console.log(this.tagDataObj)
        this.loading=false;
      }
    })
  }

  showGraph(val:any)
  {
    this.toggleId=val
  }

}
