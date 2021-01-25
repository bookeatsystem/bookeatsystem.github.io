window.myGlobalSpace= {};
window.myGlobalSpace.username= "None";
window.myGlobalSpace.password= "None";

window.myGlobalSpace.intervalReservations= "None";
window.myGlobalSpace.reservations= [];
window.myGlobalSpace.currentDisplayedReservations= 0;

wakeUpServer= () => {
  let data= [];
  data.push("None");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Server is up!")
      // alert ("Okay");
      // let table= JSON.parse(JSON.parse(this.responseText).Message);
    } else if (this.readyState == 4 && this.status != 200) {
      // alert ("Error: " + this.responseText);
    }
  };
  xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/wakeUp", true);
  xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
  xhttp.send(JSON.stringify(data));
}

wakeUpServer();

showView = (v) => {
    m= document.getElementById(v)
    m.hidden= false;

    all = document.getElementsByClassName("myView");
    for (let i= 0; i < all.length; i++){
        if (m== all[i]) {
            continue;
        }
        all[i].hidden= true;
    }

    m.hidden= false;
  }

function jump(h){
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}

  document.getElementById("cmdLogIn").onclick= () => {
    let username= document.getElementById("username").value;
    let password= document.getElementById("password").value;

    window.myGlobalSpace.username= username;
    window.myGlobalSpace.password= password;
    window.myGlobalSpace.reservations= [];

    let data= [];
    data.push(username);
    data.push(password);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Authenticated successfully!");
        document.getElementById("username").value= "";
        document.getElementById("password").value= "";
        document.getElementById("reservationList").innerHTML= "";
        document.getElementById("cmdLogOut").hidden= false;
        document.getElementById("sectionLogin").hidden= true;
        document.getElementById("sectionReservations").hidden= false;
        jump("sectionReservations");
        window.myGlobalSpace.currentDisplayedReservations= 0;
        window.myGlobalSpace.intervalReservations = setInterval(updateReservations, 1000);

      } else if (this.readyState == 4 && this.status == 401) {
        alert ("Error: Wrong Username or Password!");
      } else if (this.readyState == 4 && this.status != 200) {
        alert ("Error: Please try again in a few minutes.");
      }
    };
    xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/authenticate", true);
    xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhttp.send(JSON.stringify(data));
  }

  document.getElementById("cmdLogOut").onclick= () => {
    clearInterval(window.myGlobalSpace.intervalReservations);
    window.myGlobalSpace.username= "";
    window.myGlobalSpace.password= "";
    window.myGlobalSpace.reservations= [];
    window.myGlobalSpace.currentDisplayedReservations= 0;
    document.getElementById("username").value= "";
    document.getElementById("password").value= "";
    document.getElementById("reservationList").innerHTML= "";
    document.getElementById("cmdLogOut").hidden= true;
    document.getElementById("sectionLogin").hidden= false;
    document.getElementById("sectionReservations").hidden= true;
    jump("sectionLogin");
  }

  function updateReservations () {
    let username= window.myGlobalSpace.username;
    let password= window.myGlobalSpace.password;

    let data= [];
    data.push(username);
    data.push(password);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        window.myGlobalSpace.reservations= JSON.parse(JSON.parse(this.responseText).reservations);
        let reservations= window.myGlobalSpace.reservations;
        for (let i= 0; i < reservations.length; i++) {
          reservations[i]= JSON.parse (reservations[i])
        }
        // console.log (reservations);
        updateReservationsView(reservations);

      } else if (this.readyState == 4 && this.status != 200) {
        
      }
    };
    xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/getReservations", true);
    xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhttp.send(JSON.stringify(data));
  }
 
  updateReservationsView= (reservations) => {
    let reservationList= document.getElementById("reservationList");
    let curr= window.myGlobalSpace.currentDisplayedReservations;

    // Update Status of already loaded reservations
    for (let i= 0; i < curr; i++) {
      try {
        let status= document.getElementById("index"+i).children[0].children[0].children[0].children[0].children[0];
        status.innerHTML= reservations[i]['status'];
        // if (reservations[i]['status']!= "Waiting Confirmation"){
        //   document.getElementById("index"+i).hidden= true;
        // }
      } catch (error) {
        // Reservation's status is not "Waiting Confirmation" and probably was never created
        // console.error(error);
      }
    }

    // Add new reservations
    for (let i= curr; i < reservations.length; i++) {
      let templateReservationCard = document.getElementById("templateReservationCard");
      let card= templateReservationCard.cloneNode(true);
      card.id= "index"+i;
      card.hidden= false;

      let status= card.children[0].children[0].children[0].children[0].children[0];
      let name= card.children[0].children[0].children[0].children[1].children[0];
      let email= card.children[0].children[0].children[0].children[2].children[0];
      let phone= card.children[0].children[0].children[0].children[3].children[0];
      let date= card.children[0].children[0].children[0].children[4].children[0];
      let inputTime= card.children[0].children[0].children[0].children[5].children[0];
      let people= card.children[0].children[0].children[0].children[6].children[0];
      let message= card.children[0].children[0].children[0].children[7].children[0];

      let chkBabyChair= card.children[0].children[0].children[0].children[8].children[0];
      let chkDisabledPerson= card.children[0].children[0].children[0].children[8].children[3];
      let chkCloseToTv= card.children[0].children[0].children[0].children[8].children[6];
      let radioFood= card.children[0].children[0].children[0].children[9].children[0];
      let radioDrink= card.children[0].children[0].children[0].children[9].children[3];
      let radioBoth= card.children[0].children[0].children[0].children[9].children[6];
      let radioSmoker= card.children[0].children[0].children[0].children[10].children[0];
      let radioNonSmoker= card.children[0].children[0].children[0].children[10].children[3];

      status.innerHTML= reservations[i]['status'];
      name.value= reservations[i]['name'];
      email.value= reservations[i]['email'];
      phone.value= reservations[i]['phone'];
      date.value= reservations[i]['date'];
      inputTime.value= reservations[i]['inputTime'];
      people.value= reservations[i]['people'];
      message.value= reservations[i]['message'];

      chkBabyChair.checked= reservations[i]['chkBabyChair'];
      chkDisabledPerson.checked= reservations[i]['chkDisabledPerson'];
      chkCloseToTv.checked= reservations[i]['chkCloseToTv'];
      radioFood.checked= reservations[i]['radioFood'];
      radioDrink.checked= reservations[i]['radioDrink'];
      radioBoth.checked= reservations[i]['radioBoth'];
      radioSmoker.checked= reservations[i]['radioSmoker'];
      radioNonSmoker.checked= reservations[i]['radioNonSmoker'];

      let btnConfirm= card.children[0].children[0].children[0].children[11].children[0];
      let btnReject= card.children[0].children[0].children[0].children[11].children[1];
      btnConfirm.onclick= createUpdateStatusButton (i, "Confirmed");
      btnReject.onclick= createUpdateStatusButton (i, "Rejected");

      // if (reservations[i]['status']!= "Waiting Confirmation"){
      //   continue;
      // }

      reservationList.insertBefore(card, reservationList.firstChild);
    }

    window.myGlobalSpace.currentDisplayedReservations= reservations.length;
  }


  createUpdateStatusButton= (index, updatedStatus)=> {
    return ()=> {
      let username= window.myGlobalSpace.username;
      let password= window.myGlobalSpace.password;

      let i= index;
      let status= updatedStatus;
  
      let data= [];
      data.push(username);
      data.push(password);
      data.push(i);
      data.push(status);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log ("Successful Status Update");

        } else if (this.readyState == 4 && this.status != 200) {
          console.log ("Error on Status Update: " + this.responseText);
        }
      };
      xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/updateResrvationStatus", true);
      xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
      xhttp.send(JSON.stringify(data));

      alert ('The reservation status has been successfully changed to"' + status + '"');
    }
  }

  // document.getElementById("cmdBookFormSubmit").onclick= () => {
  //   let restaurantID= document.getElementById("restaurant").value;
  //   let restaurantName= document.getElementById("lblName").innerHTML;

  //   let name= document.getElementById("name").value;
  //   let email= document.getElementById("email").value;
  //   let phone= document.getElementById("phone").value;
  //   let date= document.getElementById("date").value;
  //   let inputTime= document.getElementById("inputTime").value;
  //   let people= document.getElementById("people").value;
  //   let message= document.getElementById("message").value;

  //   let chkBabyChair= document.getElementById("chkBabyChair").checked;
  //   let chkDisabledPerson= document.getElementById("chkDisabledPerson").checked;
  //   let chkCloseToTv= document.getElementById("chkCloseToTv").checked;
  //   let radioFood= document.getElementById("radioFood").checked;
  //   let radioDrink= document.getElementById("radioDrink").checked;
  //   let radioBoth= document.getElementById("radioBoth").checked;
  //   let radioSmoker= document.getElementById("radioSmoker").checked;
  //   let radioNonSmoker= document.getElementById("radioNonSmoker").checked;

  //   if (name== "" || email== "" || phone== "" || date== "" || inputTime== "" || people== ""){
  //     alert("Error: Please fill in all fields in the form.");
  //     return;
  //   }

  //   if (!radioFood && !radioDrink && !radioBoth){
  //     alert("Error: Please select Food, Drink or Both.");
  //     return;
  //   }

  //   if (!radioSmoker && !radioNonSmoker){
  //     alert("Error: Please select Smoker or Non-Smoker.");
  //     return;
  //   }

  //   // Clear fields
  //   document.getElementById("name").value= "";
  //   document.getElementById("email").value= "";
  //   document.getElementById("phone").value= "";
  //   document.getElementById("date").value= "";
  //   document.getElementById("inputTime").value= "";
  //   document.getElementById("people").value= "";
  //   document.getElementById("message").value= "";

  //   document.getElementById("chkBabyChair").checked= false;
  //   document.getElementById("chkDisabledPerson").checked= false;
  //   document.getElementById("chkCloseToTv").checked= false;
  //   document.getElementById("radioFood").checked= false;
  //   document.getElementById("radioDrink").checked= false;
  //   document.getElementById("radioBoth").checked= false;
  //   document.getElementById("radioSmoker").checked= false;
  //   document.getElementById("radioNonSmoker").checked= false;

  //   // Send Form
  //   let data={};
  //   data['restaurantID']= restaurantID;
  //   data['restaurantName']= restaurantName;
  //   data['name']= name;
  //   data['email']= email;
  //   data['phone']= phone;
  //   data['date']= date;
  //   data['inputTime']= inputTime;
  //   data['people']= people;
  //   data['message']= message;
  //   data['chkBabyChair']= chkBabyChair;
  //   data['chkDisabledPerson']= chkDisabledPerson;
  //   data['chkCloseToTv']= chkCloseToTv;
  //   data['radioFood']= radioFood;
  //   data['radioDrink']= radioDrink;
  //   data['radioBoth']= radioBoth;
  //   data['radioSmoker']= radioSmoker;
  //   data['radioNonSmoker']= radioNonSmoker;
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       alert("Thank you for booking a table with us!\n\nPlease expect a confirmation from the restaurant soon.");
  //     } else if (this.readyState == 4 && this.status != 200) {
  //       alert ("Error: Something went wrong with your reservation, please try again later.");
  //       console.log(this.responseText);
  //     }
  //   };
  //   xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/sendReservationForm", true);
  //   xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
  //   xhttp.send(JSON.stringify(data));

  //   showView("vwSearch");
  //   jump("book-eat-app");
  // }

  // all = document.getElementsByClassName("BookEatButton");
  // for (let i= 0; i < all.length; i++){
  //     let myId= all[i].children[0].innerHTML;
  //     window.myGlobalSpace.allRestID.push(myId);
  //     let myButton= all[i];
  //     myButton.onclick= () => {
  //       window.myGlobalSpace.RestID= myId;
  //       document.getElementById("restaurant").value= myId;
  //       document.getElementById("lblName").innerHTML= document.getElementById(myId + "Name").innerHTML;
  //       showView("vwBookForm");
  //       jump("book-eat-app");
  //     }
  // }

  // document.getElementById("cmdSendMessage").onclick= () => {
  //   let name= document.getElementById("contactName").value;
  //   let email= document.getElementById("contactEmail").value;
  //   let subject= document.getElementById("contactSubject").value;
  //   let message= document.getElementById("contactMessage").value;

  //   if (name== "" || email== "" || subject== "" || message== ""){
  //     alert("Error: Please fill in all fields in the form.");
  //     return;
  //   }

  //   // Clear fields
  //   document.getElementById("contactName").value= "";
  //   document.getElementById("contactEmail").value= "";
  //   document.getElementById("contactSubject").value= "";
  //   document.getElementById("contactMessage").value= "";

  //   // Send Form
  //   let data={};
  //   data['name']= name;
  //   data['email']= email;
  //   data['subject']= subject;
  //   data['message']= message;
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       alert("Thank you for your message!");
  //     } else if (this.readyState == 4 && this.status != 200) {
  //       alert ("Error: Something went wrong, please try again later.");
  //       console.log(this.responseText);
  //     }
  //   };
  //   xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/sendContactFormMessage", true);
  //   xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
  //   xhttp.send(JSON.stringify(data));
  // }

  // document.getElementById("txtSearch").oninput= () => {
  //   let q= document.getElementById("txtSearch").value.toUpperCase();
  //   let res= [];
  //   let all= window.myGlobalSpace.allRestID;
  //   for (let i= 0; i < all.length; i++) {
  //     let name= document.getElementById(all[i]+"Name").innerHTML.toUpperCase();
  //     let address= document.getElementById(all[i]+"Address").innerHTML.toUpperCase();
  //     let cuisine= document.getElementById(all[i]+"Cuisine").innerHTML.toUpperCase();
  //     let keywords= document.getElementById(all[i]+"Keywords").innerHTML.toUpperCase();
  //     if (name.includes(q) || address.includes(q) || cuisine.includes(q) || keywords.includes(q)) {
  //       res.push(all[i]);
  //     }
  //   }
  //   showRestCards(res);
  // }