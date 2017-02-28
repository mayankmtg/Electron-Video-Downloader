var btn = document.getElementById("loader");
var maincontent=document.getElementById("maincontent");
var counter=0;

btn.addEventListener("click", function(){
	if(counter==0){
		var ourRequest= new XMLHttpRequest();
		ourRequest.open('GET', 'https://raw.githubusercontent.com/mayankmtg/Electron-Video-Downloader/master/contents.json');
		ourRequest.onload = function(){
			var ourData=JSON.parse(ourRequest.responseText);
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
		stringHTML+="<p><a class='btn btn-default' href="+data[i].link+" role='button'>Listen/View &raquo;</a></p>";
		stringHTML+="</div>";
	}
	maincontent.insertAdjacentHTML('beforeend', stringHTML);
}