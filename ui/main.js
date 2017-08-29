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
            console.log('User logged in');
            alert('Logged in Successfully');
            }else if(request.status===403){
                alert('Username or Password is Incorrectly entered');
            }
            else if(request.status===500){
                alert('Something went wrong on the server side');
            }
        }
        //Not Done yet
    };
    //Make the request
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://hegdevignesh711.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    
    //Capture a list of the names and render it as a list
   
};
