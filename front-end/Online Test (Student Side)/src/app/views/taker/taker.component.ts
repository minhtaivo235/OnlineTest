import { Component, OnInit, ViewChild } from '@angular/core';
import { TakerService, ATakerResult, Taker, TakerRequest } from '../../services/taker.service';
import { SubjectService, Subject, SubjectsResult } from '../../services/subject.service';
import { TestService, Test, TestsResult } from '../../services/test.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { GroupTestService, GroupTest } from '../../services/grouptest.service';
import { TestDetailService, Test_Detail } from '../../services/testdetail.service';
import { QuestionService, Question } from '../../services/question.service';
@Component({
  selector: 'app-Taker',
  templateUrl: './Taker.component.html',
  styleUrls: ['./Taker.component.scss']
})
export class TakerComponent implements OnInit {
  Takers: [Taker];
  Taker: Taker = {} as Taker;
  grouptests: [GroupTest];
  tests: [Test];
  test_details: [Test_Detail];
  gtid: number = 0;
  questions: [Question];
  point: number = 0;
  maxpoint: number = 0;
  takerRequest: TakerRequest= {} as TakerRequest;
  @ViewChild('modal', { static: true }) modal: ModalDirective;
  constructor(private TakerService: TakerService, private router: Router,
    private pnotify: PnotifyService, private subjectService: SubjectService, private testService: TestService,
    private grouptestService: GroupTestService, private testdetailService: TestDetailService,
    private questionService: QuestionService) { }
  ngOnInit() {
    this.grouptestService.getAll().subscribe(res => {
      this.grouptests = res.data;
    });
  }

  save(event) {
    event.preventDefault();
    let email = $("#field_5").val().toString();
    var regex = /((09|03|07|08|05)+([0-9]{8})\b)/;
    let aCong = email.indexOf("@");
    let dauCham = email.lastIndexOf(".");
    if (aCong < 1 || (dauCham + 2 > email.length) || (dauCham < aCong + 2)) {
      alert("Email không hợp lệ");
      return false;
    }
    if (regex.test($("#field_6").val().toString()) == false) {
      alert("Vui lòng nhập đúng định dạng SDT");
      return false;
    }

    for (let i = 1; i <= 7; i++) {
      let temp2 = "#field_" + i;
      if ($(temp2).val() == '') {
        alert("Vui lòng nhập đầy đủ thông tin ");
        return false;
      }
     // $(temp2).prop("disabled", true);
    }
    for (let i = 1; i <= 7; i++) {
      let temp2 = "#field_" + i;

      $(temp2).prop("disabled", true);
    }
    let temp3 = "#field3";

    // $(temgd).prop("disabled", true);
    // $(temgd1).prop("disabled", true);
    $(temp3).prop("disabled", true);
    $("#drop").prop("disabled",true);
    $("#start_btn").prop("disabled",true);

    this.takerRequest.grpt_id = this.gtid;
    this.takerRequest.tak = this.Taker;

    this.TakerService.add(this.takerRequest).subscribe(res => {
      this.grouptestService.get(this.gtid).subscribe(resList => {
        this.testdetailService.get(resList.data.teS_ID).subscribe(resList1 => {
          this.test_details = resList1.data;
          console.log(this.test_details);
          this.questionService.getrdques(this.test_details).subscribe(resList2 => {
            this.questions = resList2.data;
          });
        });
      });
    });
  }
  submit_test(event){
    event.preventDefault();
    for (let i = 0; i < this.questions.length; i++) {
      let check = true;
      for (let j = 0; j < this.questions[i].list_option.length; j++) {
        let temp = "#option_" + this.questions[i].list_option[j].id;
        if($(temp).is(':checked') && this.questions[i].list_option[j].optiscorrect == false){
          check = false;
          break;
        }
        else if(!$(temp).is(':checked') && this.questions[i].list_option[j].optiscorrect == true){
          check = false;
          break;
        }
      }
      if(check==true){
        this.point += this.questions[i].quescore;
      }
      this.maxpoint += this.questions[i].quescore;
    }
    this.point = (this.point * 10) / this.maxpoint;
    this.point = parseFloat(this.point.toFixed(2));

    $("#point").show();
    $(window).scrollTop(0);
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;

  }

  close() {
    this.modal.hide();
  }

  Edit(event, id: number) {
    event.preventDefault();
    let temp = "#edit_" + id;
    let temp2 = "#field_" + id;
    $(temp).prop("disabled", true);
    $(temp2).prop("disabled", false);
  }

}

