function checkLogin(){
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

     if (user === "kaviarasu" && pass === "1436") {
    window.location.href = "home.html"
    return false;
    }  else {
        alert("incorrect user name or password!");
        return false;
   
    }
}

 function speak(){
            const input = document.getElementById('text').value;
            const utterance = new SpeechSynthesisUtterance(input);
            speechSynthesis.speak(utterance);
};

// main.js
 const SubMenu = 
       document.querySelectorAll(".sub-menu"),
       btns = document.querySelectorAll("button");

const reset = () => {
    btns.forEach(btn =>
                 btn.classList.remove("active"));

                 SubMenu.forEach(menu =>
                 (menu.Style.height = 0));
};

const openSubmenu = element => {
    reset();
    element.classList.add("active");

    const sibling = element.nextElementSibling;
    const ul = sibling.querySelector("ul");

    if (sibling.clientHeight === 0) {
        sibling.style.height = '${ul.clientHeight}px';
    } else {
        sibling.style.height = 0;
        element.classList.remove("active");
    }
}

const  gotoPage = element => {
    reset();
    element.classList.add("active");
};
