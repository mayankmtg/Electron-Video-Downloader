var btn = document.getElementById("loader");
var maincontent=document.getElementById("maincontent");
var counter=0;
var ourData;
btn.addEventListener("click", function(){
	if(counter==0){
		var ourRequest= new XMLHttpRequest();		
		ourRequest.open('GET', './server/contents.json');
		ourRequest.onload = function(){
			ourData=JSON.parse(ourRequest.responseText);
			setHTML(ourData);
		};
		ourRequest.send();
	}		
	counter=counter+1;
});

function setHTML(data){
	var stringHTML='';
	var i=0;
	for(i=0;i<data.length;i++){
		stringHTML+="<div class='col-md-4'>";
		stringHTML+="<h2>"+data[i].name+"</h2>";
		stringHTML+="<p><a class='btn btn-default' href='#' role='button' onClick='Download("+i+")'>Download &raquo;</a></p>";
		stringHTML+="</div>";
	}
	maincontent.insertAdjacentHTML('beforeend', stringHTML);
}

function Download(num){
	//console.log(ourData[num].name);
	var link=ourData[num].link;

	var exec = require('child_process').exec, child;

	child = exec('curl -v -X GET -H "range: bytes=1-8" '+link,
	function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	        console.log('exec error: ' + error);
	    }
	});
	child();
}