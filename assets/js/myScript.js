window.myGlobalSpace= {};
window.myGlobalSpace.allRestID= [];
window.myGlobalSpace.RestID= "None";

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