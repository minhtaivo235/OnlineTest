import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Privilege, PrivilegeService } from '../../services/privilege.service';
// let self;

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit {
  Privileges: [Privilege];
  Privilege: Privilege = {} as Privilege;
  pnotify = undefined;


  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private PrivilegeService: PrivilegeService, private pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.PrivilegeService.getAll().subscribe(res => {
      this.Privileges = res.data;
      console.log(res);
    });
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.PrivilegeService.get(id).subscribe(res => {
        this.Privilege = res.data;
        $("#modal_title").html("Sửa");
        this.modal.show();
      });
    }
    else {
      this.Privilege = {
        id: 0
      } as Privilege
      $("#modal_title").html("Thêm");
      this.modal.show();
    }
  }

  save() {
    if (this.Privilege.id === 0) {
      this.PrivilegeService.add(this.Privilege).subscribe(res => {
        if (res.errorCode === 0) {
          this.PrivilegeService.getAll().subscribe(resList => {
            this.Privileges = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm thành công!'
            });
          });
        }
      });
    }
    else {
      this.PrivilegeService.put(this.Privilege).subscribe(res => {
        if (res.errorCode === 0) {
          this.PrivilegeService.getAll().subscribe(resList => {
            this.Privileges = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'chỉnh sửa thành công!'
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
    var temp = "#labname_" + id;
    $("#delete_message").html("Xóa " + $(temp).html() + " ?");
    this.modalDelete.show();
  }
  delete() {
    let id = $("#id_delete").val();
    this.PrivilegeService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.Privileges.find(x => x.id == id);
        const index = this.Privileges.indexOf(deletedItem);
        this.Privileges.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa thành công!'
        });
      }
    })
  }
  hide = function (ID) {
    let temp = '#child_' + ID;
    let icon = "#arrow_" + ID;
    if ($(temp).is(':visible')) {
      $(temp).fadeOut(500);
      $(icon).removeClass().addClass('fa fa-angle-up open');
    }
    else {
      $(temp).fadeIn(500);
      $(icon).removeClass().addClass('fa fa-angle-up close');
    }
  }
}