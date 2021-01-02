document.state= {};

function updateSubscribersList() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var Data = JSON.parse(this.responseText);
        var results= Data.Results;
        //if(JSON.stringify(document.state)!=JSON.stringify(results)) {
            document.getElementById("myList").innerHTML= "";
            document.state= results;
            for (let i= 0; i< results.length; i++) {
                //console.log(results[i].EmailAddress);
                //console.log(results[i].Name);
    
                var itm = document.getElementById("templateRow");
                var cln = itm.cloneNode(true);
    
                cln.id= results[i].EmailAddress;
                cln.childNodes[1].innerHTML= results[i].EmailAddress;
                cln.childNodes[3].innerHTML= results[i].Name;
                cln.childNodes[5].firstChild.onclick= new makeDelete (results[i].EmailAddress);
                cln.style.display= "table-row";
    
                document.getElementById("myList").appendChild(cln);
            }
    
        //}
      } else if (this.readyState == 4 && this.status == 400) {
        alert (this.responseText);
      }
    
    };
    xhttp.open("GET", "https://list-management-task.herokuapp.com/subscribers/", true);
    xhttp.send();
}

function makeDelete(email) {
    this.email= email;

    return () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //updateSubscribersList ();
          } else if (this.readyState == 4 && this.status == 400) {
            alert (this.responseText);
          }
        };
        xhttp.open("POST", "https://list-management-task.herokuapp.com/subscribers/delete", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("email="+this.email);
    }
}

function addSubscriber() {
  email= document.getElementById("txtEmail").value;
  name= document.getElementById("txtName").value;

  document.getElementById("txtEmail").value= "";
  document.getElementById("txtName").value= "";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //updateSubscribersList ();
    } else if (this.readyState == 4 && this.status == 400) {
      alert (this.responseText);
    }
  };
  xhttp.open("POST", "https://list-management-task.herokuapp.com/subscribers/add", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("email="+email+"&name="+name);
  
}

document.getElementById("cmdAddSubscriber").onclick= addSubscriber;

updateSubscribersList ();

setInterval (updateSubscribersList, 1000);