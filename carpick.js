//document.cookie = "car=truckL;";
//document.cookie = "zip=32810;";
/*if(document.cookie != ""){

			}else{
	//no cookie
}*/

//document.cookie="username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

$(document).ready(function(){
//var decodedCookie = decodeURIComponent(document.cookie);
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
var curCookie;
	//alert(document.cookie);
	if(getCookie("car")!=""){
		/*curCookie =  document.cookie;
		var curCookies = curCookie.split(";");
		alert(curCookies);
		var cCar = curCookies[0];
		var cZip = curCookies[1];
		cCar = cCar.split("=")[1];
		cZip = cZip.split("=")[1];
		$("#zipInput").val(""+cZip+"");
		$("#carSelect").val(""+cCar+"");*/
		var cCar = getCookie("car");
		var cZip = getCookie("zip");
		$("#zipInput").val(""+cZip+"");
		$("#carSelect").val(""+cCar+"");
		
	} else{
/*		alert(curCookie);
		var cCar = false;
		var cZip = false;*/
		document.cookie = "car=sedan;";
		document.cookie = "zip=32804;";
		var cCar = "sedan";
		var cZip = "32804";
		$("#zipInput").val(""+cZip+"");
		$("#carSelect").val(""+cCar+"");
		//alert(false);
	}


  //var chosenCar = $(this).find("img").hasClass("selected-car-type");
var pickedSedan = $('#detail-wash-sedan img').hasClass("selected-car-type");
var pickedCoupe = $('#detail-wash-coupe img').hasClass("selected-car-type");
var vSedan = $('#detail-wash-sedan');
var vCoupe = $('#detail-wash-coupe');
var vSUV = $('#detail-wash-suv');
var vCaravan = $('#detail-wash-caravan');
var vTruck = $('#detail-wash-truck-2-doors');
var vTruckLarge = $('#detail-wash-truck-large-3-doors-4-doors');


const distFee = ["10","15","25","50","E-mail us for specialty projects."];
const carTypes = [vSedan,vCoupe,vSUV,vCaravan,vTruck,vTruckLarge];
const carSelection = ["sedan","coupe","suv","caravan","truck","truckL"];
//basic-vip-showroom-machine
const pSedan = ["60","100","600","180"];
const pCoupe = [pSedan[0],pSedan[1],"400",pSedan[3]];
const pSUV = ["100","140","800","220"];
const pCaravan = ["120","160",pSUV[2],pSUV[3]];
const pTruck = ["100","140","1000","250"];
const pTruckL = ["140","180",pTruck[2],"300"];

var curItem;
var selectedCarType;
const selectedCarTypeLabel = ["Sedan","Coupe","SUV","Caravan","Truck 2 Door","Truck 3/4 Door"];
var outofbounds = false;

function distPrice(zipDist, distFee, outofbounds){
	
	var price;
	
	if(outofbounds == true){
		
		return distFee[4];
		
	} else{
	
	if((zipDist < 9.5)&&(zipDist >= 0)){
	   // is less than 9.5 miles but greater than 0 miles
		price = distFee[0];
		
	   } else if((zipDist < 14.5)&&(zipDist >= 9.5)){
		  // is less than 14.5 miles but greater than 9.5 miles 
	   		price = distFee[1];
	   } else if((zipDist < 24.5)&&(zipDist >= 14.5)){
		   // is less than 24.5 miles but greater than 14.5 miles 
	   		price = distFee[2];
	   } else if((zipDist <= 60)&&(zipDist >= 24.5)){
		   // is less than or equal to 60 miles but greater than 24.5 miles 
	   		price = distFee[3];
	   } else {
		   // is out of bounds anyways
		   return distFee[4];
		   
	   }
	
		return price;
		
	}
	
}
	
function curCarSelected(car){
	var price;
	if(car == "sedan"){
price = pSedan;
} else if(car == "coupe"){
price = pCoupe;
} else if(car == "suv"){
price = pSUV;
} else if(car == "caravan"){
price = pCaravan;
} else if(car == "truck"){
price = pTruck;
} else if(car == "truckL"){
price = pTruckL;
}
return price;	
}	
	

	

function pickCar(car){
	
if(car == vSedan){
selectedCarType = "Sedan";
} else if(car == vCoupe){
selectedCarType = "Coupe";
} else if(car == vSUV){
selectedCarType = "SUV";
} else if(car == vCaravan){
selectedCarType = "Caravan";
} else if(car == vTruck){
selectedCarType = "Truck";
} else if(car == vTruckLarge){
selectedCarType = "TruckLarge";
}
 	
	}  
//-----------------------------------	
function writeInfoSelected(carPrice,carLabel){
	
	$("#essential-car-detail-and-wash-pricing").empty().append("<h2>"+ carPrice +"*</h2>");
	
	$("#carType").empty().append("<h2>" + carLabel +"*</h2>") ;
	$("#curCarType").empty().append(carLabel) ;
	
}
//----------------------------------	
function checkCarTypes(item, curItem) {
if(item != curItem){
      $(item).find("img").removeClass('selected-car-type');
      $(item +" #i-drive-car-label").removeClass("chosenCar");
      $(item +" #i-drive-car-type").removeClass("chosenCar");
    }else{
      //nada  
  }
}
function removeClasses(item, curItem){
  if(item != curItem){
  $(item).find("img").removeClass('selected-car-type');
  $(item).find("#i-drive-car-label").removeClass('chosenCar').hide();
  $(item).find("#i-drive-car-type").removeClass('chosenCar');
 }
}

function addClasses(item){
  $(item).find("img").addClass('selected-car-type');
  $(item).find("#i-drive-car-label").addClass('chosenCar').show();
  $(item).find("#i-drive-car-type").addClass('chosenCar');
}
 
 
$(vSedan).click(function(){
    if($(this).find("img").hasClass("selected-car-type") == true){
      //do nothing
    }else{
      curItem = $(this);
      carTypes.forEach(removeClasses);
      addClasses($(this));
      writeInfoSelected(pSedan[0],selectedCarTypeLabel[0]);
    }
  });


$(vCoupe).click(function(){
    if($(this).find("img").hasClass("selected-car-type") == true){
      //do nothing
    }else{
      curItem = $(this);
      carTypes.forEach(removeClasses);
      addClasses($(this));
      writeInfoSelected(pCoupe[0],selectedCarTypeLabel[1]);
    }  
  });


$(vSUV).click(function(){
    if($(this).find("img").hasClass("selected-car-type") == true){
      //do nothing
    }else{
      curItem = $(this);
      carTypes.forEach(removeClasses);
      addClasses($(this));
      writeInfoSelected(pSUV[0],selectedCarTypeLabel [2]);
    }  
  });


$(vCaravan).click(function(){
    if($(this).find("img").hasClass("selected-car-type") == true){
      //do nothing
    }else{
      curItem = $(this);
      carTypes.forEach(removeClasses);
      addClasses($(this));
      writeInfoSelected(pCaravan[0],selectedCarTypeLabel [3]);
    }  
  });


$(vTruck).click(function(){
    if($(this).find("img").hasClass("selected-car-type") == true){
      //do nothing
    }else{
      curItem = $(this);
      carTypes.forEach(removeClasses);
      addClasses($(this));
      writeInfoSelected(pTruck[0] , selectedCarTypeLabel[4] );
    }  
  });


$(vTruckLarge).click(function(){
    if($(this).find("img").hasClass("selected-car-type") == true){
      //do nothing
    }else{
      curItem = $(this);
      carTypes.forEach(removeClasses);
      addClasses($(this));
      writeInfoSelected( pTruckL[0], selectedCarTypeLabel [5]);
    }  
  });


//-------------------------

$(".openBox").click(function(){
	$(".popbox").fadeIn();
	
	});
	
$(".popbox").click(function(e){
 if (e.target !== this)
    return;
  
  //alert( 'clicked the foobar' );
	$(".popbox").fadeOut();
	});
$(".closeBox").click(function(){
		
	$(".popbox").fadeOut();

	});

var curZip = $("#zipInput").val();
var curCar = $("#carSelect").val();
var curDist;
var curDistPrice;
function checkZip(zipFound, zipArray){
	
	
}

	function changePricing(car){
	
	var price = curCarSelected(car);
$(".bgBox-alt-bg1-end h2").empty().append("$"+ price[0] +".00<sup>*</sup>");
$(".bgBox-alt-bg2-end h2").empty().append("$"+ price[1] +".00<sup>*</sup>");
$(".bgBox-alt-bg3-end h2").empty().append("$"+ price[2] +".00<sup>*</sup>");
		
	}
	
changePricing(curCar);	
	
$("#carSelect").change(function(){
	
		   curCar = $("#carSelect").val();
		  document.cookie = "car="+curCar;
		  changePricing(curCar);
});
	
	

$("#zipInput").focusout(function(){
		
	  curZip = $("#zipInput").val();
	  
		if(zips[""+ curZip +""]){
		  
		  curZip = zips[""+ curZip +""]["zip"];
		  curDist = zips[""+ curZip +""]["distance"];
		  curDistPrice = distPrice(curDist, distFee, false);
		  //alert("found zip: "+ curZip+" distance:"+ curDist);
		  
		  $("#distFee").empty().append("$"+ curDistPrice +".00").removeClass("distFeeSpecial");
		  $("#zipInput").removeClass("zipCodeError");
			document.cookie = "zip="+curZip;
			//alert(document.cookie);
		  
	  } else {
		  
		  curDistPrice = distFee[4];
		  //alert("Zip not found or out of bounds: "+ curZip +", "+ curDistPrice);
		  $("#distFee").empty().append(""+ curDistPrice +"").addClass("distFeeSpecial");
		  $("#zipInput").addClass("zipCodeError");
	  }
						});
	
$('#zipInput').keypress(function (e) {
  if (e.which == 13) {
	  
   	  curZip = $("#zipInput").val();
	  
		if(zips[""+ curZip +""]){
		  
		  curZip = zips[""+ curZip +""]["zip"];
		  curDist = zips[""+ curZip +""]["distance"];
		  curDistPrice = distPrice(curDist, distFee, false);
		  //alert("found zip: "+ curZip+" distance:"+ curDist);
		  
		  $("#distFee").empty().append("$"+ curDistPrice +".00").removeClass("distFeeSpecial");
		  $("#zipInput").removeClass("zipCodeError");
			document.cookie = "zip="+curZip;
			//alert(document.cookie);
			return false;
		  
	  } else {
		  
		  curDistPrice = distFee[4];
		  //alert("Zip not found or out of bounds: "+ curZip +", "+ curDistPrice);
		  $("#distFee").empty().append(""+ curDistPrice +"").addClass("distFeeSpecial");
		  $("#zipInput").addClass("zipCodeError");
		  return false;
	  }
	  
  }
	
	
});
	
});// JavaScript Document

