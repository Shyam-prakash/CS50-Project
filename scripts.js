var baseUrl = 'https://api.themoviedb.org/3/';
var api_key = "3e0e8c82d48b8d23f6f295dcc53393b6";
function myfunc(){
    var i = 0;
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("op");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
            elem.innerHTML = "Data Fetched, Select the columns";
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width  + "%";
          }
        }
      }
}
var menu = {
    "TMDB" : ["title", "vote_average", "vote_count", "popularity"],
    "TWITTER" : ["favorite_count", "retweet_count"]
}
window.onload = function(){
    var dd0 = document.getElementById("dd");
    var dd1 = document.getElementById("dd2")
    for (var x in menu){
        dd0.options[dd0.options.length] = new Option(x,x);
    }
    dd0.onchange = function() {
        dd1.length = 1;
        var z = menu[this.value];
        for (var i = 0; i < z.length; i++){
            dd1.options[dd1.options.length] = new Option(z[i],z[i]);
        }
    }
}
function getstats(){
    document.getElementById("op").innerHTML = "RESULTS";
    var search = document.getElementById("text").value;
    //console.log(search);
    var a = document.getElementById("dd");
    var select = a.options[a.selectedIndex].text;
    //console.log(select);
    if (select == "TMDB"){
        var z = 'results';
        var y = document.getElementById("dd4");
        var select3 = y.options[y.selectedIndex].text;
        //console.log(select3)
        fetch(baseUrl+'search/multi?api_key='+api_key+'&query='+search)
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            console.log(data.total_pages);
            var d = document.getElementById("dd2");
            var select2 = d.options[d.selectedIndex].text;
            if (select3 == "Sum"){
                sum(data,select2,select3,z);
            }else if(select3 == "Mean"){
                mean(data,select2,select3,z);
            }else if(select3 == "Null Count"){
                nullCount(data,select2,select3,z);
            }else if(select3 == "Median"){
                median(data,select2,select3,z);
            }else if(select3 == "Count"){
                count(data,select2,select3,z);
            }else if(select3 == "Standard Deviation"){
                standard(data,select2,select3,z);
            }else if(select3 == "Count Distinct"){
                Ctd(data,select2,select3,z);
            }else{
               let a = sum(data,select2,select3,z);
               let b = mean(data,select2,select3,z);
               let c = nullCount(data,select2,select3,z);
               let d = median(data,select2,select3,z);
               let e = count(data,select2,select3,z);
               let f = standard(data,select2,select3,z);
               let g = Ctd(data,select2,select3,z);
               all_table(select2,a,b,c,d,e,f,g);
            }
        });
    }else{
        var z = 'statuses';
        var d = document.getElementById("dd2");
        var select2 = d.options[d.selectedIndex].text;
        var y = document.getElementById("dd4");
        var select3 = y.options[y.selectedIndex].text;
        fetch("http://localhost:7890/1.1/search/tweets.json?q="+search+"&count=100")
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            if (select3 == "Sum"){
                sum(data,select2,select3,z);
            }else if(select3 == "Mean"){
                mean(data,select2,select3,z);
            }else if(select3 == "Null Count"){
                nullCount(data,select2,select3,z);
            }else if(select3 == "Median"){
                median(data,select2,select3,z);
            }else if(select3 == "Count"){
                count(data,select2,select3,z);
            }else if(select3 == "Standard Deviation"){
                standard(data,select2,select3,z);
            }else if(select3 == "Count Distinct"){
                Ctd(data,select2,select3,z);
            }else{
               let a = sum(data,select2,select3,z);
               let b = mean(data,select2,select3,z);
               let c = nullCount(data,select2,select3,z);
               let d = median(data,select2,select3,z);
               let e = count(data,select2,select3,z);
               let f = standard(data,select2,select3,z);
               let g = Ctd(data,select2,select3,z)
               all_table(select2,a,b,c,d,e,f,g);
            }
        });
        }
}
function sum(data,x,y,z){
    var res = 0;
    for (var i = 0; i < data[z].length; i = i + 1){
        if(isNaN(data[z][i][x])){
            var add = 0;
        }else {
            var add = (data[z][i][x]);
            }res = res+add;
        }console.log(res);
        if(y == "All"){
            return res;
        }else{
            createtable(x,res,"sum");
        }
        //document.getElementById("op2").innerHTML = res;
}
function mean(data,x,y,z){
    var res = 0;
    for (var i = 0; i < data[z].length; i = i + 1){
        if(isNaN(data[z][i][x])){
            var add = 0;
        }else {
            var add = (data[z][i][x]);
            }res = res+add;
            avg = res / data[z].length;
        }console.log(avg);
        if(y == "All"){
            return avg;
        }else{
            createtable(x,avg,"Mean");
        }
        //document.getElementById("op2").innerHTML = avg;   
}
function nullCount(data,x,y,z){
    var res = 0;
    for (var i = 0; i < data[z].length; i = i + 1){
        //console.log(data.results[i][x]);
        if(isNaN(data[z][i][x]) || data[z][i][x] == 0){
            res = res + 1;
        }}console.log(res);
        if(y == "All"){
            return res;
        }else{
            createtable(x,res,"Null Count");
        }
        //document.getElementById("op2").innerHTML = res;  
}
function median(data,x,y,z){
    var array = [];
    for (var i = 0; i < data[z].length; i = i + 1){
        if(isNaN(data[z][i][x])){
            array.push(0);
        }else {
            array.push(data[z][i][x]);
            }array.sort(function(a,b){return a - b});
            med = array[(data[z].length/2)];
        }console.log(med);
        if(y == "All"){
           return med;
        }else{
            createtable(x,med,"Median");
        }
        //document.getElementById("op2").innerHTML = med;
}
function count(data,x,y,z){
    var ct = data[z].length;
    console.log(ct);
    if(y == "All"){
       return ct;
    }else{
        createtable(x,ct,"Count");
    }
    //document.getElementById("op2").innerHTML = ct;
}
function CountUnique(i){
    return new Set(i).size;
}
function Ctd(data,x,y,z){
    array = [];
    for(var i = 0; i < data[z].length; i = i + 1){
        array.push(data[z][i][x]);
    }var ctd = CountUnique(array);
    if (y == "All"){
        return ctd;
    }else{
        createtable(x,ctd,"Distinct Count");
    }
}
function standard(data,x,y,z){
    array = [];
    for(var i = 0; i < data[z].length; i = i + 1){
        array.push(data[z][i][x]);
    }
    var n = array.length;
    var mean = array.reduce((a, b) => a + b) / n;
    var res = Math.round(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n));
    console.log(res);
    if(y == "All"){
        return res;
    }else{
        createtable(x,res,"Standard Deviation");
    }
}
//function to create table....
function createtable(x,y,z){
    clearBox("op2");
    let h = ['Column Name', z ];
    let e = [{col:x,val:y}]
    let mytable = document.querySelector('#op2')
    var table = document.createElement("table");
    var header_row = document.createElement('tr');
    h.forEach(htext => {
        var header = document.createElement('th');
        let textNode = document.createTextNode(htext);
        header.appendChild(textNode);
        header_row.appendChild(header);
    });
    table.appendChild(header_row);
    e.forEach(emp =>{
        let row = document.createElement('tr');
        Object.values(emp).forEach(text =>{
            let cell = document.createElement('td');
            let textNode1 = document.createTextNode(text);
            cell.appendChild(textNode1);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    mytable.appendChild(table);
}
//function to clear the output area.
function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}
function all_table(x,a,b,c,d,f,g,cd){
    clearBox("op2");
    let h = ['Column Name', 'sum', 'mean', 'Null count', 'Median', 'Count', 'Standard Deviation', "Distinct Count"];
    let e = [{col:x,sum:a,mean:b,nullcount:c,median:d,count:f,std:g,ctd:cd}];
    let mytable = document.querySelector('#op2');
    var table = document.createElement("table");
    var header_row = document.createElement('tr');
    h.forEach(htext => {
        var header = document.createElement('th');
        let textNode = document.createTextNode(htext);
        header.appendChild(textNode);
        header_row.appendChild(header);
    });
    table.appendChild(header_row);
    e.forEach(emp =>{
        let row = document.createElement('tr');
        Object.values(emp).forEach(text =>{
            let cell = document.createElement('td');
            let textNode1 = document.createTextNode(text);
            cell.appendChild(textNode1);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    mytable.appendChild(table);
}