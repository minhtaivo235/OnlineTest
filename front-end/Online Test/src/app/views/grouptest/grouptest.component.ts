import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupTestService, GroupTest } from '../../services/group-test.service';
import { TestService, Test } from '../../services/test.service';
import { GroupService, Group } from '../../services/group.service';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-grouptest',
  templateUrl: './grouptest.component.html',
  styleUrls: ['./grouptest.component.scss']
})
export class GrouptestComponent implements OnInit {

  groups: [Group];
  tests: [Test];
  grouptests: [GroupTest];
  grouptest: GroupTest = {} as GroupTest;
  pnotify = undefined;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private grouptestService: GroupTestService, private testService: TestService,
    private groupService: GroupService, private pnotifyService: PnotifyService) {
      this.pnotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.groupService.getAll().subscribe(res => {
      this.groups = res.data;
    });
    this.testService.getAll().subscribe(res => {
      this.tests = res.data;
    });
    this.grouptestService.getAll().subscribe(res => {
      this.grouptests = res.data;
      console.log(this.grouptests);
    });
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.grouptestService.get(id).subscribe(res => {
        this.grouptest = res.data;
        $("#modal_title").html("Sửa nhóm thi");
        this.modal.show();
      });
    }
    else {
      this.grouptest = {
        id: 0
      } as GroupTest
      $("#modal_title").html("Thêm nhóm thi");
      this.modal.show();
    }
  }
  save() {
    if (this.grouptest.id === 0) {
      // add
      this.grouptestService.add(this.grouptest).subscribe(res => {
        if (res.errorCode === 0) {
          this.grouptestService.getAll().subscribe(resList => {
            this.grouptests = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm nhóm thi thành công!'
            });
          });
        }
      });
    }
    else {
      //update
      this.grouptestService.put(this.grouptest).subscribe(res => {
        // console.log(res);
        if (res.errorCode === 0) {
          this.grouptestService.getAll().subscribe(resList => {
            this.grouptests = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Cập nhật nhóm thi thành công!'
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
    $("#delete_message").html("Bạn có chắc chắn muốn xóa nhóm thi này không?");
    this.modalDelete.show();
  }
  delete() {
    let id = $("#id_delete").val();
    console.log(id);
    this.grouptestService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.grouptests.find(x => x.id == id);
        const index = this.grouptests.indexOf(deletedItem);
        this.grouptests.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa nhóm thi thành công!'
        });
      }
      else {
        this.modalDelete.hide();
        this.pnotify.error({
          title: 'Thông báo',
          text: 'Xóa nhóm thi thất bại!'
        });
      }
    })
  }
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
