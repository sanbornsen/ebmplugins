/*
Modal java script
*/
function open_modal(){
	$("#basic-modal-content").modal({onClose: function (dialog) {
			$("#basic-modal-content").css('display','none');
      $.modal.close();	
		}});
}
/*
End of modal javascript
*/

function select_gender(i,link){
  var img = document.body.getElementsByTagName("img"); 
  var el = img[i];
  getpoints(el,link);
  /*open_modal();
  var modal_el = document.getElementById("basic-modal-content");
  var new_html = '<img id="qimage" src="'+link+'" style="max-width:316.4px ; max-height:292.5px; margin:auto; z-index:-2;">';
  modal_el.innerHTML = new_html;*/
  //var prev_html = el.parentNode.innerHTML;
	//var new_html = "<a class='btn' onclick='javascript:get_result(this.innerHTML,\""+link+"\")'>Men Topwear</a>&nbsp&nbsp<a class='btn' onclick='javascript:get_result(this.innerHTML,\""+link+"\")'>Women Topwear</a>";
	//document.getElementById('basic-modal-content').innerHTML =  new_html;
	//get_result('Women Topwear',link);
}

function getPageTopLeft(el) {
    var rect = el.getBoundingClientRect();
    var docEl = document.documentElement;
    return {
        left: rect.left + (window.pageXOffset || docEl.scrollLeft || 0),
        top: rect.top + (window.pageYOffset || docEl.scrollTop || 0)
    };

 }


function getpoints(elem,link){
  var id = 1;
  var tl = getPageTopLeft(elem);
//point.style.top = parseFloat(point.style.top)+tl['top'];
//point.style.left = parseFloat(point.style.left)+tl['left']; 
  var img_height = parseFloat(elem.clientHeight);
  var img_width = parseFloat(elem.clientWidth);
  var prev_htm = "";  
  var xmlhttp;
  if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
  else{// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        if(xmlhttp.responseText != '0'){
          var coordinates = JSON.parse(xmlhttp.responseText);
          for(var k=0;k<coordinates.length;k++){
            var str = coordinates[k].split(" ");
            var pre_left = parseInt(str[1])+15;
            var pre_top = parseInt(str[0])+10;
            var img_top = parseFloat((img_height*pre_top)/100);
            var img_left = parseFloat((img_width*pre_left)/100); 
            var top = img_top+tl['top'];
            var left = img_left+tl['left'];
	
	    //alert(tl['top']);alert(img_top);alert(img_height);
            
            htm = '<img onclick="javascript:get_result_from_point(\''+link+'\',\''+coordinates[k]+'\',this)" src="http://eyeballme.co/ebmtool_pointer.png" style="cursor:pointer;max-height:30px; opacity:.5; max-width:30px; position: absolute; z-index: 1000; left: '+left+'px; top: '+top+'px;">';
            prev_htm += htm;
	    //alert(prev_htm);
          }
	document.getElementById('markers').innerHTML = prev_htm;
        }
    }
    }
  xmlhttp.open("POST","http://www.eyeballme.co/ebmapp/publisher/getpointsbylink",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("image="+link);
}


function get_result_from_point(link,index,el){
	//document.getElementById("basic-modal-content").innerHTML = '<center><img src="http://www.vindowshop.com/ebmplugins/img/ajax-loader.gif"></center>';
	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else{// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	if(xmlhttp.responseText != '0'){
	    		var string = xmlhttp.responseText;
	    		//string = replaceAll('"','',string);
	    		//string = replaceAll("'",'"',string);
	    		var data = JSON.parse(string);
	    		var new_html ="<!-- Modal content goes here --><div style='height:100%;overflow:auto'>";
	    		for(var j=0;j<data.length;j++){
		    		new_html += "<a target='_blank' href='"+data[j].URL+"'>";
			    	new_html += "<img style='padding:5px;max-height:250px; max-width:200px' src='http://www.beta.vindowshop.com/Data/resized_images/"+data[j].Imagepath+"'></a>";
		      		}
		      new_html += "</div>";
		      //alert();
		      open_modal();
		      document.getElementById("basic-modal-content").innerHTML = new_html;
	    	}
		}
	  }
	xmlhttp.open("POST","http://www.eyeballme.co/ebmapp/publisher/getresbylink",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("image="+link+"&index="+index);
}




function get_result(val,link){
var el = document.getElementById("basic-modal-content");
el.innerHTML = '<center><img src="http://www.vindowshop.com/ebmplugins/img/ajax-loader.gif"></center>';
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    var string = xmlhttp.responseText;
    string = replaceAll('"','',string);
    string = replaceAll("'",'"',string);
    var data = JSON.parse(string);
    var new_html = "<!-- Modal content goes here --><div style='height:350px;overflow:auto'>";
    for(var i=0;i<data.length;i++){
    	new_html += "<a target='_blank' href='"+data[i].URL+"'><img style='padding:5px;max-height:250px; max-width:200px' src='http://www.beta.vindowshop.com/Data/resized_images/"+data[i].Imagepath+"'></a>";
    }
    new_html += '</div>';
    el.innerHTML=new_html;
    }
  }
xmlhttp.open("POST","http://vindowshop.com:5201/fetchprodauto",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//xmlhttp.send('["'+link+'","'+val+'",600,600,0,0,100,100]');
xmlhttp.send('["'+link+'","'+val+'"]');
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function lights_in(el){
	el.setAttribute('style','opacity:1.0;position: absolute; z-index: 1; top: 15px; right: 30px; max-height:40px');
}

function lights_out(el){
	el.setAttribute('style','opacity:0.4;position: absolute; z-index: 1; top: 15px; right: 30px; max-height:40px');
}


function inArray(needle, haystack) {
    //alert(needle);
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return i;
    }
    return 'not found';
}
