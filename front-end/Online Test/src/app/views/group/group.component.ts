import { Component, OnInit, ViewChild } from '@angular/core';
import { Group, GroupService } from '../../services/group.service';
import { ModalDirective } from 'ngx-bootstrap';
import { PnotifyService } from '../../services/pnotify.service';
import { LabService, Lab } from '../../services/lab.service';
import { SubjectService, Subject } from '../../services/subject.service';
import { SemesterService, Semester } from '../../services/semester.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: [Group];
  labs: [Lab];
  semesters: [Semester];
  subjects: [Subject]

  group: Group = {} as Group;
  pnotify = undefined;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;

  constructor(  private groupService: GroupService,
                private pnotifyService: PnotifyService,
                private labService: LabService,
                private subjectService: SubjectService,
                private semesterService: SemesterService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.labService.getAll().subscribe(res => {
      console.log(res);
      this.labs = res.data;
    });

    this.subjectService.getAll().subscribe(res => {
      console.log(res);
      this.subjects = res.data;
    });

    this.semesterService.getAll().subscribe(res => {
      console.log("semester");
      console.log(res);

      this.semesters = res.data;
    });

    this.groupService.getAll().subscribe(res => {
      this.groups = res.data;
    });
  }

  showModal(event = null, id: Number = 0) {
    if (event != null) {
      event.preventDefault();
    }
    if (id > 0) {
      this.groupService.get(id).subscribe(res => {
        this.group = res.data;
        $("#modal_title").html("Sửa Group");
        this.modal.show();
      });
    }
    else {
      this.group = {
        id: 0
      } as Group
      $("#modal_title").html("Thêm Group");
      this.modal.show();
    }
  }

  save() {
    if (this.group.id === 0) {
      this.groupService.add(this.group).subscribe(res => {
        console.log(res);
        if (res.errorCode === 0) {
          this.groupService.getAll().subscribe(resList => {
            this.groups = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Thêm Group ' + res.data.grpname + ' thành công!'
            });
          });
        }
      });
    }
    else {
      this.groupService.put(this.group).subscribe(res => {
        if (res.errorCode === 0) {
          this.groupService.getAll().subscribe(resList => {
            this.groups = resList.data;
            this.modal.hide();
            this.pnotify.success({
              title: 'Thông báo',
              text: 'Edit Group ' + res.data.grpname + ' thành công!'
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
    var temp = "#groupname_" + id;
    $("#delete_message").html("Xóa " + $(temp).html() + " ?");
    this.modalDelete.show();
  }

  delete() {
    let id = $("#id_delete").val();
    this.groupService.delete(id).subscribe(res => {
      if (res.errorCode === 0) {
        const deletedItem = this.groups.find(x => x.id == id);
        const index = this.groups.indexOf(deletedItem);
        this.groups.splice(index, 1);
        this.modalDelete.hide();
        this.pnotify.success({
          title: 'Thông báo',
          text: 'Xóa Group ' + res.data.grpname + ' thành công!'
        });
      }
    })
  }

}
