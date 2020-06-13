var cpgsz=12;
var cateinit=1;
var pgno=1;
var pgsz=12;
var vdpgno=1;
var vdpgsz=3;
var x = document.getElementById("mypanel");
var y = document.getElementsByClassName("cate");
var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248:8000/image/?categoryid="+cateinit+"&format=json&page="+pgno+"&page_size="+pgsz);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
     var data = JSON.parse(ourRequest.responseText);
     cnt = data.count;
     console.log(data);
     renderhtml(data,cateinit,pgno,pgsz,vdpgsz);
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

function renderhtml(data,cinit,pagenumber,pagesize,vediopagesize){
  var res="";
  var rem = cnt-(pagenumber-1)*pagesize;
    res+="<div class='container'>";
    res+="<div class='row'>";
    var k=0;
    var sz = data["results"].length;
    for(i=0;i<Math.min(pagesize,rem);i++)
    {
      res+="<div class='col-lg-4 col-md-4 col-sm-2'>";
      if(k>=sz) k=0;
      res+="<img src='"+ data["results"][k++].img +"' class='panelimages'>";
      res+="</div>";
    }

    // for(i=0;i<pagesize-Math.min(pagesize,rem);i++)
    // {
    //   res+="<div class='col-lg-4 col-md-4 col-sm-2'>";
    //   if(k>=sz) k=0;
    //   res+="<img src='"+ data["results"][0].img +"' class='panelimages'>";
    //   res+="</div>";
    // }
    res+="</div>"
    res+="</div><br><br>";


    res+="<h1>Vedios</h1><br><br>";

           //req for vedio resource
        var ourRequest4 = new XMLHttpRequest();
        ourRequest4.open("GET","http://35.184.138.248:8000/video/?categoryid="+cinit+"&format=json&page="+pagenumber+"&page_size="+vediopagesize);
        ourRequest4.onload = function(){
          if(ourRequest4.status>=200 && ourRequest4.status<400)
          {
             // alert("conn established");
             var data = JSON.parse(ourRequest4.responseText);
             count2 = data.count;
             // console.log(res);
             console.log(cinit);
                     res+=renderhtml3(data,pagenumber,vediopagesize);
                     // console.log(res);
             x.innerHTML = res;
             // rendervedio(cateinit,pgno,pgsz);
             // alert("done");
             // renderhtml(data,pgno,pgsz);
         }
         else{
          console.log("We connected to the server, but it returned an error.");
         }
        };

        ourRequest4.onerror = function(){
          console.log("connection error");
        };

        ourRequest4.send();



        for(i=0;i<Math.ceil(cnt/pagesize);i++)
        {
          if(i+1==pagenumber)
            res+="<button class='btn btn-lg btn-primary active' onclick='req("+ cinit+ "," + (i+1)+ ","+ pagesize +","+vediopagesize+")'>" + (i+1) + "</button>";
          else
            res+="<button class='btn btn-lg btn-primary' onclick='req("+ cinit+ "," + (i+1)+ ","+ pagesize +","+vediopagesize+")'>" + (i+1) + "</button>";
        }
        res+="<br><br>";
        // req for vedio resource
    // x.innerHTML = res;




        // req for vedio resource
    x.innerHTML = res;
      // cate req
    var st="";
      var ourRequest2 = new XMLHttpRequest();
      ourRequest2.open("GET","http://35.184.138.248:8000/Category?format=json");
      ourRequest2.onload = function(){
        if(ourRequest2.status>=200 && ourRequest2.status<400)
        {
         // alert("conn establishedksdhfsdhdfkjsddhfkshfsdkjfh"); 
         var data2 = JSON.parse(ourRequest2.responseText);
         renderhtml2(cinit,data2,pagenumber,pagesize,vediopagesize);

         // for(i=0;i<data2.length;i++)
       //        {
       //         st+="<button class='btn btn-lg btn-secondray dib' onclick='req("+ data2[i].id+ "," +  pagenumber+ ","+ pagesize +")'></button>";
       //        }
              // alert("conn establishedksdhfsdhdfkjsddhfkshfsdkjfh");  
              

       //        y[0].innerHTML = st; 

    }
     else{
      console.log("We connected to the server, but it returned an error.");
     }
    };

    ourRequest2.onerror = function(){
      console.log("connection error");
    };

    ourRequest2.send();

// cate req ends
}

function  renderhtml3(data,pagenumber,vediopagesize){
  // alert("renderhtml3 me aa gya");
  var st="";
  var rem  = count2-(pagenumber-1)*vediopagesize;
  var k=0;
  var sz=data["results"].length;
  // console.log(data);
  // console.log("count2 = "+count2+" sz = "+sz+" rem = "+rem);
  // console.log(sz);
  st+="<div class='container'>";
  st+="<div class='row'>"
  for(i=0;i<Math.min(rem,vediopagesize);i++)
  {
        if(k>=sz) k=0;
        st+="<div class='col-lg-3 col-md-2'>";
    st+="<iframe width='295' height='236' class='vedio' src='" + data["results"][k++].videourl + "' "+" "+" ></iframe>";
    st+="</div>";
  }

  // for(i=0;i<vediopagesize-Math.min(rem,vediopagesize);i++)
  //     {
  //       st+="<div class='col-lg-3 col-md-2'>";
  //   st+="<iframe width='295' height='236' class='vedio' src='" + data["results"][0].videourl + "' "+" "+" ></iframe>";
  //   st+="</div>";
  //     }

    st+="</div>";
    st+="</div>";

    st+="<br><br>";
    return st;

}


function renderhtml2(cinit,data2,pagenumber,pagesize,vediopagesize){
  // alert("iske ander aa gya");
  // console.log("ye lo data2"+ data2);
  var st="";
              for(i=0;i<data2.length;i++)
              {
                if(cinit==data2[i].id)
                st+="<button class='btn btn-lg btn-secondary dib active' id='"+data2[i].id+"' onclick='req("+ data2[i].id+ "," +  1+ ","+ pagesize +","+vediopagesize+")'>" +data2[i]["name"]+ "</button>";
              else
                st+="<button class='btn btn-lg btn-secondary dib' id='"+data2[i].id+"' onclick='req("+ data2[i].id+ "," +  1+ ","+ pagesize +","+vediopagesize+")'>" +data2[i]["name"]+ "</button>";
              }
              // alert("conn establishedksdhfsdhdfkjsddhfkshfsdkjfh");  
              

              y[0].innerHTML = st;  
}

function req(cinit,pagenumber,pagesize,vediopagesize)
{
  var ourRequest3 = new XMLHttpRequest();
  ourRequest3.open("GET","http://35.184.138.248:8000/image/?categoryid="+cinit+"&format=json&page="+pagenumber+"&page_size="+pagesize);
ourRequest3.onload = function(){
  if(ourRequest3.status>=200 && ourRequest3.status<400)
  {
     // alert("conn established");
     var data = JSON.parse(ourRequest3.responseText);
     cnt = data.count;
     console.log(cnt+" "+cinit);
     renderhtml(data,cateinit,pagenumber,pagesize,vediopagesize);
     // alert("done");
     // renderhtml(data,pgno,pgsz);
  }
  else{
     console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest3.onerror = function(){
  console.log("connection error");
};

ourRequest3.send();

}
