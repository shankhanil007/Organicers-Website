var cpgsz=12;
var cateinit=1;
var pgno=1;
var pgsz=12;
var vdpgno=1;
var vdpgsz=3;
var x = document.getElementById("imgpanel");
var y = document.getElementsByClassName("cate")[0];
var z = document.getElementById("vidpanel");
var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248:8000/image/?categoryid="+cateinit+"&format=json&page="+pgno+"&page_size="+pgsz);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
     var data = JSON.parse(ourRequest.responseText);
     cnt = data.count;
     console.log(data);
     renderhtml(data,cateinit,pgno,pgsz,vdpgno,vdpgsz);
     // rendervedio(cateinit,pgno,pgsz,vdpgsz);
     // alert("done");
     // renderhtml(data,pgno,pgsz);
  }
  else{
     console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function(){
  console.log("connection error");
};

ourRequest.send();

function renderhtml(data,cinit,pagenumber,pagesize,vediopagenumber,vediopagesize)
{
   var st="";
   st+="<div class='container'>";
   st+="<div class='row'>";

   for(i=0;i<data["results"].length;i++)
   {
     st+="<div class='col-lg-4 col-md-3 col-sm-6 ' style='overflow: hidden;'>";
     st+="<div class='cateimg'>";
     st+="<img src='"+ data["results"][i].img  +"' style='width: 100%; height: 100%;'>";
     st+="</div>";
     st+="</div>";
   }
   st+="</div>";
   st+="</div>";
   st+="<center>";
   for(i=0;i<Math.ceil(cnt/pagesize);i++)
   {
     if(i+1==pagenumber)
      st+="<button class='btn btn-lg btn-primary active' value='"+(i+1)+"' onclick='request("+ cinit+","+(i+1)+","+pagesize+","+vediopagenumber+","+vediopagesize+")'>"+(i+1)+"</button>";
    else
      st+="<button class='btn btn-lg btn-primary ' value='"+(i+1)+"' onclick='request("+ cinit+","+(i+1)+","+pagesize+","+vediopagenumber+","+vediopagesize+")'>"+(i+1)+"</button>";
   }
   st+="</center>";

   x.innerHTML = st;
   fillcatebuttons(cinit,pagenumber,pagesize,vediopagenumber,vediopagesize);

   //filling the vedio sec
       var ourRequest = new XMLHttpRequest();
       ourRequest.open("GET","http://35.184.138.248:8000/video/?categoryid="+cinit+"&page="+vediopagenumber+"&page_size="+vediopagesize);
       ourRequest.onload = function(){
        if(ourRequest.status>=200 && ourRequest.status<400)
        {
         // alert("conn established");
         var data2 = JSON.parse(ourRequest.responseText);
         cnt3 = data2.count;
         console.log(data2);
         renderhtml3(data2,cinit,pagenumber,pagesize,vediopagenumber,vediopagesize);
         // rendervedio(cateinit,pgno,pgsz,vdpgsz);
         // alert("done");
         // renderhtml(data,pgno,pgsz);
       }
       else{
         console.log("We connected to the server, but it returned an error.");
       }
     };

     ourRequest.onerror = function(){
      console.log("connection error");
    };

    ourRequest.send();
    //filling the vedio sec

}


function renderhtml2(data,cinit,pagenumber,pagesize,vediopagenumber,vediopagesize)
{
  var st="";
  st+="<center>"
   for(i=0;i<data.length;i++)
   {
      if(data[i].id==cinit)
        st+="<button class='btn btn-lg btn-secondary catebtn active' id='"+(i+1)+"' onclick='request("+(i+1)+","+"1"+","+pagesize+",1,"+vediopagesize+")'>"+data[i].name+"</button>";
      else
        st+="<button class='btn btn-lg btn-secondary catebtn' id='"+(i+1)+"' onclick='request("+(i+1)+","+"1"+","+pagesize+",1,"+vediopagesize+")'>"+data[i].name+"</button>";
   }
   st+="</center>";

   y.innerHTML = st;
}

function request(cinit,pagenumber,pagesize,vediopagenumber,vediopagesize)
{
   var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248:8000/image/?categoryid="+cinit+"&format=json&page="+pagenumber+"&page_size="+pagesize);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
     var data = JSON.parse(ourRequest.responseText);
     cnt = data.count;
     console.log(data);
     renderhtml(data,cinit,pagenumber,pagesize,vediopagenumber,vediopagesize);
     // rendervedio(cateinit,pgno,pgsz,vdpgsz);
     // alert("done");
     // renderhtml(data,pgno,pgsz);
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
// for filling vedio panel
function renderhtml3(data,cinit,pagenumber,pagesize,vediopagenumber,vediopagesize) {
  var st="";
  st+="<div class='container'>";
  st+="<div class='row'>";
  for( i=0;i<data["results"].length;i++)
  {
     st+="<div class='col-lg-4 col-md-4 col-sm-6'>";
     st+="<iframe width='300' height='215' src='"+data["results"][i].videourl+"'></iframe>";
     st+="</div>";
  }
  st+="</div></div><br><br>";
  st+="<center>";
  for(i=0;i<Math.ceil(cnt3/vediopagesize);i++)
  {
     if(i+1==vediopagenumber)
     st+="<button class='btn btn-lg btn-primary active' value='"+(i+1)+"' onclick='request("+cinit+","+pagenumber+","+pagesize+","+(i+1)+","+vediopagesize+")'>"+(i+1)+"</button>";
     else
     st+="<button class='btn btn-lg btn-primary' value='"+(i+1)+"' onclick='request("+cinit+","+pagenumber+","+pagesize+","+(i+1)+","+vediopagesize+")'>"+(i+1)+"</button>";

  }
  st+="</center>";
  z.innerHTML= st;

}

function fillcatebuttons(cinit,pagenumber,pagesize,vediopagenumber,vediopagesize)
{
  // filling teh category buttons sec
   var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248:8000/Category?format=json", true);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
     var data2 = JSON.parse(ourRequest.responseText);
     // cnt = data.count;
     console.log(data2);
     renderhtml2(data2,cinit,pagenumber,pagesize,vediopagenumber,vediopagesize);
     // rendervedio(cateinit,pgno,pgsz,vdpgsz);
     // alert("done");
     // renderhtml(data,pgno,pgsz);
  }
  else{
     console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function(){
  console.log("connection error");
};

ourRequest.send();
   // filling teh category buttons sec end

}


