import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, AUserResult, User } from '../../services/user.service';
import { UsertypeService, Usertype ,AUsertypeResult } from '../../services/usertype.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: [User];
  user: User = {} as User;
  usertypes: [Usertype];
  usertype: Usertype = {} as Usertype;
  samepassw :string ;
  @ViewChild('modal') modal: ModalDirective;
  constructor(private userService: UserService, private router: Router,
    private pnotify: PnotifyService ,private usertypesv : UsertypeService) {
  }
  ngOnInit() {
    this.userService.getAll().subscribe(res => {
      this.users = res.data;
    
      console.log(res.data);
    });
    this.usertypesv.getAll().subscribe(res => {
      this.usertypes = res.data ;
    });

    let utname = "#usertypename";
  }
  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      for (let i = 1; i <= 8; i++) {
        let temp = "#field_" + i;
        let tempsp = "#field" + i;
        let temp2 = "#edit_" + i;
        let temppw = "#samepw";
        // let opt ="#op_"+i;
        // $(opt).prop("selected",true);
        $(temppw).hide();
        $(temp2).show();
        $(temp).addClass("w-75").removeClass("is-invalid");
        $(temp).prop("disabled", true);
        $(tempsp).addClass("w-75").removeClass("is-invalid");
        $(tempsp).prop("disabled", true);
      }

      this.userService.get(id).subscribe(res => {
        console.log(res);
        // let opt ="#op_"+res.data.uset_id;
        // $(opt).prop("selected",true);
        //res.data.useenC_PASSWORD=null ;
        this.user = res.data;
        this.modal.show();
        //$("input").attr("disabled");

        // $('input[="text"]').attr("disabled");

      });
    } else {
      for (let i = 1; i <= 8; i++) {
        let temp = "#field_" + i;
        let tempsp = "#field" + i;
        let temp2 = "#edit_" + i;
        let temppw = "#samepw";
        $(temppw).show();
        $(temp2).hide();
        $(temp).removeClass("w-75 is-invalid");
        $(tempsp).removeClass("w-75 is-invalid");
        $(temp).prop("disabled", false);
        $(tempsp).prop("disabled", false);
      }
      this.user = {
        id: 0
      } as User;
      this.modal.show();
    }
  }
  save() {
    if (this.user.id === 0) {
  //    console.log(this.user);
      
      let temppw = "#samepass";
      let tempp = "#field_2";
      let tempms ="#messagepw";
      let ac = "#field_1";
      let email =$("#field_5").val().toString();
      var regex = /((09|03|07|08|05)+([0-9]{8})\b)/;
      //var ktdt = isNaN(sdt);
      let aCong=email.indexOf("@");
      let dauCham = email.lastIndexOf(".");
      // add
      for(var i =0 ;i< this.users.length ;i++){
        if($(ac).val() == this.users[i].useaccount ){
          alert("Tài Khoản Đã Tồn Tại");
          return false ;
        }
      }
      console.log(aCong);
      if(aCong < 1 ||(dauCham+2>email.length) || (dauCham<aCong+2)  ){
        alert("Email không hợp lệ");
        return false;
      }
      if(regex.test($("#field_6").val().toString()) == false){
        alert("Vui lòng nhập đúng định dạng SDT");
        return false;
      }     
      console.log(this.user);
      if ($(temppw).val()==$(tempp).val()) {
        console.log(this.user.id + 'a1a');
       // console.log(this.user);
       //this.user.uset_id =1 ;
       console.log(this.user);
        this.userService.add(this.user).subscribe(res => {
          if (res.errorCode === 0) {
            this.userService.getAll().subscribe(resList => {
              this.users = resList.data;
              this.modal.hide();
            });
          }
        });
        
      }else {
// $(tempms).html('Mật khẩu không khớp').css("color","red");
      }
    } else {
      console.log(this.user);
      this.userService.put(this.user).subscribe(res => {
        if (res.errorCode === 0) {
          this.userService.getAll().subscribe(resList => {
            this.users = resList.data;
            this.modal.hide();
          });
        }
      });
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  confirm(){
    let temppw = "#samepass";
    let tempp = "#field_2";
    let tempms ="#messagepw";
    if($(temppw).val()==$(tempp).val()){
      $(tempms).html('').css("color","green");
      $(tempms).show();
      return true ;
    }else {
      $(tempms).html('Mật khẩu không khớp').css("color","red");
      $(tempms).show();
      return false;
    }
  }

  close() {
    this.modal.hide();
  }

  Edit(event, id) {
    event.preventDefault();
    let temp = "#field_" + id;
    let tempsp = "#field" + id;
    let temppw = "#samepw";

    $(temp).prop("disabled", false);
    $(tempsp).prop("disabled", false);
    if (id == 2) {
      $(temppw).show();
    }
  }



  confirmDelete(event, id) {
    event.preventDefault();
    this.pnotify.showConfirm(confirmed => {
      if (confirmed) {
        this.userService.Delete(id).subscribe(res => {
          // refresh users array
          const deletedItem = this.users.find(x => x.id === id);
          const index = this.users.indexOf(deletedItem);
          this.users.splice(index, 1);
        });
      }
    });
  }
}

