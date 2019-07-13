import { Component, OnInit, ViewChild } from '@angular/core';
import { UsertypeService, Usertype ,AUsertypeResult } from '../../services/usertype.service';
import { Router } from '@angular/router';

import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.scss']
})
export class UsertypeComponent implements OnInit {
  usertypes: [Usertype];
  usertype: Usertype = {} as Usertype;
  @ViewChild('modal') modal: ModalDirective;
  constructor(private usertypeService: UsertypeService, private router: Router,
    private pnotify: PnotifyService) {
  }
  ngOnInit() {
    this.usertypeService.getAll().subscribe(res => {
        this.usertypes = res.data;
    });
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      for (let i = 1; i <= 2; i++) {
        let temp = "#edit_" + i;
        let temp2 = "#field_" + i;
        $(temp).show();
        $(temp2).addClass("w-75").removeClass("is-invalid");
        $(temp2).prop("disabled", true);
      }
      this.usertypeService.get(id).subscribe(res => {
        console.log(res);
        this.usertype = res.data;
        this.modal.show();
        //$("input").attr("disabled");
         
         // $('input[type="text"]').attr("disabled");

      });
    } else {
      for (let i = 1; i <= 2; i++) {
        let temp = "#edit_" + i;
        let temp2 = "#field_" + i;
        $(temp).hide();
        $(temp2).removeClass("w-75 is-invalid");
        $(temp2).prop("disabled", false);
      }
      this.usertype = {
        id: 0
      } as Usertype;
      this.modal.show();
    }
  }
  save() {
    if (this.usertype.id === 0) {
      // add
      console.log(this.usertype.id +'a1a');
      console.log(this.usertype);
      this.usertypeService.add(this.usertype).subscribe(res => {
        if (res.errorCode === 0) {
          this.usertypeService.getAll().subscribe(resList => {
            this.usertypes = resList.data;
            this.modal.hide(); 
          });
        }
      });
    } else {
      this.usertypeService.put(this.usertype).subscribe(res => {
        if (res.errorCode === 0) {
          this.usertypeService.getAll().subscribe(resList => {
            this.usertypes = resList.data;
            this.modal.hide();
          });
        }
      });
    }
  }
   Edit(event ,id:number) {
    event.preventDefault();
    let temp = "#edit_"+id;
    let temp2 = "#field_"+id;
    $(temp).prop("disabled",true);
    $(temp2).prop("disabled",false);
  }
  confirmDelete(event, id) {
    event.preventDefault();
    this.pnotify.showConfirm(confirmed => {
      if (confirmed) {
        this.usertypeService.Delete(id).subscribe(res => {
          // refresh usertypes array
          const deletedItem = this.usertypes.find( x => x.id === id);
          const index = this.usertypes.indexOf(deletedItem);
          this.usertypes.splice(index, 1);
        });
      }
    });
  }
}

