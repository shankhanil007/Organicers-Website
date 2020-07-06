

var x = document.getElementById("mypanel");
var pgsz=3;
var pgno=1;


var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248.xip.io:8000/testmonial/?format=json&page="+pgno+"&page_size="+pgsz);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
     console.log(ourRequest);
     var data = JSON.parse(ourRequest.responseText);
     cnt = data.count;
     renderhtml(data,pgno,pgsz);
  }
  else{
     console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function(){
  console.log("connection error");
};

ourRequest.send();

function renderhtml(data,pagenumber,pagesize)
{
  var res="";
  res+="<div class='container-fluid' style='padding-bottom: 90px;'>";
    var rem = cnt-(pagenumber-1)*pagesize;
    for(i=0;i<Math.min(pagesize,rem);i++)
    {
      res+="<p style='font-size:5em;'>"+ data["results"][i].client_name +"</p>";
      res+="<p style='font-size:2em'>"+ data["results"][i].description +"</p>";
      res+="<div class='row'>";
      for(j=0;j<Math.min(4,data["results"][i].image.length); j++)
      {
        res+="<div class='col-lg-3 col-md-4 cateimg' style='overflow: hidden'>";
         res+="<img src='"+ data["results"][i].image[j].img +"'>";
        res+="</div>";
      }
      res+="</div>";
      res+="<br><hr class='style-seven'><br>";
    }
  res+="</div>";


    res+="<br><br>";
    res+="<center><div class='row'><div style='margin: auto;'class='col-6'>"
    for( i=0;i<Math.ceil(cnt/pagesize);i++)
    {
      if((i+1)==pagenumber)
        res+="<button class='btn btn-primary bslide active' style='font-size:0.7rem'   value='"+ (i+1) +"' id = '"+ (i+1) +"' onclick='req("+(i+1)+","+pagesize+")'>"+ (i+1) +"</button>";
      else
        res+="<button class='btn btn-primary bslide' style='font-size:0.7rem' value='"+ (i+1) +"' id = '"+ (i+1) +"' onclick='req("+(i+1)+","+pagesize+")'>"+ (i+1) +"</button>";
    }
    res+="</div></div>"
    res+="</div></center>";
    x.innerHTML = res;
}

function req(pagenumber,pagesize)
{
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET","http://35.184.138.248.xip.io:8000/testmonial/?format=json&page="+pagenumber+"&page_size="+pagesize);
    ourRequest.onload = function(){
      if(ourRequest.status>=200 && ourRequest.status<400)
      {
       // alert("conn established");
       console.log(ourRequest);
       var data = JSON.parse(ourRequest.responseText);
       var cnt = data.count;
       renderhtml(data,pagenumber,pagesize);
     }
     else{
       console.log("We connected to the server, but it returned an error.");
     }
   };

   ourRequest.onerror = function(){
    console.log("connection error");
  };

  ourRequest.send();
}





