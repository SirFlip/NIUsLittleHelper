class User {
    constructor() {
        this.dnr = 0;
        this.name = "";
        this.bezirkstelle = "";
        this.isFunktionaer = false;
        this.dnrvon = 0;
        this.dnrbis = 0;
        this.setDnr = function (dnr) {
            this.dnr = dnr;
            this.getDienststelleFromDienstnummer();
        }
        this.getDnr = function () {
            return this.dnr;
        }
        this.setName = function(name) {
            this.name = name;
        }
        this.getName = function () {
            return this.name;
        }
        this.setIsFunktionaer = function (isFunktionaer) {
            this.isFunktionaer = isFunktionaer;
        }
        this.getIsFunktionaer = function () {
            return this.isFunktionaer;
        }
        this.getDnrVon = function(){
            return this.dnrvon;
        }
        this.getDnrBis = function (){
            return this.dnrbis;
        }
        this.getDnrRange = function (){
            return this.dnrvon + "-" + this.dnrbis;
        }
        this.getDienststelleFromDienstnummer = function () {

            if (this.dnr != 0) {
                if (this.dnr.toString().length == 4) {
                    switch (this.dnr.toString().substr(0, 1)) {
                        case "1":
                            this.bezirkstelle = "West";
                            this.dnrvon = 1000;
                            this.dnrbis = 1999;
                            break;
                        case "2":
                            this.bezirkstelle = "Van Swieten";
                            this.dnrvon = 2000;
                            this.dnrbis = 2999;
                            break;
                        case "3":
                            this.bezirkstelle = "Bertha Van Suttner";
                            this.dnrvon = 3000;
                            this.dnrbis = 3999;
                            break;
                        case "6":
                            this.bezirkstelle = "Hauptamtlich";
                            this.dnrvon = 6000;
                            this.dnrbis = 6999;
                            break;
                        case "7":
                            this.bezirkstelle = "DDr. Lauda";
                            this.dnrvon = 7000;
                            this.dnrbis = 7999;
                            break;
                        case "8":
                            this.bezirkstelle = "Nord";
                            this.dnrvon = 8000;
                            this.dnrbis = 8999;
                            break;
                        default:
                            this.bezirkstelle = "Couldn't parse";
                            break;
                    }
                } else if (this.dnr.length == 3) {
                    switch (this.dnr.toString().substr(0, 1)) {
                        case "7":
                            this.bezirkstelle = "Grünes Kreuz";
                            break;
                        case "8":
                            this.bezirkstelle = "Bundesheer || KHD Sondernummer";
                            break;
                        case "9":
                            this.bezirkstelle = "Zivildiener";
                            break;
                    }
                } else {
                    this.bezirkstelle = "Sondernummer";
                }
            }
        }
    }
}



var getUser = new Promise(
    function (resolve, reject) {
        var user;
        return $.get("https://niu.wrk.at/Kripo/Header.aspx")
            .then(function (data) {
                user = new User();
                var header = $('<output>').append($.parseHTML(data));
                var username = $('#userName', header);
                var uname = $.trim(username[0].innerText);
                var klaufpos = uname.indexOf("(");
                var klzupos = uname.indexOf(")");
                user.setName(uname.substr(0, klaufpos - 1));
                user.setDnr(parseInt(uname.substr(klaufpos + 1, klzupos-1)));
                if (user) {
                    resolve(user);
                } else {
                    var reason = new Error('User konnte nicht geparst werden');
                    reject(reason);
                }
            });
    });
