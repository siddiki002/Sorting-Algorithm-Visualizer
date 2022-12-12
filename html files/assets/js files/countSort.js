const UNSORTED = 'deepskyblue';
const SELECTED = 'blueviolet';
const SORTED = 'mediumspringgreen';

var size;
var arr = [];
var array_container_width;
var margin_element;
var element_width;
var element_width_max;

const MIN_SPEED = 1;
const MAX_SPEED = 6;
const DEFAULT_SPEED = 5;

const WAITING_TIME = 100;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.getElementById("formFileMultiple").addEventListener("change", function () {

    //event.preventDefault();
    let text;
    // let myArray;
    var fr = new FileReader();
    fr.onload = function () {
        text = fr.result;
        const myArray = text.split(',');
        size = myArray.length;
        for (var i = 0; i < size; i++) {
            arr.push(parseInt(myArray[i]));
            console.log(typeof(arr[i]));
        }
        findElementWidth()
        updateValues();
        createArray();
        generate_frequency();
    }

    fr.readAsText(this.files[0]);


});
function updateValues() {
    array_container_width = Math.floor($("#array-container").width());
    //element_width_max = Math.floor(array_container_width / 20);

    margin_element = 2;
    if (parseInt($(window).width()) < 1200)
        margin_element = 1;
}

function findElementWidth() {
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;

    if (element_width > element_width_max)
        element_width = element_width_max;
}

function createArray() {
    //arr = [];
    $("#array").html('');
    console.log('Ammar');
    if(size>1000){
        element_width = 0.5;
    }
    else if (size>64){
        element_width = 4;
    }
    else
    {
        element_width = 100;
    }
    //console.log(size);
    for (var i = 0; i < size; i++) {
        var elem_label = document.createElement("label");
        elem_label.classList.add("block_id");
        elem_label.innerText = arr[i];
        elem_label.style.marginLeft = margin_element + 'px';
        elem_label.style.marginRight = margin_element + 'px';
        var $element = $('<div>');
        $element.attr('id', "e" + i);
        $element.attr('class', "element");

       
        $element.css('background-color', UNSORTED);
        $element.css('width', element_width.toString() + 'px');
        $element.css('height', (arr[i]*12).toString() + 'px');

        //$element.append(n.toString());
        $element.css('margin-left', margin_element + 'px');
        $element.css('margin-right', margin_element + 'px');
        $element.append(elem_label);
        $element.appendTo("#array");


    }

}
function get_max()
{
    var max = arr[0];
    for(var i=1;i<size;i++)
    {
        if(max<arr[i]){
            max = arr[i];
        }
    }
    // console.log(`the max value is `+ max);
    return max;
}
//generate frequency array
function generate_frequency()
{
    var countContainer = document.getElementById("count");
    var max = get_max();
    for(var i=0;i<max;i++)
    {
        console.log(`In generate_frequency() loop`);
        var element = document.createElement("div");
        element.classList.add("block2");
        element.style.height = `${20}px`;
        element.style.transform = `translate(${i*30}px)`;

        //creating index
        var elem_idx = document.createElement("label");
        elem_idx.classList.add("block_id2");
        elem_idx.innerText = i+1;

        //making initial frequency 0
        var elem_val = document.createElement("label");
        elem_val.classList.add("block_id3");
        elem_val.innerText = 0;


        //appending to the countContainer
        element.appendChild(elem_val);
        element.appendChild(elem_idx);
        countContainer.appendChild(element);

    }

}

async function countSort()
{
    var block = document.querySelectorAll(".element");
    for(var i=0;i<block.length;i++)
    {
        block[i].style.backgroundColor = SELECTED;
        
        var value = Number(block[i].childNodes[0].innerHTML);
        var freq_array =  document.getElementsByClassName("block_id3");
        freq_array[value-1].style.backgroundColor = "cyan";
        freq_array[value-1].innerText++;
        await sleep(delay);
        freq_array[value-1].style.backgroundColor = "darkgray";
        block[i].style.backgroundColor = UNSORTED;
    }
    // console.log(block);
    var index = 0;
    for (var i=0;i<get_max();i++)
    {
        var freq = document.getElementsByClassName("block_id3");
        // console.log(block.length);
        var temp = Number(freq[i].innerText);
        // console.log(`temp is ${temp}\n`);
        var freq_block = document.getElementsByClassName("block2");

        freq_block[i].style.backgroundColor = "cyan";

        await sleep(delay);

        if(temp==0)
        {
            freq_block[i].style.backgroundColor = "darkgray";
            continue;
        }

        var label = document.getElementsByClassName("block_id");

        for (var j=0;j<temp;j++)
        {
            block[index].style.backgroundColor = SELECTED;
            block[index].style.height = `${(i+1)*12}px`;
            label[index].innerText = i+1;
            block[index].style.backgroundColor = SORTED;
            index++;
            
        }

        freq_block[i].style.backgroundColor = "darkgray";

        await sleep(delay);


    }
}

async function countSortBook()
{
    var block = document.querySelectorAll(".element");
    for(var i=0;i<block.length;i++)
    {
        block[i].style.backgroundColor = SELECTED;
        
        var value = Number(block[i].childNodes[0].innerHTML);
        var freq_array =  document.getElementsByClassName("block_id3");
        freq_array[value-1].style.backgroundColor = "cyan";
        freq_array[value-1].innerText++;
        await sleep(delay);
        freq_array[value-1].style.backgroundColor = "darkgray";
        block[i].style.backgroundColor = UNSORTED;
    }
    var max = get_max();
    for (var i=1;i<max;i++)
    {
        var freq_array = document.getElementsByClassName("block_id3");

        freq_array[i].style.backgroundColor = "cyan";
        freq_array[i-1].style.backgroundColor = "cyan";
        var temp_storage = parseInt(parseInt(freq_array[i].innerText)+parseInt(freq_array[i-1].innerText));
        freq_array[i].innerText = temp_storage;
        await sleep(delay);
        
        freq_array[i].style.backgroundColor = "darkgrey";
        freq_array[i-1].style.backgroundColor = "darkgrey";
    }
}
