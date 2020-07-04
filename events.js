

// to show the list of buttons
var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","http://35.184.138.248:8000/api/event/");
var autho = localStorage.getItem("auth");
ourRequest.setRequestHeader("Authorization", "Token "+autho);
ourRequest.onload = function(){
  if(ourRequest.status>=200 && ourRequest.status<400)
  {
     // alert("conn established");
     var data = JSON.parse(ourRequest.responseText);
     cnt = data.count;
     renderhtml(data);
  }
  else{
     console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function(){
  console.log("connection error");
};

ourRequest.send();

function renderhtml(data)
{
  // var autho = localStorage.getItem("auth");
  var re= document.getElementById("regevents");
   var userid = localStorage.getItem("userid");
   var s="";
   if(data["results"].length==0)
   {
      s+="<center><h2>You haven't registered any events with us</h2></center>";
      s+="<center><i class='fas fa-plus-circle' title='Register New Event' data-toggle='tooltip' onclick='fun3()'></i></center>";
   }
   else
   {
     s+="<center><h3 style='font-size:3em;'>These are the events you have registered with us</h3s></center><br><br>";
     //<i class="fas fa-plus-circle"></i>
     s+="<ul style='list-style:none;'>"; 
     var k=1; 
     for(i=0;i<data["results"].length;i++)
     {
        if(data["results"][i].organiser_name==userid)
        {
            if(data["results"][i].status==='COMPLETED'){
                s+="<li>";
                s+="<div class='jumbotron myevent'>";
                s+="<center><p style='font-size:3em; font-weight:800;'>Event: #"+ (k++) +"</p><br>";
                s+="<h2>Organicer Name:</h2><p class='eventdetail'>"+data["results"][i].organiser_name+"</p><br>";
                s+="<h2>Event Id:</h2><p class='eventdetail'>"+data["results"][i].id+"</p><br>";
                s+="<h2>Notes:</h2><p class='eventdetail'>"+data["results"][i].notes+"</p><br>";
                s+="<h2>Budget:</h2><p class='eventdetail'>"+data["results"][i].budget+"</p><br>";
                s+="<h2>Contact Number:</h2><p class='eventdetail'>"+data["results"][i].contact_number+"</p><br>";
                s+="<h2>Date and Time of event:</h2><p class='eventdetail'>"+data["results"][i].dateandtime+"</p><br>";
                s+="<h2>Status: </h2><p class='eventdetail'>"+data["results"][i].status+"</p><br>";
                s+="<button class='loginmodalbutton btn btn-secondary'  data-toggle='modal' data-target='#feedBackModal' >FeedBack</button>"
                s+="</center></div>";
                s+="</li>";
            }else{
                s+="<li>";
                s+="<div class='jumbotron myevent'>";
                s+="<center><p style='font-size:3em; font-weight:800;'>Event: #"+ (k++) +"</p><br>";
                s+="<h2>Organicer Name:</h2><p class='eventdetail'>"+data["results"][i].organiser_name+"</p><br>";
                s+="<h2>Event Id:</h2><p class='eventdetail'>"+data["results"][i].id+"</p><br>";
                s+="<h2>Notes:</h2><p class='eventdetail'>"+data["results"][i].notes+"</p><br>";
                s+="<h2>Budget:</h2><p class='eventdetail'>"+data["results"][i].budget+"</p><br>";
                s+="<h2>Contact Number:</h2><p class='eventdetail'>"+data["results"][i].contact_number+"</p><br>";
                s+="<h2>Date and Time of event:</h2><p class='eventdetail'>"+data["results"][i].dateandtime+"</p><br>";
                s+="<h2>Status: </h2><p class='eventdetail'>"+data["results"][i].status+"</p><br>";
                s+="</center></div>";
                s+="</li>";
            }
           
        }
     }
     s+="</ul>";
     s+="<center><i class='fas fa-plus-circle' title='Register New Event' data-toggle='tooltip' onclick='fun3()'></i></center>";
   }
    re.innerHTML = s;
}
// list of buttons ends

// here  user clicks on more events
function fun3(){
  document.querySelector(".eventlist").style.display="none";
  document.querySelector(".registeration-form").style.display="block";
}

function fun4(){
  document.querySelector(".eventlist").style.display="block";
  document.querySelector(".registeration-form").style.display="none";

}







// this is for view of reg form dynamically
function fun(){
            var x = document.querySelectorAll("input");
            var name= x[0].value;
            var enotes = x[1].value;
            var ebud = x[2].value;
            var ecnum = parseInt(x[3].value);
            var ednt = x[4].value;
            var obj = {
              organiser_name: name,
              notes: enotes,
              budget: ebud,
              contact_number: ecnum,
              dateandtime: ednt,
            // user_id:"43",
        }
        console.log(obj);


        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://35.184.138.248.xip.io:8000/api/event/", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        var autho = localStorage.getItem("auth");
        if(autho==null)
        {
            alert("You are not logged in");
        }
        else{


            xhttp.setRequestHeader("Authorization", "Token "+autho);
            xhttp.onload = function(){
                console.log(xhttp);
                if(xhttp.status>=200&&xhttp.status<400)
                {
                    console.log(xhttp);
                    console.log("your  event has registered");
                    var x = JSON.parse(xhttp.responseText).id;
                    alert("Congo your event has been registered. \n Your event Id is "+x+"\n Remember this Id for all future references");
                    fun2();
                }
                else
                {
                    // console.log(xhttp);
                    // var msg = JSON.parse(xhttp.responseText);
                    // alert(msg.email  );
                    console.log("We connected to the server, but it returned an error.");
                    console.log(xhttp);
                    var obj2 = JSON.parse(xhttp.responseText);
                    var msg="";
                    if('organiser_name' in obj2)
                        msg+=obj2.organiser_name+"\n";
                    if('notes' in obj2)
                        msg+=obj2.notes+"\n";
                    if('budget' in obj2)
                        msg+=obj2.budget+"\n";
                    if('contact_number' in obj2)
                        msg+=obj2.contact_number+"\n";
                    if('dateandtime' in obj2)
                        msg+=obj2.dateandtime;
                    alert(msg);
                }
            };
            xhttp.send(JSON.stringify(obj));

        }




    }
    // reg form completed

    //fun2 is when reg form  has been completely filled
    function fun2(){
        var x = document.querySelectorAll(".inpbox");
        for(i=0;i<x.length;i++)
            x[i].style.display="none";
        var y = document.querySelector(".btn-warning").style.display = "none";
        var a = document.querySelector(".form p").style.display="block";
        var img = document.querySelector(".form img").style.display="block";
        // var b = document.querySelector(".form a").style.display="block";
        setTimeout(function(){ 
         window.location.href=  "events.html";
         }, 3000);
        // var b = document.querySelector(".form a").style.display="block";
    }
   //  submitFeedBack is for feedback popup
    function submitFeedBack()
    {

     var obj = Array.from(document.querySelectorAll('.form-group input')).reduce((acc,input)=>({...acc,[input.name]:input.value}),{});
     var autho = localStorage.getItem("auth");
     if(autho==null)
     {
        alert("You are not logged in");
    }
    else{
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://35.184.138.248.xip.io:8000/api/testimonial/", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Authorization", "Token "+autho);
        xhttp.onload = function(){
           console.log(xhttp);
           if(xhttp.status>=200 && xhttp.status<400)
           {
             alert(" Congratulations!! Verification mail has been sent to your registered mail-id.");
             window.location.href=  "events.html";
                   // alert(obj2.detail); 
               }
               else{
                  console.log("We connected to the server, but it returned an error.");
                  console.log(xhttp);
                  var msg="";
                  var obj2 = JSON.parse(xhttp.responseText);
                  if('client_name' in obj2)
                    msg+="Name may not be blank."+"\n";
                if('rating' in obj2)
                    msg+="A valid Integer is required in Rating Field"+"\n";
                if('organisereventid' in obj2)
                    msg+="Id may not be blank"+"\n";
                if('description' in obj2)
                    msg+="Desfription may not be blank"+"\n";
                alert(msg);
            }
                };//onload ends
                xhttp.send(JSON.stringify(obj));
            }// else ends
      }// fun ends

function logout()
{
  var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://35.184.138.248.xip.io:8000/rest-auth/logout/", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function(){
      // console.log(xhttp);
      if(xhttp.status>=200 && xhttp.status<400)
      {
        
         console.log("you are logged out");
         // alert("you are logged out");
         localStorage.clear();
         alert("You have successfully logged out!");
         window.location.href="index.html";
     }
     else{
       console.log("We connected to the server, but it returned an error.");
       // var obj2 = JSON.parse(xhttp.responseText);
       // alert(obj2["non_field_errors"]);
       // console.log(obj2["non_field_errors"]);
     }
   };
   xhttp.send();
}
