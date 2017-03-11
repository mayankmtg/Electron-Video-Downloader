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
		stringHTML+="<p><button type='button' class='btn btn-default' onclick='Download("+i+");'>Download &raquo;</button></p>";
		stringHTML+="</div>";
	}
	maincontent.insertAdjacentHTML('beforeend', stringHTML);
}

function Download(num){
	//console.log(ourData[num].name);
	var link=ourData[num].link;
	var name=ourData[num].name;
	var size=ourData[num].size;
	var chunk=1024;
	var n=size/chunk;
	var i;
	for(i=0;i<n-1;i++){
		if (shell.exec('curl -r 'chunk*i+'-'+(chunk)*(i+1)-1+ ' -o '+name+'_'+i+'.png '+link).code !== 0) {
			shell.echo('Error');
			shell.exit(1);
		}else{
			console.log("Chunk "+ i);	
		}
	}
	if (shell.exec('curl -r 'chunk*n-1+'- -o '+name+'_'+n-1+'.png '+link).code !== 0) {
		shell.echo('Error');
		shell.exit(1);
	}
	else{
		console.log("Chunk "+ n-1);	
		console.log("Finished");	
	}
}