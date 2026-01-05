let check = 0;

function runToggle() {
  let a = document.querySelector(".l1");
  let b = document.querySelector(".l2");
  let c = document.querySelector(".l3");
  let d = document.querySelector(".l4");
  let e = document.querySelector(".slider");

  if (check === 0) {
    a.style.top = "-50%";
    b.style.top = "-50%";
    c.style.top = "0%";
    d.style.top = "0%";
    e.style.left = "0%";
    e.style.borderRadius = "2vw 10vw 10vw 2vw";
    check = 1;
  } else {
    a.style.top = "0%";
    b.style.top = "0%";
    c.style.top = "-50%";
    d.style.top = "-50%";
    e.style.left = "50%";
    e.style.borderRadius = "10vw 2vw 2vw 10vw";
    check = 0;
  }
}
