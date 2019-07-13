import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';

@Injectable({
  providedIn: 'root'
})
export class PnotifyService {

  constructor() {
    PNotify.defaults.styling = 'bootstrap4'; // Bootstrap version 3
    PNotify.defaults.icons = 'fontawesome4';
   }
  getPNotify() {
    PNotifyButtons; // Initiate the module. Important!
    PNotifyConfirm;
    return PNotify;
  }
  showConfirm(callback: (confirmed: Boolean) => void){
    let notice = PNotify.notice({
      title: 'Delete',
      text: 'Are u sure aboout that, bro!',
      icon: 'fa fa-question-circle',
      hide: false,
      stack: {
        'dir1': 'down',
        'modal': true,
        'firstpos1': 25
      },
      modules: {
        Confirm: {
          confirm: true
        },
        Buttons: {
          closer: false,
          sticker: false
        },
        History: {
          history: false
        },
      }
    });
    notice.on('pnotify.confirm', function() {
      callback(true);
    });
    notice.on('pnotify.cancel', function() {
      callback(false);
    });
  }
}
