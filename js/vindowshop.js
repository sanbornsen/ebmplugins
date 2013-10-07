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

function select_gender(el,link){
	//var prev_html = el.parentNode.innerHTML;
	//var new_html = "<a class='btn' onclick='javascript:get_result(this.innerHTML,\""+link+"\")'>Men Topwear</a>&nbsp&nbsp<a class='btn' onclick='javascript:get_result(this.innerHTML,\""+link+"\")'>Women Topwear</a>";
	//document.getElementById('basic-modal-content').innerHTML =  new_html;
	get_result('Women Topwear',link);
  open_modal();
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
    var data_cat = new Array();
    var cat_array = new Array();
    for(var i=0;i<data.length;i++){
      if(inArray(data[i].Category,cat_array) == 'not found'){
        cat_array.push(data[i].Category);
        data_cat[data[i].Category] = new Array();
      }
      data_cat[data[i].Category].push(data[i]);
    }
    var new_html = "<!-- Modal content goes here --><div style='height:350px;overflow:auto'>";
    for(var i=0;i<cat_array.length;i++){
      new_html += '<h1>'+cat_array[i]+'</h1>';
      for(var j=0;j<data_cat[cat_array[i]].length;j++){
    	 new_html += "<a target='_blank' href='"+data_cat[cat_array[i]][j].URL+"'><img style='padding:5px;max-height:250px; max-width:200px' src='http://www.beta.vindowshop.com/Data/resized_images/"+data_cat[cat_array[i]][j].Imagepath+"'></a>";
      }
      new_html += '<hr>';
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