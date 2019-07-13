import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService, SubjectResult, Subject } from '../../services/subject.service';
import * as $ from "jquery";
import { ModalDirective } from 'ngx-bootstrap';
import { PnotifyService } from '../../services/pnotify.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: [Subject];
  subject: Subject = {} as Subject;
  pnotify = undefined;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private subjectService: SubjectService, private pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.subjectService.getAll().subscribe(res => {
      this.subjects = res.data;
      // console.log(res);
    });
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.subjectService.get(id).subscribe(res => {
        this.subject = res.data;
        $("#modal_title").html("Sửa môn học");
        this.modal.show();
      });
    }
    else {
      this.subject = {
        id: 0
      } as Subject
      $("#modal_title").html("Thêm môn học");
      this.modal.show();
    }
  }
  save() {
    if (this.subject.id === 0) {
      // add
      this.subjectService.add(this.subject).subscribe(res => {
        if (res.errorCode === 0) {
          this.subjectService.getAll().subscribe(resList => {
            this.subjects = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm môn học ' + res.data.subname + ' thành công!'
            });
          });
        }
      });
    }
    else {
      //update
      this.subjectService.put(this.subject).subscribe(res => {
        // console.log(res);
        if (res.errorCode === 0) {
          this.subjectService.getAll().subscribe(resList => {
            this.subjects = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Cập nhật môn học ' + res.data.subname + ' thành công!'
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
    var temp = "#subname_" + id;
    $("#delete_message").html("Bạn có chắc chắn muốn xóa môn học " + $(temp).html() + " không?");
    this.modalDelete.show();
  }
  delete() {
    let id = $("#id_delete").val();
    // console.log(id);
    this.subjectService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.subjects.find(x => x.id == id);
        const index = this.subjects.indexOf(deletedItem);
        this.subjects.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa môn học ' + res.data.subname + ' thành công!'
        });
      }
      else {
        this.modalDelete.hide();
        this.pnotify.error({
          title: 'Thông báo',
          text: 'Xóa môn học ' + res.data.subname + ' thất bại! Vẫn còn môn học con!'
        });
      }
    })
  }
  hide = function (ID) {
    let temp = '#child_' + ID;
    let icon = "#arrow_" + ID;
    if($(temp).is(':visible')){
      $(temp).fadeOut(500);
      $(icon).removeClass().addClass('fa fa-angle-up open');
    }
    else{
      $(temp).fadeIn(500);
      $(icon).removeClass().addClass('fa fa-angle-up close');
    }
  }
}