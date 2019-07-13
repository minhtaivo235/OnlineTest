import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService, Question, Option, QuestionRequest } from '../../services/question.service';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { SubjectService, Subject } from '../../services/subject.service';
import { Part, PartService } from '../../services/part.service';
import { AnswertypeService, AnswerType } from '../../services/answertype.service';
import * as $ from 'jquery';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { delay } from 'rxjs/operators';
import { OptionService } from '../../services/option.service';

@Component({
  selector: 'app-listquestion',
  templateUrl: './listquestion.component.html',
  styleUrls: ['./listquestion.component.scss']
})
export class ListquestionComponent implements OnInit {
  questions: [Question];
  question: Question = {} as Question;
  subjects: [Subject];
  options: Option[] = [] as Option[];
  Aoptions: [Option];
  questionRequest: QuestionRequest = {} as QuestionRequest;
  sub_id: number = 0;
  parts: [Part];
  answertypes: [AnswerType];
  pnotify = undefined;
  Achoose: string = '';
  count_choose: number = 0;
  YN_box: string = '1';
  Bchoose: string = '';
  id_1: number;
  id_2: number;
  public Editor = ClassicEditor;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;

  constructor(private questionService: QuestionService, private pnotifyService: PnotifyService,
    private subjectService: SubjectService, private optionService: OptionService,
    private partService: PartService, private answertypeService: AnswertypeService) {
    this.pnotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.questionService.getAll().subscribe(res => {
      this.questions = res.data;
    });
    // this.optionService.get(1).subscribe(res => {
    //   console.log(res);
    //   this.options = res.data;
    // });
    this.subjectService.getAll().subscribe(res => {
      this.subjects = res.data;
    });
    this.answertypeService.getAll().subscribe(res => {
      this.answertypes = res.data;
    });
  }

  toggle_part() {
    if (this.sub_id != 0) {
      this.partService.getAllForId(this.sub_id).subscribe(res => {
        this.parts = res.data;
      });
    }
  }
  validate_sub_id() {
    if (this.sub_id == 0) {
      $("#field_1").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_1").html("Vui lòng chọn môn học!");
      return false;
    }
    else {
      $("#field_1").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_1").html("");
      return true;
    }
  }
  validate_par_id() {
    if (this.question.paR_ID == null) {
      $("#field_2").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_2").html("Vui lòng chọn học phần!");
      return false;
    }
    else {
      $("#field_2").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_2").html("");
      return true;
    }
  }
  validate_anst_id() {
    if (this.question.ansT_ID == null) {
      $("#field_3").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_3").html("Vui lòng chọn loại câu hỏi!");
      return false;
    }
    else {
      $("#field_3").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_3").html("");
      return true;
    }
  }
  validate_score() {
    if (this.question.quescore == null) {
      $("#field_4").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_4").html("Vui lòng nhập số điểm!");
      return false;
    }
    else {
      $("#field_4").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_4").html("");
      return true;
    }
  }
  validate_level() {
    if (this.question.quelevel == null) {
      $("#field_5").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_5").html("Vui lòng chọn độ khó!");
      return false;
    }
    else {
      $("#field_5").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_5").html("");
      return true;
    }
  }
  validate_content() {
    if (this.question.quecontent == '') {
      $("#valid_mes_6").html("Vui lòng nhập nội dung câu hỏi!");
      return false;
    }
    else {
      $("#valid_mes_6").html("");
      return true;
    }
  }
  validate_option(id) {
    let temp = '#option_content_' + id;
    let temp1 = '#valid_mes_option_' + id;
    if (id >= 4) {
      let temp2 = '#extra_option_' + id;
      if ($(temp2).is(':visible')) {
        if ($(temp).val() == '') {
          $(temp).removeClass('is-valid').addClass('is-invalid');
          $(temp1).html("Vui lòng nhập nội dung!");
          return false;
        }
        else {
          $(temp).removeClass('is-invalid').addClass('is-valid');
          $(temp1).html("");
          return true;
        }
      }
    }
    else {
      if ($(temp).val() == '') {
        $(temp).removeClass('is-valid').addClass('is-invalid');
        $(temp1).html("Vui lòng nhập nội dung!");
        return false;
      }
      else {
        $(temp).removeClass('is-invalid').addClass('is-valid');
        $(temp1).html("");
        return true;
      }
    }
  }
  update_count_choose() {
    this.count_choose = 0;
    for (let i = 1; i <= 6; i++) {
      let temp = "#option_p_" + i;
      if (i >= 4) {
        let temp1 = "#extra_option_" + i;
        if ($(temp1).is(':visible') && $(temp).is(':checked')) {
          this.count_choose++;
        }
      }
      else {
        if ($(temp).is(':checked')) {
          this.count_choose++;
        }
      }
    }
    if (this.count_choose < 2) {
      $("#valid_check_option").html("Vui lòng chọn ít nhất 2 đáp án!");
    }
    else
      $("#valid_check_option").html("");
  }
  validate() {
    var check = true;
    if (this.validate_sub_id() == false)
      check = false;
    if (this.validate_par_id() == false)
      check = false;
    if (this.validate_anst_id() == false)
      check = false;
    if (this.validate_score() == false)
      check = false;
    if (this.validate_level() == false)
      check = false;
    if (this.validate_content() == false)
      check = false;
    for (let i = 1; i <= 3; i++) {
      if (this.validate_option(i) == false) {
        check = false;
      }
    }
    for (let i = 4; i <= 6; i++) {
      let temp = '#extra_option_' + i;
      if ($(temp).is(":visible")) {
        if (this.validate_option(i) == false) {
          check = false;
        }
      }
      else
        continue;
    }
    if (this.question.ansT_ID == 2) {
      if (this.Achoose == '') {
        $("#valid_check_option").html("Vui lòng chọn đáp án!");
        check = false;
      }
      else {
        let temp = "#extra_option_" + this.Achoose;
        if (parseInt(this.Achoose) >= 4 && !$(temp).is(":visible")) {
          $("#valid_check_option").html("Vui lòng chọn đáp án!");
          check = false;
        }
      }
    }
    else if (this.question.ansT_ID == 3) {
      this.count_choose = 0;
      for (let i = 1; i <= 6; i++) {
        let temp = "#option_p_" + i;
        if (i >= 4) {
          let temp1 = "#extra_option_" + i;
          if ($(temp1).is(':visible') && $(temp).is(':checked')) {
            this.count_choose++;
          }
        }
        else {
          if ($(temp).is(':checked')) {
            this.count_choose++;
          }
        }
      }
      if (this.count_choose < 2) {
        $("#valid_check_option").html("Vui lòng chọn ít nhất 2 đáp án!");
        check = false;
      }
    }
    else if (this.question.ansT_ID == 4) {
      if (this.Bchoose == '') {
        $("#valid_check_option").html("Vui lòng chọn đáp án!");
        check = false;
      }
    }

    //validate all
    if (check == false)
      return false;
    else
      return true;
  }
  showModal(event = null, id: Number = 0) {
    for (let i = 1; i <= 6; i++) {
      let temp = "#field_" + i;
      $(temp).removeClass("is-invalid is-valid");
      let temp1 = "#option_content_" + i;
      $(temp1).removeClass("is-invalid is-valid");
      if (i >= 4) {
        let temp2 = "#extra_option_" + i;
        $(temp2).hide();
      }
      let temp3 = "#option_p_" + i;
      $(temp3).prop("checked", false);
    }
    $("#valid_mes_4").html("");
    $("#valid_mes_5").html("");
    $("#valid_mes_6").html("");
    this.sub_id = 0;
    this.Achoose = '';


    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      $("#field_3").prop("disabled", true);
      this.questionService.get(id).subscribe(res => {
        this.question = res.data;
        this.sub_id = res.data.suB_ID;
        this.partService.getAllForId(this.sub_id).subscribe(res => {
          this.parts = res.data;
        });
        this.optionService.get(res.data.id).subscribe(resList=>{
          this.Aoptions = resList.data;
          for (let i = 0; i < this.Aoptions.length; i++) {
            let temp = "#option_id_" + (i + 1);
            let temp1 = "#option_content_" + (i + 1);
            let temp2 = "#option_p_" + (i + 1);
            $(temp).val(this.Aoptions[i].id);
            $(temp1).val(this.Aoptions[i].optcontent);
            if (this.Aoptions[i].optiscorrect == true) {
              this.Achoose = (i + 1).toString();
              $(temp2).prop("checked", true);
            }
            if (i >= 3) {
              let temp3 = "#extra_option_" + (i + 1);
              $(temp3).show();
            }
          }
        })
        if (this.question.ansT_ID == 4) {
          for (let i = 1; i <= 4; i++) {
            if(this.question.list_option[0].optcontent == "Đúng"){
              this.YN_box = '1';
            }
            else if(this.question.list_option[0].optcontent == "Yes"){
              this.YN_box = '2';
            }
            else if(this.question.list_option[0].optcontent == "True"){
              this.YN_box = '3';
            }
            else if(this.question.list_option[0].optcontent == "Đồng ý"){
              this.YN_box = '4';
            }
          }
          this.id_1 = this.question.list_option[0].id;
          this.id_2 = this.question.list_option[1].id;
          if (this.question.list_option[0].optiscorrect == true)
            this.Bchoose = "1";
          else
            this.Bchoose = "2";
        }
        $("#modal_title").html("Sửa câu hỏi");
        $("#button_modal").html("Cập nhật");
        this.modal.show();
      });
    }
    else {
      $("#field_3").prop("disabled", false);
      this.question = {
        id: 0,
        quecontent: ''
      } as Question
      $("#modal_title").html("Thêm câu hỏi");
      $("#button_modal").html("OK");
      this.modal.show();
    }
  }
  save() {
    if (this.validate() == false) {
      return false;
    }
    this.options = [];
    if (this.question.id === 0) {
      // add
      if (this.question.ansT_ID == 2) {
        for (let i = 1; i <= 6; i++) {
          let temp = "#extra_option_" + i;
          if (i >= 4 && !$(temp).is(":visible")) {
            //
          }
          else {
            let temp1 = "#option_content_" + i;
            if (this.Achoose == i.toString()) {
              this.options.push({
                id: 0,
                quE_ID: 0,
                optcontent: $(temp1).val().toString(),
                optiscorrect: true
              } as Option);
            }
            else {
              this.options.push({
                id: 0,
                quE_ID: 0,
                optcontent: $(temp1).val().toString(),
                optiscorrect: false
              } as Option);
            }
          }
        }
      }
      else if (this.question.ansT_ID == 3) {
        for (let i = 1; i <= 6; i++) {
          let temp = "#extra_option_" + i;
          if (i >= 4 && !$(temp).is(":visible")) {
            //
          }
          else {
            let temp1 = "#option_content_" + i;
            let temp2 = "#option_p_" + i;
            if ($(temp2).is(':checked')) {
              this.options.push({
                id: 0,
                quE_ID: 0,
                optcontent: $(temp1).val().toString(),
                optiscorrect: true
              } as Option);
            }
            else {
              this.options.push({
                id: 0,
                quE_ID: 0,
                optcontent: $(temp1).val().toString(),
                optiscorrect: false
              } as Option);
            }
          }
        }
      }
      else if (this.question.ansT_ID == 4) {
        for (let i = 1; i <= 2; i++) {
          let temp = "#YN_box_content_" + i;
          if (this.Bchoose == i.toString()) {
            this.options.push({
              id: 0,
              quE_ID: 0,
              optcontent: $(temp).html().toString(),
              optiscorrect: true
            } as Option);
          }
          else {
            this.options.push({
              id: 0,
              quE_ID: 0,
              optcontent: $(temp).html().toString(),
              optiscorrect: false
            } as Option);
          }
        }
      }
      this.questionRequest.question = this.question;
      this.questionRequest.options = this.options;
      console.log(this.questionRequest);
      this.questionService.add(this.questionRequest).subscribe(res => {
        if (res.errorCode === 0) {
          this.questionService.getAll().subscribe(resList => {
            this.questions = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm câu hỏi thành công!'
            });
          });
        }
      });
    }
    else {
      //update
      if (this.question.ansT_ID == 2) {
        for (let i = 1; i <= 6; i++) {

          let temp = "#extra_option_" + i;
          if (i >= 4 && !$(temp).is(":visible")) {
            //
          }
          else {
            let temp1 = "#option_content_" + i;
            let temp2 = "#option_id_" + i;
            if (this.Achoose == i.toString()) {
              if ($(temp2).val() == '') {
                this.options.push({
                  id: 0,
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: true
                } as Option);
              }
              else {
                this.options.push({
                  id: $(temp2).val(),
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: true
                } as Option);
              }
            }
            else {
              if ($(temp2).val() == '') {
                this.options.push({
                  id: 0,
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: false
                } as Option);
              } else {
                this.options.push({
                  id: $(temp2).val(),
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: false
                } as Option);
              }
            }
          }
        }
      }
      else if (this.question.ansT_ID == 3) {
        for (let i = 1; i <= 6; i++) {

          let temp = "#extra_option_" + i;
          if (i >= 4 && !$(temp).is(":visible")) {
            //
          }
          else {
            let temp1 = "#option_content_" + i;
            let temp2 = "#option_id_" + i;
            let temp3 = "#option_p_" + i;
            if ($(temp3).is(':checked')) {
              if ($(temp2).val() == '') {
                this.options.push({
                  id: 0,
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: true
                } as Option);
              }
              else {
                this.options.push({
                  id: $(temp2).val(),
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: true
                } as Option);
              }
            }
            else {
              if ($(temp2).val() == '') {
                this.options.push({
                  id: 0,
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: false
                } as Option);
              } else {
                this.options.push({
                  id: $(temp2).val(),
                  quE_ID: this.question.id,
                  optcontent: $(temp1).val().toString(),
                  optiscorrect: false
                } as Option);
              }
            }
          }
        }
      }
      else if (this.question.ansT_ID == 4) {
        for (let i = 1; i <= 2; i++) {
          let temp = "#YN_box_content_" + i;
          let temp1 = "#option_id_" + i;
          if (this.Bchoose == i.toString()) {
            this.options.push({
              id: this.id_1,
              quE_ID: this.question.id,
              optcontent: $(temp).html().toString(),
              optiscorrect: true
            } as Option);
          }
          else {
            this.options.push({
              id: this.id_2,
              quE_ID: this.question.id,
              optcontent: $(temp).html().toString(),
              optiscorrect: false
            } as Option);
          }
        }
      }
      this.questionRequest.question = this.question;
      this.questionRequest.options = this.options;
      console.log(this.questionRequest);
      this.questionService.put(this.questionRequest).subscribe(res => {
        if (res.errorCode === 0) {
          this.questionService.getAll().subscribe(resList => {
            this.questions = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Cập nhật câu hỏi thành công!'
            });
          });
        }
      });
    }
  }
  open_Delete(event, id) {
    if (event != null) {
      event.preventDefault();
    }
    $("#id_delete").val(id);
    $("#delete_message").html('Bạn có chắc chắn muốn xóa câu hỏi không?');
    this.modalDelete.show();
  }
  delete() {
    let id = $("#id_delete").val();
    // console.log(id);
    this.questionService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.questions.find(x => x.id == id);
        const index = this.questions.indexOf(deletedItem);
        this.questions.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa câu hỏi thành công!'
        });
      }
    })
  }
  show_info(ID) {
    var temp = "#question_info_" + ID;
    if ($("#pre_id").val() == 'null' || $("#pre_id").val() == undefined) {
      $("#pre_id").val(ID);
      $(temp).show();
    }
    else {
      if ($("#pre_id").val() == ID) {
        $("#pre_id").val('null');
        $(temp).hide();
      }
      else {
        var temp_old = "#question_info_" + $("#pre_id").val();
        $(temp_old).hide();
        $("#pre_id").val(ID);
        $(temp).show();
      }
    }
  }

  show_option(event) {
    event.preventDefault();
    for (let i = 4; i <= 6; i++) {
      let temp = "#extra_option_" + i;
      if (!$(temp).is(":visible")) {
        $(temp).show();
        break;
      }
    }
  }

  hide_option(event) {
    event.preventDefault();
    for (let i = 6; i >= 4; i--) {
      let temp = "#extra_option_" + i;
      if ($(temp).is(":visible")) {
        $(temp).hide();
        break;
      }
    }
  }
}
