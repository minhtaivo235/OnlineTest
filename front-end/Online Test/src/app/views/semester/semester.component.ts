import { Component, OnInit, ViewChild } from '@angular/core';
import { Semester, SemesterService, SemesterResult } from '../../services/semester.service';
import { ModalDirective } from 'ngx-bootstrap';
import { PnotifyService } from '../../services/pnotify.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {
  semesters: [Semester];
  semester: Semester = {} as Semester;
  pnotify = undefined;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private semesterService: SemesterService, private pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    // let a = parseInt('12');
    // console.log(a+1);
    this.semesterService.getAll().subscribe(res => {
      this.semesters = res.data;
    });
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.semesterService.get(id).subscribe(res => {
        this.semester = res.data;
        console.log(res);
        // tslint:disable-next-line:quotemark
        $("#modal_title").html("Sửa môn học");
        this.modal.show();
      });
    } else {
      this.semester = {
        id: 0,
        semsemester : 1
      // tslint:disable-next-line:semicolon
      } as Semester
      // tslint:disable-next-line:quotemark
      $("#modal_title").html("Thêm môn học");
      this.modal.show();
    }
  }


  save() {

    // tslint:disable-next-line:quotemark
    if ($("#field_3").val() === "1") {
      this.semester.semsemester = 1;
    } else {
      // tslint:disable-next-line:quotemark
      if ($("#field_3").val() === "2") {
        this.semester.semsemester = 2;
      } else {
        this.semester.semsemester = 3;
      }
    }
    if (this.semester.id === 0) {
      // this.semesterService.get(this.semester.id).subscribe(res => {
      //   let hocKy = this.semester.semsemester.toString() + '' + this.semester.semyear.toString();
      //   let hocKyDB = res.data.semsemester.toString() + '' + res.data.semyear.toString();
      //   if ( hocKy === hocKyDB ) {
      //     this.pnotify.success({
      //       title: 'Thông báo',
      //       text: 'Trùng dữ liệu! Vui lòng thêm lại'
      //     });
      //   } else {
          // add
          this.semesterService.add(this.semester).subscribe(res => {
            if (res.errorCode === 0) {
              this.semesterService.getAll().subscribe(resList => {
                this.semesters = resList.data;
                this.modal.hide();
                this.pnotify.success({
                  title: 'Thông báo',
                  text: 'Thêm học kỳ ' + res.data.semsemester + ' của năm ' + res.data.semyear + ' thành công!'
                });
              });
            }
          });
      //   }
      // });
    } else {
      // update
      this.semesterService.put(this.semester).subscribe(res => {
        if (res.errorCode === 0) {
          this.semesterService.getAll().subscribe(resList => {
            this.semesters = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Cập nhật học kỳ ' + res.data.semsemester + ' của năm ' + res.data.semyear + ' thành công!'
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
    $('#id_delete').val(id);
    // tslint:disable-next-line:prefer-const
    let temp = '#semname' + id;
    $('#delete_message').html('Bạn muốn xóa học kỳ ' + $(temp).html() + ' này?');
    this.modalDelete.show();
  }

  delete() {
    const id = $('#id_delete').val();
    // console.log(id);
    this.semesterService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.semesters.find(x => x.id === id);
        const index = this.semesters.indexOf(deletedItem);
        this.semesters.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa học kỳ ' + res.data.semsemester + ' của năm ' + res.data.semyear + ' thành công!'
        });
      } else {
        this.modalDelete.hide();
        this.pnotify.error({
          title: 'Thông báo',
          text: 'Xóa học kỳ ' + res.data.semsemester + ' thất bại!'
        });
      }
    });
  }
  hide = function (ID) {
    const temp = '#child_' + ID;
    const icon = '#arrow_' + ID;
    if ($(temp).is(':visible')) {
      $(temp).fadeOut(500);
      $(icon).removeClass().addClass('fa fa-angle-up open');
    } else {
      $(temp).fadeIn(500);
      $(icon).removeClass().addClass('fa fa-angle-up close');
    }
  };

}
