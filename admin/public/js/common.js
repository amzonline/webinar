function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function startInterval(callback, timeout) {
    callback();
    return setInterval(callback, timeout);
}

function remainDay(unixtime, callback) {
    var gap = unixtime * 1000 - new Date().getTime();
    callback(Math.floor(gap / 86400000));
}

function remainTime(unixtime, callback) {
    var gap = unixtime * 1000 - new Date().getTime();
    var day = Math.floor(gap / 86400000);
    gap = gap - day * 86400000;
    var hour = Math.floor(gap / 3600000);
    gap = gap - hour * 3600000;
    var minute = Math.floor(gap / 60000);
    gap = gap - minute * 60000;
    var seconds = Math.floor(gap / 1000);
    callback(pad(hour, 2), pad(minute, 2), pad(seconds, 2));
}

function copyToClipboard(ememId) {
    var elem = document.getElementById(ememId);
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        // target.textContent = "";
    }
    return succeed;
}
