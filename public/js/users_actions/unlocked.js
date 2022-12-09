var slc = document.querySelector("#sociallocker-content");
var old_slc_html = slc.innerHTML;
document.querySelector("#sociallocker-content").innerHTML = old_slc_html;
document.querySelector("#sociallocker-links").style.display = "none";

document.querySelector(".programs-l").style.display = "none";

document.querySelector("#sociallocker-overlay").style.display = "none";
document.querySelector("#sociallocker-content").style.top = "0";