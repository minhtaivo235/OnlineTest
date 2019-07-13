
function open_info (ID) {
  var table = '#sub_table_' + ID;
  var btn = '#info_btn_' + ID;
  var btn_icon = btn + ' i';
  if ($(table).is(':visible')) {
    $(table).fadeOut(500).hide();
    $(btn).removeClass().addClass('btn btn-info btn-sm text-light');
    $(btn_icon).removeClass().addClass('fa fa-eye');
  } else {
    $(table).fadeIn(500).show();
    $(btn).removeClass().addClass('btn btn-secondary btn-sm text-light');
    $(btn_icon).removeClass().addClass('fa fa-eye-slash');
  }
}
function open_update (ID){
    var name = "#subname_" + ID;
    var parent = "#type_" + ID;
    $("#input_name_sub").val($(name).html());
    $("#custom_select").val($(parent).val())
    $('#update_subject').modal("show");
}
function open_delete (ID){
    var name = "#subname_" + ID;
    $("#content_delete").html("Bạn có chắc chắn muốn xóa môn học '" + $(name).html() + "' không?");
    $("#delete_subject").modal("show");
}



function open_test_detail (ID) {
  var table = '#sub_table_' + ID;
  if ($(table).is(':visible')) {
    $(table).hide();
  } else {
    $(table).show();
  }
}


//Question.html

function edit_subject(ID){
  var editsub = "#edit_subject_" +ID ;
  $(editsub).removeAttr('disabled')
}

function edit_part(ID){
  var editsub = "#edit_part_" +ID ;
  $(editsub).removeAttr('disabled')
}

function edit_dokho(ID){
  var editlv = ".dokho" +ID ;
  $(editlv).replaceWith('<td id="dokho1"><strong>Độ khó:</strong><input placeholder="Độ khó..." ><i class="fa fa-pencil-square-o text-success" onclick="edit_dokho(1)"></i></td>')
}

//Minh Tai
function open_test_detail (ID) {
  var table = '#sub_table_' + ID;
  if ($(table).is(':visible')) {
    $(table).hide();
  } else {
    $(table).show();
  }
}

function open_delete2 (ID){
  var name = "#subname_" + ID;
  $("#delete_part").modal("show");
}

//Group
function confirmDeleteGroup(id) {
  var groupName = "#groupName_" + id;
  $("#content_delete").html("Xóa '" + $(groupName).html() + "' ?");
  $("#delete_group").modal("show");
}


function editGroup(id) {
  var groupName = "#groupName_" + id;
  var groupFullName = "#groupFullName_" + id;
  var semeter = "#groupSemeter_" + id;
  var code = "#groupCode_" + id;
  var address = "#groupAddress_" + id;
  var subject = "groupSubject_" + id;
  var status = "#groupStatus_" + id;
  $("#inputGroupID").val($(groupName).html());
  $("#inputGroupName").val($(groupFullName).html());
  $("#selectSemeter").val($(semeter).val());
  $("#inputGroupCode").val($(code).html());
  $("#selectAddress").val($(address).val());
  $("#selectSubject").val($(subject).val());
  $("#selectStatus").val($(status).val());
  $('#update_group').modal("show");
}

