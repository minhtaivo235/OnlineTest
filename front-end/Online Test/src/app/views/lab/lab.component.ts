import { Component, OnInit, ViewChild } from '@angular/core';
// import axios from "axios";
// import { Product, ProductService, ProductResult } from '../../services/product.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Lab, LabService } from '../../services/lab.service';
// let self;

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  labs: [Lab];
  lab: Lab = {} as Lab;
  pnotify = undefined;


  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private labService: LabService, private pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.labService.getAll().subscribe(res => {
      this.labs = res.data;
    });
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.labService.get(id).subscribe(res => {
        this.lab = res.data;
        $("#modal_title").html("Sửa Lab");
        this.modal.show();
      });
    }
    else {
      this.lab = {
        id: 0
      } as Lab
      $("#modal_title").html("Thêm Lab");
      this.modal.show();
    }
  }

  save() {
    if (this.lab.id === 0) {
      this.labService.add(this.lab).subscribe(res => {
        if (res.errorCode === 0) {
          this.labService.getAll().subscribe(resList => {
            this.labs = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm Lab ' + res.data.labname + ' thành công!'
            });
          });
        }
      });
    }
    else {
      this.labService.put(this.lab).subscribe(res => {
        if (res.errorCode === 0) {
          this.labService.getAll().subscribe(resList => {
            this.labs = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Edit Lab ' + res.data.labname + ' thành công!'
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
    this.labService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.labs.find(x => x.id == id);
        const index = this.labs.indexOf(deletedItem);
        this.labs.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa Lab ' + res.data.labname + ' thành công!'
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