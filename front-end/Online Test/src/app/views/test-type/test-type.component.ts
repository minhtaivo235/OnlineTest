import { Component, OnInit, ViewChild } from '@angular/core';
import { Test_Type, TestTypeService } from '../../services/test_type.service';
import { ModalDirective } from 'ngx-bootstrap';
import { PnotifyService } from '../../services/pnotify.service';


@Component({
  selector: 'app-test-type',
  templateUrl: './test-type.component.html',
  styleUrls: ['./test-type.component.scss']
})
export class TestTypeComponent implements OnInit {

  test_types: [Test_Type];
  test_type: Test_Type = {} as Test_Type;
  pnotify = undefined;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private testTypeService: TestTypeService,  private pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
   }

  ngOnInit() {
    this.testTypeService.getAll().subscribe(res => {
      this.test_types = res.data;
    });
  }

  
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.testTypeService.get(id).subscribe(res => {
        // console.log(res);
        this.test_type = res.data;
        this.test_type.testname = res.data.testname.toString().trim();
        $("#modal_title").html("Sửa loại bài");
        this.modal.show();
      });
    }
    else {
      this.test_type = {
        id: 0
      } as Test_Type
      $("#modal_title").html("Thêm loại bài");
      this.modal.show();
    }
  }


  save() {
    if (this.test_type.id === 0) {
      // add
      this.testTypeService.add(this.test_type).subscribe(res => {
        if (res.errorCode === 0) {
          this.testTypeService.getAll().subscribe(resList => {
            this.test_types = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm loại bài ' + res.data.testname + ' thành công!'
            });
          });
        }
      });
    }
    else {
      //update
      console.log(this.test_type);
      this.testTypeService.put(this.test_type).subscribe(res => {
        // console.log(res);
        if (res.errorCode === 0) {
          this.testTypeService.getAll().subscribe(resList => {
            this.test_types = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Cập nhật ' + res.data.testname + ' thành công!'
            });
          });
        }
      });
     }
   }

   delete() {
    let id = $("#id_delete").val();
    // console.log(id);
    this.testTypeService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.test_types.find(x => x.id == id);
        const index = this.test_types.indexOf(deletedItem);
        this.test_types.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa loại bài ' + res.data.testname + ' thành công!'
        });
      }
      else {
        this.modalDelete.hide();
        this.pnotify.error({
          title: 'Thông báo',
          text: 'Xóa loại bài ' + res.data.testname + ' thất bại! Vẫn còn môn học con!'
        });
      }
    });
  }

   

   open_Delete(event, id) {
    if (event != null) {
      event.preventDefault();
    }
    $("#id_delete").val(id);
    var temp = "#testname_" + id;
    $("#delete_message").html("Bạn có chắc chắn muốn xóa loại bài " + $(temp).html() + " không?");
    this.modalDelete.show();
  }

}
