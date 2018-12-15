// const myForm = document.getElementById("formCreation");

// myForm.addEventListener("submit", event => {

// });

//to display message

let attribute = $(".modalClass").attr("data-toggle");

attribute = attribute.includes("modal");
if (attribute) {

  $('.modalClass').trigger('click');
  $(".modalClass").attr("data-toggle", "");
}


//for calling delete routes  
$(".deleteAdmin").click(function () {

  let url = `http://localhost:3000/adminDelete/${this.id}`;

  $.ajax({                              //https://stackoverflow.com/questions/32963736/how-to-make-ajax-get-post-request-in-express-server
    method: 'DELETE',
    url: url,
    success: function (data) {
      // console.log(data);

      let url = `http://localhost:3000/admin`;

      $('.modalClass').trigger('click');
      $(".modalClass").attr("data-toggle", "");

      window.location.replace(url);
     
    }
  });


});

// $(".formEdit").click(function () {

//   let url = `http://localhost:3000/adminEditForm/${this.id}`;

//   $.ajax({                              //https://stackoverflow.com/questions/32963736/how-to-make-ajax-get-post-request-in-express-server
//     method: 'POST',
//     url: url,
//     success: function (data) {
//       // console.log(data);
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
  $("#popup-event-name-" + this.id).val(title);

  var desc = document.getElementById(idDesc).innerHTML;
  $("#popup-event-des-" + this.id).val(desc);

  var loc = document.getElementById(idLoc).innerHTML;
  loc = loc.replace("|", "").trim();
  $("#popup-event-loc-" + this.id).val(loc);

  var date = document.getElementById(idDate).innerHTML;
  date = date.replace("|", "").trim();
  $("#popup-event-date-" + this.id).val(date);

  var time = document.getElementById(idTime).innerHTML;
  time = time.replace("|", "").trim();
  $("#popup-event-time-" + this.id).val(time);

  var age = document.getElementById(idAge).innerHTML;

  if (age.includes("Above")) {

    $("#popup-event-above18-" + this.id).prop("checked", true);
  }
  else {
    $("#popup-event-noRestrict-" + this.id).prop("checked", true);

  }


  var sex = document.getElementById(idSex).innerHTML;
  if (sex == "Male Event") {
    $("#popup-event-male-" + this.id).prop("checked", true);
  }
  else if (sex == "Female Event") {
    $("#popup-event-female-" + this.id).prop("checked", true);
  }
  else {
    $("#popup-event-bothGender-" + this.id).prop("checked", true);
  }
  // $("#popup-event-name").val(title);

  var seats = document.getElementById(idSeats).innerHTML;
  seats = seats.replace("Seats |", "").trim();
  $("#popup-event-seats-" + this.id).val(seats);

  $('.editForm').removeClass("disabled");

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



$('#inputName, #inputPlace, #inputDate,#inputTime,#inputSeats,#exampleTextarea').on('change', function () {  //https://stackoverflow.com/questions/41350220/enable-submit-button-if-input-and-checkbox-arent-empty
  if (allFilled()) {
    $('.review-button').removeClass("disabled");
  }
  else {
    $('.review-button').addClass("disabled");
  }
});

function allFilled() {
  let filled = true;

  if ($("#inputName").val() == "") {
    return filled = false;
  }
  else if ($("#inputPlace").val() == "") {
    return filled = false;
  }
  else if ($("#inputDate").val() == "") {
    return filled = false;
  }
  else if ($("#inputTime").val() == "") {
    return filled = false;
  }
  else if ($("#inputSeats").val() == "") {
    return filled = false;
  }
  else if ($("#exampleTextarea").val() == "") {
    return filled = false;
  }


  return filled
};


$('#popup-event-name, #popup-event-loc, #popup-event-date,#popup-event-time,#popup-event-seats,#popup-event-des').on('change', function () {  //https://stackoverflow.com/questions/41350220/enable-submit-button-if-input-and-checkbox-arent-empty
  if (allPopUpFilled()) {
    $('.editForm').removeClass("disabled");
  }
  else {
    $('.editForm').addClass("disabled");
  }
});

function allPopUpFilled() {

  let filled = true;

  if ($("#popup-event-name").val() == "") {
    return filled = false;
  }
  else if ($("#popup-event-loc").val() == "") {
    return filled = false;
  }
  else if ($("#popup-event-date").val() == "") {
    return filled = false;
  }
  else if ($("#popup-event-time").val() == "") {
    return filled = false;
  }
  else if ($("#popup-event-seats").val() == "") {
    return filled = false;
  }
  else if ($("#popup-event-des").val() == "") {
    return filled = false;
  }


  return filled

}

