// ==UserScript==
// @name         UA Mean
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Compute marks mean
// @author       Tisila
// @match        https://paco.ua.pt/secvirtual/c_historiconotas.asp
// @grant        none
// ==/UserScript==

var marks = [];
var marksTable = document.getElementById("historico");
var marksRows = marksTable.rows;
var lastIndex = marksRows.length - 1;

for (var row in marksRows) {
    if (row >= 1 && row < lastIndex) {
        var mark = marksRows[row].cells[3].innerHTML;
        //console.log(mark);
        marks.push(parseInt(mark));
    }
}
var mean = mean(marks);
refresh(mean);

function mean(array) {
    var total = 0;
    for (var i in array) {
        total += array[i];
    }
    var totalMean = total / array.length;
    return round(totalMean,3);
}

function refresh(mean) {
    var lastRow = marksRows[lastIndex].cells[0];
    var desc = lastRow.innerHTML;
    lastRow.innerHTML = desc + "  |  Média: " + mean;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}