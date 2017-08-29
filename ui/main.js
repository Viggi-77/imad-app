//Submit Username/Password to login
var submit=document.getElementById('submit_btn');
submit.onclick= function(){
    //Make a request to the server and send the names
    var request= new XMLHttpRequest();
    //Capture response received and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //Take some action
        if (request.status===200){
             var names = request.responseText;
             names=JSON.parse(names);
             var list='';
            for(var i=0;i<names.length;i++){
                 list+='<li>' +names[i] +'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
            }
        }
        //Not Done yet
    };
    //Make the request
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    request.open('POST', 'http://hegdevignesh711.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(JSON.stringify({username:username,password:password}));
    
    //Capture a list of the names and render it as a list
   
};
