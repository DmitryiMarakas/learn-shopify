class Cookie {
    constructor(name) {
        this.name = name;
    }

    set(value, daysToExpire) {
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);

        var expires = "; expires=" + expirationDate.toUTCString();

        document.cookie = this.name + "=" + value + expires + "; path=/";
    }

    get() {
        var nameEQ = this.name + "=";
        var ca = document.cookie.split(';');

        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }

        return null;
    }
}

var vclidCookie = new Cookie("vclidCookie");

var vclid = new URLSearchParams(window.location.search).get("vclid");
if (vclid) {
    vclidCookie.set(vclid, 3);
}

var vclidValue = vclidCookie.get();
if(vclidValue) {
    var noteField = document.querySelector("textarea[name='note']");
    noteField.value = vclidValue;
}

