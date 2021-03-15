window.myGlobalSpace= {};
window.myGlobalSpace.allRestID= [];
window.myGlobalSpace.RestID= "None";

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

  showRestCards = (res) => {
    let all = document.getElementsByClassName("myRestCard");
    for (let i= 0; i < all.length; i++){
        if (res.includes(all[i].id)) {
          all[i].hidden= false;
        } else {
          all[i].hidden= true;
        }
    }
  }


  document.getElementById("cmdBookFormBack").onclick= () => {
    showView("vwSearch");
    jump("book-eat-app");
  }

  document.getElementById("cmdBookFormSubmit").onclick= () => {
    let restaurantID= document.getElementById("restaurant").value;
    let restaurantName= document.getElementById("lblName").innerHTML;

    let name= document.getElementById("name").value;
    let email= document.getElementById("email").value;
    let phone= document.getElementById("phone").value;
    let date= document.getElementById("date").value;
    let inputTime= document.getElementById("inputTime").value;
    let people= document.getElementById("people").value;
    let message= document.getElementById("message").value;

    let chkBabyChair= document.getElementById("chkBabyChair").checked;
    let chkDisabledPerson= document.getElementById("chkDisabledPerson").checked;
    let chkCloseToTv= document.getElementById("chkCloseToTv").checked;
    let radioFood= document.getElementById("radioFood").checked;
    let radioDrink= document.getElementById("radioDrink").checked;
    let radioBoth= document.getElementById("radioBoth").checked;
    let radioSmoker= document.getElementById("radioSmoker").checked;
    let radioNonSmoker= document.getElementById("radioNonSmoker").checked;

    document.getElementById("name").classList.remove("wrongValue")
    document.getElementById("email").classList.remove("wrongValue")
    document.getElementById("phone").classList.remove("wrongValue")
    document.getElementById("date").classList.remove("wrongValue")
    document.getElementById("inputTime").classList.remove("wrongValue")
    document.getElementById("people").classList.remove("wrongValue")
    document.getElementById("divFoodDrinkBoth").classList.remove("wrongValue")
    document.getElementById("divSmokerNonSmoker").classList.remove("wrongValue")

    if (name== ""){
      document.getElementById("name").classList.add("wrongValue")
    }

    if (email== ""){
      document.getElementById("email").classList.add("wrongValue")
    }

    if (phone== ""){
      document.getElementById("phone").classList.add("wrongValue")
    }

    if (date== ""){
      document.getElementById("date").classList.add("wrongValue")
    }

    if (inputTime== ""){
      document.getElementById("inputTime").classList.add("wrongValue")
    }

    if (people== ""){
      document.getElementById("people").classList.add("wrongValue")
    }

    if (!radioFood && !radioDrink && !radioBoth){
      document.getElementById("divFoodDrinkBoth").classList.add("wrongValue")
    }

    if (!radioSmoker && !radioNonSmoker){
      document.getElementById("divSmokerNonSmoker").classList.add("wrongValue")
    }

    if (name== "" || email== "" || phone== "" || date== "" || inputTime== "" || people== ""){
      alert("Error: Please fill in all the required fields in the form.");
      return;
    }

    if (!radioFood && !radioDrink && !radioBoth){
      alert("Error: Please select Food, Drink or Both.");
      return;
    }

    if (!radioSmoker && !radioNonSmoker){
      alert("Error: Please select Smoker or Non-Smoker.");
      return;
    }

    document.getElementById("name").classList.remove("wrongValue")
    document.getElementById("email").classList.remove("wrongValue")
    document.getElementById("phone").classList.remove("wrongValue")
    document.getElementById("date").classList.remove("wrongValue")
    document.getElementById("inputTime").classList.remove("wrongValue")
    document.getElementById("people").classList.remove("wrongValue")
    document.getElementById("divFoodDrinkBoth").classList.remove("wrongValue")
    document.getElementById("divSmokerNonSmoker").classList.remove("wrongValue")

    // Clear fields
    document.getElementById("name").value= "";
    document.getElementById("email").value= "";
    document.getElementById("phone").value= "";
    document.getElementById("date").value= "";
    document.getElementById("inputTime").value= "";
    document.getElementById("people").value= "";
    document.getElementById("message").value= "";

    document.getElementById("chkBabyChair").checked= false;
    document.getElementById("chkDisabledPerson").checked= false;
    document.getElementById("chkCloseToTv").checked= false;
    document.getElementById("radioFood").checked= false;
    document.getElementById("radioDrink").checked= false;
    document.getElementById("radioBoth").checked= false;
    document.getElementById("radioSmoker").checked= false;
    document.getElementById("radioNonSmoker").checked= false;

    // Send Form
    let data={};
    data['restaurantID']= restaurantID;
    data['restaurantName']= restaurantName;
    data['name']= name;
    data['email']= email;
    data['phone']= phone;
    data['date']= date;
    data['inputTime']= inputTime;
    data['people']= people;
    data['message']= message;
    data['chkBabyChair']= chkBabyChair;
    data['chkDisabledPerson']= chkDisabledPerson;
    data['chkCloseToTv']= chkCloseToTv;
    data['radioFood']= radioFood;
    data['radioDrink']= radioDrink;
    data['radioBoth']= radioBoth;
    data['radioSmoker']= radioSmoker;
    data['radioNonSmoker']= radioNonSmoker;
    data['status']= "Waiting Confirmation";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert("Thank you for booking a table with us!\n\nPlease expect a confirmation from the restaurant soon.");
      } else if (this.readyState == 4 && this.status != 200) {
        alert ("Error: Something went wrong with your reservation, please try again later.");
        console.log(this.responseText);
      }
    };
    xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/sendReservationForm", true);
    xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhttp.send(JSON.stringify(data));

    showView("vwSearch");
    jump("book-eat-app");
  }

  all = document.getElementsByClassName("BookEatButton");
  for (let i= 0; i < all.length; i++){
      let myId= all[i].children[0].innerHTML;
      window.myGlobalSpace.allRestID.push(myId);
      let myButton= all[i];
      myButton.onclick= () => {
        window.myGlobalSpace.RestID= myId;
        document.getElementById("restaurant").value= myId;
        document.getElementById("lblName").innerHTML= document.getElementById(myId + "Name").innerHTML;
        showView("vwBookForm");
        jump("book-eat-app");
      }
  }

  document.getElementById("cmdSendMessage").onclick= () => {
    let name= document.getElementById("contactName").value;
    let email= document.getElementById("contactEmail").value;
    let subject= document.getElementById("contactSubject").value;
    let message= document.getElementById("contactMessage").value;

    if (name== "" || email== "" || subject== "" || message== ""){
      alert("Error: Please fill in all fields in the form.");
      return;
    }

    // Clear fields
    document.getElementById("contactName").value= "";
    document.getElementById("contactEmail").value= "";
    document.getElementById("contactSubject").value= "";
    document.getElementById("contactMessage").value= "";

    // Send Form
    let data={};
    data['name']= name;
    data['email']= email;
    data['subject']= subject;
    data['message']= message;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert("Thank you for your message!");
      } else if (this.readyState == 4 && this.status != 200) {
        alert ("Error: Something went wrong, please try again later.");
        console.log(this.responseText);
      }
    };
    xhttp.open("POST", "https://bookeatbackend.herokuapp.com/post/sendContactFormMessage", true);
    xhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhttp.send(JSON.stringify(data));
  }

  document.getElementById("txtSearch").oninput= () => {
    let q= document.getElementById("txtSearch").value.toUpperCase();
    let res= [];
    let all= window.myGlobalSpace.allRestID;
    for (let i= 0; i < all.length; i++) {
      let name= document.getElementById(all[i]+"Name").innerHTML.toUpperCase();
      let address= document.getElementById(all[i]+"Address").innerHTML.toUpperCase();
      let cuisine= document.getElementById(all[i]+"Cuisine").innerHTML.toUpperCase();
      let keywords= document.getElementById(all[i]+"Keywords").innerHTML.toUpperCase();
      if (name.includes(q) || address.includes(q) || cuisine.includes(q) || keywords.includes(q)) {
        res.push(all[i]);
      }
    }
    showRestCards(res);
  }