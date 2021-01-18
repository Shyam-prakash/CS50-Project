var baseUrl = 'https://api.themoviedb.org/3/';
var api_key = "3e0e8c82d48b8d23f6f295dcc53393b6"
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
    "TWITTER" : ["Tweets", "Tweets_count", "Likes",]
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
        var y = document.getElementById("dd4");
        var select3 = y.options[y.selectedIndex].text;
        //console.log(select3)
        fetch(baseUrl+'search/multi?api_key='+api_key+'&query='+search)
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            var d = document.getElementById("dd2");
            var select2 = d.options[d.selectedIndex].text;
            //console.log(select2);
            if (select3 == "Sum"){
                sum(data,select2,select3);
            }else if(select3 == "Mean"){
                mean(data,select2,select3);
            }else if(select3 == "Null Count"){
                nullCount(data,select2,select3);
            }else if(select3 == "Median"){
                median(data,select2,select3);
            }else if(select3 == "Count"){
                count(data,select2,select3);
            }else if(select3 == "Standard Deviation"){
                standard(data,select2,select3);
            }else if(select3 == "Count Distinct"){
                Ctd(data,select2,select3);
            }else{
               sum(data,select2,select3);
               mean(data,select2,select3);
               nullCount(data,select2,select3);
               median(data,select2,select3);
               count(data,select2,select3);
            }
        });
    }
}
function sum(data,x,y){
    var res = 0;
    for (var i = 0; i < data.results.length; i = i + 1){
        if(isNaN(data.results[i][x])){
            var add = 0;
        }else {
            var add = (data.results[i][x]);
            }res = res+add;
        }console.log(res);
        if(y == "All"){
            createtable2();
        }else{
            createtable(x,res,"sum");
        }
        //document.getElementById("op2").innerHTML = res;
}
function mean(data,x,y){
    var res = 0;
    for (var i = 0; i < data.results.length; i = i + 1){
        if(isNaN(data.results[i][x])){
            var add = 0;
        }else {
            var add = (data.results[i][x]);
            }res = res+add;
            avg = res / data.results.length;
        }console.log(avg);
        if(y == "All"){
            createtable2();
        }else{
            createtable(x,avg,"Mean");
        }
        //document.getElementById("op2").innerHTML = avg;   
}
function nullCount(data,x,y){
    var res = 0;
    for (var i = 0; i < data.results.length; i = i + 1){
        //console.log(data.results[i][x]);
        if(isNaN(data.results[i][x])){
            res = res + 1;
        }}console.log(res);
        if(y == "All"){
            createtable2();
        }else{
            createtable(x,res,"Null Count");
        }
        //document.getElementById("op2").innerHTML = res;  
}
function median(data,x,y){
    var array = [];
    for (var i = 0; i < data.results.length; i = i + 1){
        if(isNaN(data.results[i][x])){
            array.push(0);
        }else {
            array.push(data.results[i][x]);
            }array.sort(function(a,b){return a - b});
            med = array[(data.results.length/2)];
        }console.log(med);
        if(y == "All"){
            createtable2();
        }else{
            createtable(x,med,"Median");
        }
        //document.getElementById("op2").innerHTML = med;
}
function count(data,x,y){
    var ct = data.results.length;
    console.log(ct);
    if(y == "All"){
        createtable2();
    }else{
        createtable(x,ct,"Count");
    }
    //document.getElementById("op2").innerHTML = ct;
}
function standard(data,x,y){
    array = [];
    for(var i = 0; i < data.results.length; i = i + 1){
        array.push(data.results[i][x]);
    }
    var n = array.length;
    var mean = array.reduce((a, b) => a + b) / n;
    var res = Math.round(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n));
    console.log(res);
    if(y == "All"){
        createtable2();
    }else{
        createtable(x,res,"Standard Deviation");
    }
}
function createtable(x,y,z){
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