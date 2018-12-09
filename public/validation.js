// const myForm = document.getElementById("formCreation");

// myForm.addEventListener("submit", event => {

// });

//for calling delete routes  
$(".deleteAdmin").click(function () {

  let url = `http://localhost:3000/adminDelete/${this.id}`;

  $.ajax({                              //https://stackoverflow.com/questions/32963736/how-to-make-ajax-get-post-request-in-express-server
    method: 'DELETE',
    url: url,
    success: function (data) {
      console.log(data);
    }
  });


});

// $(".editForm").click(function () {

//   let url = `http://localhost:3000/adminEditForm/${this.id}`;

//   $.ajax({
//     method: 'PATCH',
//     url: url,
//     success: function (data) {
//       console.log(data);
//     }
//   });


// });


//for enabling edit pop-up

$(".editAdmin").click(function () {
  console.log(this.id);
  let idTitle = "title-" + this.id;
  let idDesc = "desc-" + this.id;
  let idLoc = "loc-" + this.id;
  let idDate = "date-" + this.id;
  let idTime = "time-" + this.id;
  let idAge = "age-" + this.id;
  let idSex = "sex-" + this.id;
  let idSeats = "seats-" + this.id;

  var title = document.getElementById(idTitle).innerHTML;
  $("#popup-event-name").val(title);

  var desc = document.getElementById(idDesc).innerHTML;
  $("#popup-event-des").val(desc);

  var loc = document.getElementById(idLoc).innerHTML;
  $("#popup-event-loc").val(loc);

  var date = document.getElementById(idDate).innerHTML;
  $("#popup-event-date").val(date);

  var time = document.getElementById(idTime).innerHTML;
  $("#popup-event-time").val(time);

  var age = document.getElementById(idAge).innerHTML;
  if (age == "true") {
    $("#popup-event-above18").prop("checked", true);
  }
  else {
    $("#popup-event-noRestrict").prop("checked", true);
  }


  var sex = document.getElementById(idSex).innerHTML;
  if (sex == "M") {
    $("#popup-event-male").prop("checked", true);
  }
  else if (sex == "F") {
    $("#popup-event-female").prop("checked", true);
  }
  else {
    $("#popup-event-bothGender").prop("checked", true);
  }
  // $("#popup-event-name").val(title);

  var seats = document.getElementById(idSeats).innerHTML;
  $("#popup-event-seats").val(seats);



  // $(".popup-event-name").val("title-"+this.title);

  // let url = `http://localhost:3000/getDetail/${this.id}`;

  // $.ajax({                              
  //    method: 'GET',
  //   url: url,
  //   success: function (data) {
  //     console.log(data);
  //   }
  // });


});

$('#editAdmin').on('show.bs.modal', function (event) {
  debugger;
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

