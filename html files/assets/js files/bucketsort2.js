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
    //console.log('Ammar');
    //console.log(size);
    if(size>64){
        element_width = 4;
    }
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
function get_min()
{
    var min = arr[0];
    for(var i=0;i<size;i++){
        if(arr[i]<min){
            min = arr[i];
        }
    }
    return min;
}
async function InsertionSort(clsnam) {
    let blocks = document.getElementsByClassName(clsnam);
    console.log(blocks);
    blocks[0].style.backgroundColor = SELECTED;
  
    for (var i = 1; i < blocks.length; i += 1) {
      var j = i - 1;
  
      // To store the integer value of ith block to key
      var key = parseInt(blocks[i].childNodes[0].innerHTML);
  
      // To store the ith block height to height
      var height = blocks[i].style.height;
  
      // Provide darkblue color to the ith block
      blocks[i].style.backgroundColor = "darkblue";
  
      // To pause the execution of code for 600 milliseconds
    await sleep(delay);
  
      // For placing selected element at its correct position
      while (j >= 0 && parseInt(blocks[j].childNodes[0].innerHTML) > key) {
  
        // Provide darkblue color to the jth block
        blocks[j].style.backgroundColor = "darkblue";
  
        // For placing jth element over (j+1)th element
        blocks[j + 1].style.height = blocks[j].style.height;
        blocks[j + 1].childNodes[0].innerText = 
        blocks[j].childNodes[0].innerText;
        j = j - 1;
  
        // To pause the execution of code for 600 milliseconds
        await sleep(delay);
  
        // Provide lightgreen color to the sorted part
        for (var k = i; k >= 0; k--) {
          blocks[k].style.backgroundColor = SORTED;
        }
      }
  
      // Placing the selected element to its correct position
      blocks[j + 1].style.height = height;
      blocks[j + 1].childNodes[0].innerHTML = key;
  
      // To pause the execution of code for 600 milliseconds
     await sleep(delay);
  
      // Provide light green color to the ith block
      blocks[i].style.backgroundColor = SORTED;
    }
  }
function labelblocks()
{
    //labelling one at a time
    var tolabel;
    tolabel = document.getElementsByClassName("bucket")

    var range = Math.floor((get_max()-get_min())/10)+1;
    for (var i=0 ;i<10;i++){
        tolabel[i].innerHTML += `<h6 style="color:white">[${range*i}-${range*(i+1)}]</h6>`
    }
    // tolabel = document.getElementById("one");
    // tolabel.innerHTML += `<h3>[1-${range}]</h3>`
    // tolabel = document.getElementById("two");
    // tolabel.innerHTML += `<h3 style="color:white">[${range+1}-${range*2}]</h3>`
    // tolabel = document.getElementById("three");
    // tolabel.innerHTML += `<h3 style="color:white">[${range*2 +1}-${range*3}]</h3>`
    // tolabel = document.getElementById("four");
    // tolabel.innerHTML += `<h3 style="color:white">[${range*3 + 1}-${range*4}]</h3>`
    // tolabel = document.getElementById("five");
    // tolabel.innerHTML += `<h3>[${range*4 + 1}-${range*5}]</h3>`
    // tolabel = document.getElementById("six");
    // tolabel.innerHTML += `<h3>[${range*5 + 1}-${range*6}]</h3>`
    // tolabel = document.getElementById("seven");
    // tolabel.innerHTML += `<h3>[${range*6 + 1}-${range*7}]</h3>`
    // tolabel = document.getElementById("eight");
    // tolabel.innerHTML += `<h3>[${range*7 + 1}-${range*8}]</h3>`
    // tolabel = document.getElementById("nine");
    // tolabel.innerHTML += `<h3>[${range*8 + 1}-${range*9}]</h3>`
    // tolabel = document.getElementById("ten");
    // tolabel.innerHTML += `<h3>[${range*9 + 1}-${range*10}]</h3>`
}  
async function countSort()
{
    var range = Math.floor((get_max()-get_min())/10)+1;
    var blocks = document.querySelectorAll(".element");
    var blockArray= new Array(10);
    for (var i=0;i<10;i++){
        blockArray[i] = 0;
    }
    for(var i=0;i<blocks.length;i++)
    {
        blocks[i].style.backgroundColor = SELECTED;
        var value = Number(blocks[i].childNodes[0].innerHTML);
        var array_ele = document.createElement("div");

        // Adding style to div
        array_ele.style.height = `${value * 13}px`;
    
        // Creating label element for displaying
        // size of particular block
        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
    
        array_ele.appendChild(array_ele_label);
        if(value>=0 && value<=range){
            array_ele.classList.add("firstbucket");
            var container = document.getElementById("one");
            array_ele.style.transform = 
            `translate(${blockArray[0] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[0]++;
        }
        if(value>=(range+1) && value<=(range*2)){
            array_ele.classList.add("secondbucket");
            var container = document.getElementById("two");
            array_ele.style.transform = 
            `translate(${blockArray[1] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[1]++;
        }
        if(value>=(range*2)+1  && value<=range*3)
        {
            array_ele.classList.add("thirdbucket");
            var container = document.getElementById("three");
            array_ele.style.transform = 
            `translate(${blockArray[2] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[2]++;
        }
        if(value>=(range*3)+1  && value<=range*4)
        {
            array_ele.classList.add("fourthbucket");
            var container = document.getElementById("four");
            array_ele.style.transform = 
            `translate(${blockArray[3] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[3]++;
        }
        if(value>=(range*4)+1  && value<=range*5)
        {
            array_ele.classList.add("fifthbucket");
            var container = document.getElementById("five");
            array_ele.style.transform = 
            `translate(${blockArray[4] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[4]++;
        }
        if(value>=(range*5)+1  && value<=range*6)
        {
            array_ele.classList.add("sixthbucket");
            var container = document.getElementById("six");
            array_ele.style.transform = 
            `translate(${blockArray[5] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[5]++;
        }
        if(value>=(range*6)+1  && value<=range*7)
        {
            array_ele.classList.add("seventhbucket");
            var container = document.getElementById("seven");
            array_ele.style.transform = 
            `translate(${blockArray[6] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[6]++;
        }
        if(value>=(range*7)+1  && value<=range*8)
        {
            array_ele.classList.add("eigthbucket");
            var container = document.getElementById("eight");
            array_ele.style.transform = 
            `translate(${blockArray[7] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[7]++;
        }
        if(value>=(range*8)+1  && value<=range*9)
        {
            array_ele.classList.add("ninthbucket");
            var container = document.getElementById("nine");
            array_ele.style.transform = 
            `translate(${blockArray[8] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[8]++;
        }
        if(value>=(range*9)+1  && value<=range*10)
        {
            array_ele.classList.add("tenthbucket");
            var container = document.getElementById("ten");
            array_ele.style.transform = 
            `translate(${blockArray[9] * 30}px)`;
            container.appendChild(array_ele);
            blockArray[9]++;
        }

        blocks[i].style.backgroundColor = UNSORTED;
    }
    labelblocks();
    await InsertionSort("firstbucket");
    await InsertionSort("secondbucket");
    await InsertionSort("thirdbucket");
    await InsertionSort("fourthbucket");
    await InsertionSort("fifthbucket");
    await InsertionSort("sixthbucket");
    await InsertionSort("seventhbucket");
    await InsertionSort("eigthbucket");
    await InsertionSort("ninthbucket");
    await InsertionSort("tenthbucket");
    var j=0;
    for (var i=0;i<10;i++)
    {
        var bucket_index=0;
        var elem_idx;
        if(i==0)
        {
            elem_idx = document.getElementsByClassName("firstbucket");
        }
        if(i==1)
        {
            elem_idx = document.getElementsByClassName("secondbucket");
        }
        if(i==2)
        {
            elem_idx = document.getElementsByClassName("thirdbucket");
        }
        if(i==3)
        {
            elem_idx = document.getElementsByClassName("fourthbucket");
        }
        if(i==4)
        {
            elem_idx = document.getElementsByClassName("fifthbucket");
        }
        if(i==5)
        {
            elem_idx = document.getElementsByClassName("sixthbucket");
        }
        if(i==6)
        {
            elem_idx = document.getElementsByClassName("seventhbucket");
        }
        if(i==7)
        {
            elem_idx = document.getElementsByClassName("eigthbucket");
        }
        if(i==8)
        {
            elem_idx = document.getElementsByClassName("ninthbucket");
        }
        if(i==9)
        {
            elem_idx = document.getElementsByClassName("tenthbucket");
        }
        for(; bucket_index<blockArray[i];j++,bucket_index++)
        {
            elem_idx[bucket_index].style.backgroundColor = "cyan";
            await sleep(delay);

            blocks[j].style.height = elem_idx[bucket_index].style.height;
            blocks[j].childNodes[0].innerText = elem_idx[bucket_index].childNodes[0].innerText;
            blocks[j].style.backgroundColor = SORTED;

            await sleep(delay);

            elem_idx[bucket_index].style.backgroundColor = UNSORTED;
        }

    }
}