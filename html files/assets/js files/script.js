const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';
const VALUE_COLOR = 'white';
var size;
var delay;

const MIN_SIZE = 4;
const MAX_SIZE = 64;

const MIN_SPEED = 1;
const MAX_SPEED = 4;
const DEFAULT_SPEED = 5;

const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;

var arr = new Array();
let algoSelected;
var array_container_width;
var element_width;
var element_width_max;
var margin_element;
//reading from file

document.getElementById("formFileMultiple").addEventListener("change", function () {

    //event.preventDefault();
    let text;
    // let myArray;
    var fr = new FileReader();
    fr.onload = function () {
        text = fr.result;
        var myArray = new Array();
        myArray = text.split(',');
        size = myArray.length;
        console.log(size);
        for (var i = 0; i < size; i++) {
            arr.push(parseInt(myArray[i]));
            //console.log(typeof(arr[i]));
        }
        findElementWidth()
        updateValues();
        createArray();
    }

    fr.readAsText(this.files[0]);


});
function updateValues() {
    array_container_width = Math.floor($("#array-container").width());
    element_width_max = Math.floor(array_container_width / 20);

    margin_element = 2;
    if (parseInt($(window).width()) < 1200)
        margin_element = 1;
}

function findElementWidth() {
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;


}

function createArray() {
    //arr = [];
    $("#array").html('');
    //console.log('Ammar');
    //console.log(size);
    if(size>64){
        element_width = 4;
    }
    if(size>1000){
        element_width = 0.5;
    }
    else {
        element_width = 100;
    }
    for (var i = 0; i < size; i++) {

        var $element = $('<div>');
        $element.attr('id', "e" + i);
        $element.attr('class', "element");

        $element.css('background-color', UNSORTED);
        $element.css('width', element_width.toString() + 'px');
        $element.css('height', arr[i].toString() + 'px');

        //$element.append(n.toString());
        $element.css('margin-left', margin_element + 'px');
        $element.css('margin-right', margin_element + 'px');
        // $element.text(n.toString());
        // $(`.element`).text(n.toString());
        // $(`#e${'i'}`).append(n.toString());
        $element.appendTo("#array");


    }

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function setHeight(id, height) {
    $("#e" + id).css('height', height);
}

function setColor(id, color) {
    $("#e" + id).css('background-color', color);
}

function setColorRange(p, r, color) {
    for (var i = p; i <= r; i++)
        $("#e" + i).css('background-color', color);
}

function swap(a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    var h1 = $("#e" + a).css('height');
    var h2 = $("#e" + b).css('height');

    setHeight(a, h2);
    setHeight(b, h1);
}