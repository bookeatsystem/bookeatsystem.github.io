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

  document.getElementById("cmdBookFormBack").onclick= () => {
    showView("vwSearch");
    jump("book-eat-app");
  }

  all = document.getElementsByClassName("BookEatButton");
  for (let i= 0; i < all.length; i++){
      all[i].onclick= () => {
        showView("vwBookForm");
        jump("book-eat-app");
      }
  }