let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
if (!isMobile.any()) {
    window.addEventListener('resize', function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
} else {
    function handleOrientationChange(event) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    var mql = matchMedia("(orientation:portrait)");
    mql.onchange = handleOrientationChange;

}

const flight_btns = document.querySelectorAll('.flight-card__btn');

for (let index = 0; index < flight_btns.length; index++) {
    let flight_btn = flight_btns[index]
    let flight_btn_val = flight_btn.getAttribute('data-val')
    let flight_btn_txt = flight_btn.getAttribute('data-txt')
    flight_btn.addEventListener('click', function() {
        const selectParent = document.getElementsByTagName('select')[0];
        const select_opts = document.querySelectorAll('.select__option');
        const selectVal = document.querySelectorAll('.select__value');

        selectParent.value = flight_btn_val
        for (let idx = 0; idx < select_opts.length; idx++) {
            const select_opt = select_opts[idx]
            if (select_opt.getAttribute('data-value') === flight_btn_val) {
                selectVal[0].innerHTML = '<span>' + select_opt.innerHTML + '</span>'

                select_opt.style.display = 'none'
            } else {
                select_opt.style.display = 'block'
            }
        }
    })
}

"use strict";

function r(f) { /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f() }
r(function() {
    if (!document.getElementsByClassName) {
        // IE8 support
        var getElementsByClassName = function(node, classname) {
            var a = [];
            var re = new RegExp('(^| )' + classname + '( |$)');
            var els = node.getElementsByTagName("*");
            for (var i = 0, j = els.length; i < j; i++)
                if (re.test(els[i].className)) a.push(els[i]);
            return a;
        }
        var videos = getElementsByClassName(document.body, "youtube");
    } else {
        var videos = document.getElementsByClassName("youtube");
    }

    var nb_videos = videos.length;
    for (var i = 0; i < nb_videos; i++) {
        // Based on the YouTube ID, we can easily find the thumbnail image
        videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

        // Overlay the Play icon to make it look like a video player
        var play = document.createElement("div");
        play.setAttribute("class", "play");
        videos[i].appendChild(play);

        videos[i].onclick = function() {
            // Create an iFrame with autoplay set to true
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
            iframe.setAttribute("src", iframe_url);
            iframe.setAttribute("frameborder", '0');

            // The height and width of the iFrame should be the same as parent
            iframe.style.width = this.style.width;
            iframe.style.height = this.style.height;

            // Replace the YouTube thumbnail with YouTube Player
            this.parentNode.replaceChild(iframe, this);
        }
    }
});