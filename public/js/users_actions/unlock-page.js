


(function () {
    var sl = document.querySelector("#sociallocker");
    var slc = document.querySelector("#sociallocker-content");
    if (!sl) return;
    var old_slc_html = slc.innerHTML;
    slc.innerHTML = slc.innerHTML.replace(/(href=")(.*)(\")/g, "href=\"#\"");
    sl.querySelectorAll("#sociallocker-links a").forEach(function (ele) {
      ele.onclick = function (e) {
        var web_window = window.open('/users/login', 'Share Link', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600,top=' + (screen.height / 2 - 300) + ',left=' + (screen.width / 2 - 300));
        var check_window_close = setInterval(function () {
          
          if (web_window.closed) {
            clearInterval(check_window_close);
            slc.innerHTML = old_slc_html;
            document.querySelector("#sociallocker-links").style.display = "none";

            document.querySelector(".programs-l").style.display = "none";

            document.querySelector("#sociallocker-overlay").style.display = "none";
            document.querySelector("#sociallocker-content").style.top = "0";
          }
        }, 1000);
        e.preventDefault();
      };
    });
  })();