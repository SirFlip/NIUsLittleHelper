$(document).ready(function() {

  dnrToIdentifier().then(
    function(result) {
      console.log("success" + result);
    },
    function() {
      console.log("error");
    }
  )

  var exportTable = $("#ctl00_main_m_Panel  table  table");
//#ctl00_main_m_Panel > table > tbody > tr:nth-child(2) > td > table
  //exportTable.hide();

  var header = $("#ctl00_m_Header");

  var clicked = {};

  var path = chrome.extension.getURL("src/webcontent/employee_dump_menu.html");
  console.log("path: " + path);
  $.get(path, function(data) {

    header.after(data);
    //data.menu();
    $("#menu").menu();


    $("#rddienste").click(function() {
      console.log("rddienste gecklickt!");
      if ("rddienste" in clicked) {
        return;
      }
      clicked["rddienste"] = true;


      exportTable.find("tr:gt(0)").append("<td class='rddienste'>berechne...rddienste</td>");
      exportTable.find("tr:first").append("<th>Dienste d. l. 6 Monate</th>");

      //TODO: starte berechnung
      exportTable.find("tr:gt(0)").each(function(index, element) {
          var dnr = element.find("td:first").text();
      });

    });

    $("#sandienststunden").click(function() {
      console.log("sandienststunden gecklickt");
      if ("sandienststunden" in clicked) {
        return;
      }
      clicked["sandienststunden"] = true;

      exportTable.find("tr:gt(0)").append("<td class='dienststunden'>berechne...dienststunden</td>");
      exportTable.find("tr:first").append("<th>Dienststunden d. l. 6 Monate</th>");

    });
  });

});