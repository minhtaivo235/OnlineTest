import { Component, OnInit, ViewChild } from '@angular/core';
import { TakerService, ATakerResult ,Taker} from '../../services/taker.service';
import { Router } from '@angular/router';

import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-Taker',
  templateUrl: './Taker.component.html',
  styleUrls: ['./Taker.component.scss']
})
export class TakerComponent implements OnInit {
  Takers: [Taker];
  Taker: Taker = {} as Taker;
  @ViewChild('modal') modal: ModalDirective;
  constructor(private TakerService: TakerService, private router: Router,
    private pnotify: PnotifyService) {
  }
  ngOnInit() {
    this.TakerService.getAll().subscribe(res => {
      console.log(res);
        this.Takers = res.data;
    });
  }
  // showModal(event = null, id: Number = 0) {
  //   if (event != null) {
  //     event.preventDefault();
  //   }
  //   if (id > 0) {
  //     for (let i = 1; i <= 7; i++) {
  //       let temp = "#edit_" + i;
  //       let temp2 = "#field_" + i;

  //       $(temp).show();

  //       $(temp2).addClass("w-75").removeClass("is-invalid");
  //       $(temp2).prop("disabled", true);
  //     }
  //     let temp3 ="#field3";
  //     $(temp3).addClass("w-75").removeClass("is-invalid");
  //     $(temp3).prop("disabled", true);
  //     this.TakerService.get(id).subscribe(res => {
  //       console.log(res);
  //       this.Taker = res.data;
  //       this.modal.show();
  //       //$("input").attr("disabled");
         
  //        // $('input[type="text"]').attr("disabled");

  //     });
  //   } else {
  //     for (let i = 1; i <= 7; i++) {
  //       let temp = "#edit_" + i;
  //       let temp2 = "#field_" + i;
  //       $(temp).hide();
  //       $(temp2).removeClass("w-75 is-invalid");
  //       $(temp2).prop("disabled", false);
  //     }
  //     let temp3 ="#field3";
  //     $(temp3).removeClass("w-75 is-invalid");
  //     $(temp3).prop("disabled", false);
  //     this.Taker = {
  //       id: 0
  //     } as Taker;
  //     this.modal.show();
  //   }
  // }
  // save() {
  //   if (this.Taker.id === 0) {
  //     // add
  //     let ms = "#field_1";
  //     let email =$("#field_5").val().toString();
  //     var regex = /((09|03|07|08|05)+([0-9]{8})\b)/;
  //     //var ktdt = isNaN(sdt);
  //     let aCong=email.indexOf("@");
  //     let dauCham = email.lastIndexOf(".");
  //     for (let i =0 ;i < this.Takers.length;i++){
  //       if($(ms).val() == this.Takers[i].takid){
  //         alert("Mã Số SV đã tồn tại");
  //         return false ;
  //       }
  //     }
  //     console.log(aCong);
  //     if(aCong < 1 ||(dauCham+2>email.length) || (dauCham<aCong+2)  ){
  //       alert("Email không hợp lệ");
  //       return false;
  //     }
  //     if(regex.test($("#field_6").val().toString()) == false){
  //       alert("Vui lòng nhập đúng định dạng SDT");
  //       return false;
  //     }

  //     console.log(this.Taker);
  //     this.TakerService.add(this.Taker).subscribe(res => {
  //       if (res.errorCode === 0) {
  //         this.TakerService.getAll().subscribe(resList => {
  //           this.Takers = resList.data;
  //           this.modal.hide(); 
  //         });
  //       }
  //     });
  //   } else {
  //     this.TakerService.put(this.Taker).subscribe(res => {
  //       if (res.errorCode === 0) {
  //         this.TakerService.getAll().subscribe(resList => {
  //           this.Takers = resList.data;
  //           this.modal.hide();
  //         });
  //       }
  //     });
  //   }
  // }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  // close() {
  //   this.modal.hide();
  // }

  //  Edit(event ,id:number) {
  //   event.preventDefault();
  //   let temp = "#edit_"+id;
  //   let temp2 = "#field_"+id;
  //   $(temp).prop("disabled",true);
  //   $(temp2).prop("disabled",false);
  // }
  // confirmDelete(event, id) {
  //   event.preventDefault();
  //   this.pnotify.showConfirm(confirmed => {
  //     if (confirmed) {
  //       this.TakerService.Delete(id).subscribe(res => {
  //         // refresh Takers array
  //         const deletedItem = this.Takers.find( x => x.id === id);
  //         const index = this.Takers.indexOf(deletedItem);
  //         this.Takers.splice(index, 1);
  //       });
  //     }
  //   });
  // }
}

