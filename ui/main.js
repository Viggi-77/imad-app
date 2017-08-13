//Counter Code
var button=document.getElementById('counter');
button.onclick= function(){
    //Make a request to the counter Endpoint
    var request= new XMLHttpRequest();
    //Capture response received and store it in a variable
    request.onreadystatechange = function(){
        if(request.readystate===XMLHttpRequest.DONE){
            //Take some action
        if (request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
        }
        //Not Done yet
    };
    //Make the request
    request.open('GET', 'http://hegdevignesh711.imad.hasura-app.io/counter', true);
    request.send(null);
};
