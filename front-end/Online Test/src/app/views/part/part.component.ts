import { Component, OnInit, ViewChild } from '@angular/core';
import { Part, PartService } from '../../services/part.service';
import * as $ from 'jquery';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject, SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  subjects: [Subject];
  parts: [Part];
  part: Part = {} as Part;
  pnotify = undefined;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private partService: PartService, private pnotifyService: PnotifyService, private subjectService: SubjectService) {
    this.pnotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.partService.getAll().subscribe(
      res => {
        this.parts = res.data;
      }
    )
    this.subjectService.getAll().subscribe(
      res => {
        this.subjects = res.data;
      }
    )
  }

  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      for (let i = 1; i <= 7; i++) {
        let temp = "#edit_" + i;
        let temp1 = "#field_" + i;
        $(temp).show();
        $(temp1).addClass("w-75").removeClass("is-invalid");
        // $(temp1).attr("disabled", 1);
        $(temp1).prop("disabled", true);
      }
      this.partService.get(id).subscribe(res => {
        // console.log(res);
        if (res.errorCode === 0) {
          this.part = res.data;
          $("#modal_title").html("Xem/Sửa học phần");
          $("#button_modal").html("Cập nhật");
          this.modal.show();
        }
      });
    }
    else {
      for (let i = 1; i <= 7; i++) {
        let temp = "#edit_" + i;
        let temp1 = "#field_" + i;
        $(temp).hide();
        $(temp1).removeClass("w-75 is-invalid");
        // $(temp1).attr("disabled", 0);
        $(temp1).prop("disabled", false);
      }
      this.part = {
        id: 0
      } as Part;
      $("#modal_title").html("Thêm học phần");
      $("#button_modal").html("OK");
      this.modal.show();
    }
  }
  save() {
    if (this.validate() == false) {
      return false;
    }
    if (this.part.id === 0) {
      // add
      this.partService.add(this.part).subscribe(res => {
        if (res.errorCode === 0) {
          this.partService.getAll().subscribe(resList => {
            this.parts = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm học phần "' + res.data.parname + '" thành công!'
            });
          });
        }
      });
    }
    else {
      //update
      this.partService.put(this.part).subscribe(res => {
        // console.log(res);
        if (res.errorCode === 0) {
          this.partService.getAll().subscribe(resList => {
            this.parts = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Cập nhật học phần "' + res.data.parname + '" thành công!'
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
    var temp = "#parname_" + id;
    $("#delete_message").html('Bạn có chắc chắn muốn xóa học phần "' + $(temp).html() + '" không?');
    this.modalDelete.show();
  }
  delete() {
    let id = $("#id_delete").val();
    // console.log(id);
    this.partService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.parts.find(x => x.id == id);
        const index = this.parts.indexOf(deletedItem);
        this.parts.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa học phần "' + res.data.parname + '" thành công!'
        });
      }
      else {
        this.modalDelete.hide();
        this.pnotify.error({
          title: 'Thông báo',
          text: 'Xóa môn học "' + res.data.parname + '" thất bại! Vẫn còn câu hỏi thuộc học phần "' + res.data.parname + '"!'
        });
      }
    })
  }
  Edit(event, id: number) {
    event.preventDefault();
    let temp = "#edit_" + id;
    let temp1 = "#field_" + id;
    $(temp1).prop("disabled", false);
    $(temp).prop("disabled", true);
  }
  //validate
  validate_parid() {
    if ($("#field_1").val() == '') {
      $("#field_1").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_1").html("Vui lòng nhập mã học phần!");
      return false;
    }
    else {
      $("#field_1").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_1").html("");
      return true;
    }
  }
  validate_parname() {
    if ($("#field_2").val() == '') {
      $("#field_2").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_2").html("Vui lòng nhập tên học phần!");
      return false;
    }
    else {
      $("#field_2").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_2").html("");
      return true;
    }
  }
  validate_sub_id() {
    if ($("#field_3").val() == null) {
      $("#field_3").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_3").html("Vui lòng chọn môn học!");
      return false;
    }
    else {
      $("#field_3").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_3").html("");
      return true;
    }
  }
  validate_pardefault_score() {
    if ($("#field_5").val() == '') {
      $("#field_5").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_5").html("Vui lòng nhập số điểm mặc định!");
      return false;
    }
    else {
      if ($("#field_5").val() > 10 || $("#field_5").val() <= 0) {
        $("#field_5").removeClass('is-valid').addClass('is-invalid');
        $("#valid_mes_5").html("Số điểm không hợp lệ!");
        return false;
      }
      else {
        $("#field_5").removeClass('is-invalid').addClass('is-valid');
        $("#valid_mes_5").html("");
        return true;
      }
    }
  }
  validate_pardefault_level() {
    if ($("#field_6").val() == null) {
      $("#field_6").removeClass('is-valid').addClass('is-invalid');
      $("#valid_mes_6").html("Vui lòng chọn độ khó mặc định!");
      return false;
    }
    else {
      $("#field_6").removeClass('is-invalid').addClass('is-valid');
      $("#valid_mes_6").html("");
      return true;
    }
  }

  validate() {
    var check = true;
    if (this.validate_parid() == false)
      check = false;
    if (this.validate_parname() == false)
      check = false;
    if (this.validate_sub_id() == false)
      check = false;
    if (this.validate_pardefault_score() == false)
      check = false;
    if (this.validate_pardefault_level() == false)
      check = false;

    //validate all
    if (check == false)
      return false;
    else
      return true;
  }

}
