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

  function jump(h){
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}

  document.getElementById("cmdBookFormBack").onclick= () => {
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