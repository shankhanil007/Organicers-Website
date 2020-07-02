

var x = document.getElementById("mypanel");
var pgsz=3;
var pgno=1;
var obj = {
  title: "CATEGORY",
  desc: "DESCRIPTION"
};

var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248:8000/image/?page="+pgno+"&page_size="+pgsz);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
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
  res+="<div class='container-fluid'>";
    var rem = cnt-(pagenumber-1)*pagesize;
    for(i=0;i<Math.min(pagesize,rem);i++)
    {
       res+="<p style='font-size:4rem;'>"+ obj.title +"</p>";
       res+="<p style='font-size:2rem;'>"+  obj.desc +"</p>";
       res+="<div class='row'>";
       
       console.log(data["results"].length);
         for(j=0; j<data["results"].length;j++)
         {
          res+="<div style='height:20rem;'class='col-lg-3 col-md-6'>";
          // console.log(data["results"][j].img);
          res+="<img style='width:100%;height:100%' src='" + data["results"][j].img + "' >";
          res+="</div>";
         }
         //if images are less than 4
         for(j=0;j<4-data["results"].length;j++)
         {
          res+="<div style='height:20rem;' class='col-lg-3 col-md-6'>"
          res+="<img style='width:100%;height:100%' src='" + data["results"][0].img + "' >";
          res+="</div>";
         }

       res+="</div>";
    }


    res+="<br><br>";
    res+="<div class='row'><div style='margin: auto;'class='col-6'>"
    for( i=0;i<Math.ceil(cnt/pagesize);i++)
    {
      if((i+1)==pagenumber)
        res+="<button class='btn btn-primary bslide active' value='"+ (i+1) +"' id = '"+ (i+1) +"' onclick='req("+(i+1)+","+pagesize+")'>"+ (i+1) +"</button>";
      else
        res+="<button class='btn btn-primary bslide' value='"+ (i+1) +"' id = '"+ (i+1) +"' onclick='req("+(i+1)+","+pagesize+")'>"+ (i+1) +"</button>";
    }
    res+="</div></div>"
    res+="</div>";
    x.innerHTML = res;
}

function req(pagenumber,pagesize)
{
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET","http://35.184.138.248:8000/image/?page="+pagenumber+"&page_size="+pagesize);
    ourRequest.onload = function(){
      if(ourRequest.status>=200 && ourRequest.status<400)
      {
       // alert("conn established");
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





