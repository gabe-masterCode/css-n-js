//document.cookie = "car=truckL;";
//document.cookie = "zip=32810;";
/*if(document.cookie != ""){

			}else{
	//no cookie
}*/

//document.cookie="username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

$(document).ready(function(){
//var decodedCookie = decodeURIComponent(document.cookie);
	var cCar;
	var cZip;
	var cFee;
	var curZip = $("#zipInput").val();
	var curCar = $("#carSelect").val();
	var curCappedDistInfo = [];
	var curDist;
	var curDistPrice;
	var curDistBotTitle;
	var distType;


//var chosenCar = $(this).find("img").hasClass("selected-car-type");
var pickedSedan = $('#detail-wash-sedan img').hasClass("selected-car-type");
var pickedCoupe = $('#detail-wash-coupe img').hasClass("selected-car-type");
var vSedan = $('#detail-wash-sedan');
var vCoupe = $('#detail-wash-coupe');
var vSUV = $('#detail-wash-suv');
var vCaravan = $('#detail-wash-caravan');
var vTruck = $('#detail-wash-truck-2-doors');
var vTruckLarge = $('#detail-wash-truck-large-3-doors-4-doors');


var distFee = ["10","15","25","50","<b>Contact us.</b>"];
var carTypes = [vSedan,vCoupe,vSUV,vCaravan,vTruck,vTruckLarge];
var carSelection = ["sedan","coupe","suv","caravan","truck","truckL"];
//-----------basic-vip-showroom-machine
var pSedan = ["80","180","600","180"];
var pCoupe = ["80","140","400",pSedan[3]];
var pSUV = ["140","200","800","250"];
var pCaravan = ["220","280","1000","400"];
var pTruck = ["130","200","800","280"];
var pTruckL = ["200","280","1000",pTruck[3]];

var curItem;
var selectedCarType;
var selectedCarTypeLabel = ["Sedan","Coupe","SUV","Caravan","Truck 2 Door","Truck 3/4 Door"];
var outofbounds = false;
var packPageBotCarTitle = ["For Sedans Starting from:","For Coupes Starting from:","For SUVs Starting from:","For Caravans Starting from:","For Trucks (2-Door) Starting from:","For Trucks (3/4-Door) Starting from:","Starting from:"];
var packPageBotDistTitle = ["Service Distance Charge: $"+ distFee[0] +".00","Service Distance Charge: $"+ distFee[1] +".00","Service Distance Charge: $"+ distFee[2] +".00","Service Distance Charge: $"+ distFee[3] +".00","Service Distance Charge: "+ distFee[4]];

function distPrice(zipDist, distFee, distBotTitle, outofbounds){
	
	//var price;
	var returnInfo = [];
	
	if(outofbounds == true){
		returnInfo[0] = distFee[4];
		returnInfo[1] = distBotTitle[4];
		distType = 4; //0-4 - meaning in the order to unreachable, 5 types. reusable for update url fuction
		return returnInfo;
		
	} else{
	
	if((zipDist < 9.5)&&(zipDist >= 0)){
	   // is less than 9.5 miles but greater than 0 miles
		returnInfo[0] = distFee[0];
		returnInfo[1] = distBotTitle[0];
		distType = 0;
		
	   } else if((zipDist < 14.5)&&(zipDist >= 9.5)){
		  // is less than 14.5 miles but greater than 9.5 miles 
	   		returnInfo[0] = distFee[1];
			returnInfo[1] = distBotTitle[1];
		    distType = 1;
	   } else if((zipDist < 24.5)&&(zipDist >= 14.5)){
		   // is less than 24.5 miles but greater than 14.5 miles 
	   		returnInfo[0] = distFee[2];
			returnInfo[1] = distBotTitle[2];
		   	distType = 2;
	   } else if((zipDist <= 60)&&(zipDist >= 24.5)){
		   // is less than or equal to 60 miles but greater than 24.5 miles 
	   		returnInfo[0] = distFee[3];
			returnInfo[1] = distBotTitle[3];
		    distType = 3;
	   } else {
		   // is out of bounds anyways
		   	returnInfo[0] = distFee[4];
			returnInfo[1] = distBotTitle[4];
		    distType = 4;
			return returnInfo;
		   
	   }
	
		return returnInfo;
		
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

function curCarSelectedBotLabel(car){
	var title;
	if(car == "sedan"){
title = packPageBotCarTitle[0];
} else if(car == "coupe"){
title = packPageBotCarTitle[1];
} else if(car == "suv"){
title = packPageBotCarTitle[2];
} else if(car == "caravan"){
title = packPageBotCarTitle[3];
} else if(car == "truck"){
title = packPageBotCarTitle[4];
} else if(car == "truckL"){
title = packPageBotCarTitle[5];
}
return title;	
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


function checkZip(zipFound, zipArray){
	
	
}

	function changePricing(car){
	
	var price = curCarSelected(car);
	var botTitle = curCarSelectedBotLabel(car);
//$(".bgBox-alt-bg1-end h2").empty().append("$"+ price[0] +".00<sup>*</sup>");
//$(".bgBox-alt-bg2-end h2").empty().append("$"+ price[1] +".00<sup>*</sup>");
//$(".bgBox-alt-bg3-end h2").empty().append("$"+ price[2] +".00<sup>*</sup>");
		$(".bgBox-alt-bg1-end h2, .carPrice1").empty().append("$"+ price[0] +".00");
		$(".bgBox-alt-bg2-end h2, .carPrice2").empty().append("$"+ price[1] +".00");
		$(".bgBox-alt-bg3-end h2, .carPrice3").empty().append("$"+ price[2] +".00");
		$(".bgBox-alt-bg4-end h2, .carPrice4").empty().append("$"+ price[3] +".00");
		$(".bgBox-alt-bg1-end small,.bgBox-alt-bg2-end small,.bgBox-alt-bg3-end small, .carType").empty().append(botTitle);
	}
	

	function changeDistFee(){
		 curZip = $("#zipInput").val();
	  
		if(zips[""+ curZip +""]){
		  
		  curZip = zips[""+ curZip +""]["zip"];
		  curDist = zips[""+ curZip +""]["distance"];
		  curCappedDistInfo =  distPrice(curDist, distFee, packPageBotDistTitle, false);
		  curDistPrice = curCappedDistInfo[0];
		  curDistBotTitle = curCappedDistInfo[1];
		  //alert("found zip: "+ curZip+" distance:"+ curDist);
		  
		  $("#distFee").empty().append("$"+ curDistPrice +".00").removeClass("distFeeSpecial");
		  $(".distFee1").empty().append("$"+ curDistPrice +".00").removeClass("distFeeSpecial");
		  $("#zipInput").removeClass("zipCodeError");
			
		$(".bgBox-alt-bg1-end em, .bgBox-alt-bg2-end em, .bgBox-alt-bg3-end em").empty().append(curDistBotTitle);
		
		}else{
			
		  curDistPrice = distFee[4];
		  curDistBotTitle = packPageBotDistTitle[4];
		  //alert("Zip not found or out of bounds: "+ curZip +", "+ curDistPrice);
		  $(".bgBox-alt-bg1-end em, .bgBox-alt-bg2-end em, .bgBox-alt-bg3-end em").empty().append(curDistBotTitle);
		  $("#distFee").empty().append(""+ curDistPrice +"").addClass("distFeeSpecial");
		  $(".distFee1").empty().append(""+ curDistPrice +"").addClass("distFeeSpecial");
		  $("#zipInput").addClass("zipCodeError");
			
		}
		
		
	}

function updateLinks (bVal, carType, distType){//bVall is boolean value so true or false
	
	var buyText = "<b>Register & Buy</b>";
	var alertText = "<b>Update your info.</b>";
	if( bVal == true){
		if(carType == "caravan"){
	    	$('.bookingNum1').attr('href',baseURL+bwCaravan[distType]);
	    	$('.bookingNum2').attr('href',baseURL+vpCaravan[distType]);
	    	$('.bookingNum3').attr('href',baseURL+srCaravan[distType]);
	    	$('.bookingNum4').attr('href',baseURL+mwCaravan[distType]);
			$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').empty().append(buyText);
			} else if(carType == "coupe"){
				$('.bookingNum1').attr('href',baseURL+bwCoupe[distType]);
				$('.bookingNum2').attr('href',baseURL+vpCoupe[distType]);
				$('.bookingNum3').attr('href',baseURL+srCoupe[distType]);
				$('.bookingNum4').attr('href',baseURL+mwCoupe[distType]);
				$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').empty().append(buyText);
				} else if(carType == "sedan"){
					$('.bookingNum1').attr('href',baseURL+bwSedan[distType]);
					$('.bookingNum2').attr('href',baseURL+vpSedan[distType]);
					$('.bookingNum3').attr('href',baseURL+srSedan[distType]);
					$('.bookingNum4').attr('href',baseURL+mwSedan[distType]);
					$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').empty().append(buyText);
					} else if(carType == "suv"){
				 		$('.bookingNum1').attr('href',baseURL+bwSUV[distType]);
						$('.bookingNum2').attr('href',baseURL+vpSUV[distType]);
						$('.bookingNum3').attr('href',baseURL+srSUV[distType]);
						$('.bookingNum4').attr('href',baseURL+mwSUV[distType]);
						$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').empty().append(buyText);
				 		} else if(carType == "truck"){
				 			$('.bookingNum1').attr('href',baseURL+bwTruck[distType]);
							$('.bookingNum2').attr('href',baseURL+vpTruck[distType]);
							$('.bookingNum3').attr('href',baseURL+srTruck[distType]);
							$('.bookingNum4').attr('href',baseURL+mwTruck[distType]);
							$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').empty().append(buyText);
				 			} else if(carType == "truckL"){
		 						$('.bookingNum1').attr('href',baseURL+bwTruckL[distType]);
								$('.bookingNum2').attr('href',baseURL+vpTruckL[distType]);
								$('.bookingNum3').attr('href',baseURL+srTruckL[distType]);
								$('.bookingNum4').attr('href',baseURL+mwTruckL[distType]);
								$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').empty().append(buyText);
				 }else{
					 
					 			$('.bookingNum1').attr('href','#');
								$('.bookingNum2').attr('href','#');
								$('.bookingNum3').attr('href','#');
								$('.bookingNum4').attr('href','#');
					 			$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').removeAttr('href').empty().append(alertText);
					 			$("#carSelectBar").toggle(highlight);
					 
				 }
	   }else{
	   
		   
		   						$('.bookingNum1').attr('href','#');
								$('.bookingNum2').attr('href','#');
								$('.bookingNum3').attr('href','#');
								$('.bookingNum4').attr('href','#');
					 			$('.bookingNum1 ,.bookingNum2 ,.bookingNum3 ,.bookingNum4').removeAttr('href').empty().append(alertText);
		   						$("#carSelectBar").toggle(highlight);
		   						//$(  'selector' ).prop( "class", "disable" );
	   }
	
}	

	

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
var curCookie;
	//alert(document.cookie);
	//if((document.cookie)&&(getCookie("car")!="")&&(getCookie("zip")!="")&&(getCookie("fee")!="")){
	if((document.cookie)&&(getCookie("car"))&&(getCookie("zip"))&&(getCookie("fee"))){
		/*curCookie =  document.cookie;
		var curCookies = curCookie.split(";");
		
		var cCar = curCookies[0];
		var cZip = curCookies[1];
		cCar = cCar.split("=")[1];
		cZip = cZip.split("=")[1];
		$("#zipInput").val(""+cZip+"");
		$("#carSelect").val(""+cCar+"");*/
		
		
		     
		cCar = getCookie("car");
		cZip = getCookie("zip");
		cFee = getCookie("fee");
		//alert(cCar+" "+cZip+" "+cFee);
		$("#zipInput").val(cZip);
		$("#carSelect").val(cCar);
		$("#distFee").empty().append("$"+cFee+".00");
		curCar = $("#carSelect").val();
		document.cookie = "car="+cCar;
		document.cookie = "zip="+cZip;
		document.cookie = "fee="+cFee;
		changePricing(cCar);
		changeDistFee();
		updateLinks (true, cCar, distType);
		
	} else{
/*		alert(curCookie);
		var cCar = false;
		var cZip = false;*/
		document.cookie = "car=sedan";
		document.cookie = "zip=32804";
		document.cookie = "fee=10";
		cCar = "sedan";
		cZip = "32804";
		cFee = "10";
		curCar = cCar;
		curZip = cZip;
		$("#zipInput").val(cZip);
		$("#carSelect").val(cCar);
		$("#distFee,.distFee1").empty().append("$"+cFee+".00");
		changePricing(cCar);
		changeDistFee();
		updateLinks (true, cCar, distType);
		//alert(false);
	}	
	
$("#carSelect").change(function(){
	
		   curCar = $("#carSelect").val();
		  document.cookie = "car="+curCar;
		  changePricing(curCar);
		  updateLinks (true, curCar, distType);
});
	
$("#zipInput").focusout(function(){
		
	  curZip = $("#zipInput").val();
	  changeDistFee();
	  updateLinks (true, curCar, distType);
		if(zips[""+ curZip +""]){
		 
/*		  curZip = zips[""+ curZip +""]["zip"];
		  curDist = zips[""+ curZip +""]["distance"];
		  curCappedDistInfo =  distPrice(curDist, distFee, packPageBotDistTitle, false);
		  curDistPrice = curCappedDistInfo[0];
		  curDistBotTitle = curCappedDistInfo[1];
		  //alert("found zip: "+ curZip+" distance:"+ curDist);
		  
		  $("#distFee").empty().append("$"+ curDistPrice +".00").removeClass("distFeeSpecial");
		  $("#zipInput").removeClass("zipCodeError");*/
			document.cookie = "zip="+curZip;
			document.cookie = "fee="+curDistPrice;
			//changeDistFee(curDistPrice,curDistBotTitle);
			changeDistFee();
			
			//alert(document.cookie);
		  
	  } else {
		  updateLinks (false, curCar, distType);
		  //curDistPrice = distFee[4];
		  //alert("Zip not found or out of bounds: "+ curZip +", "+ curDistPrice);
		  //$("#distFee").empty().append(""+ curDistPrice +"").addClass("distFeeSpecial");
		  //$("#zipInput").addClass("zipCodeError");
	  }
						});
	
$('#zipInput').keypress(function (e) {
  if (e.which == 13) {
	  
   	  curZip = $("#zipInput").val();
	  changeDistFee();
	  updateLinks (true, curCar, distType);
		if(zips[""+ curZip +""]){
		  
		 /* curZip = zips[""+ curZip +""]["zip"];
		  curDist = zips[""+ curZip +""]["distance"];
		  curCappedDistInfo =  distPrice(curDist, distFee, packPageBotDistTitle, false);
		  curDistPrice = curCappedDistInfo[0];
		  curDistBotTitle = curCappedDistInfo[1];*/
		  //alert("found zip: "+ curZip+" distance:"+ curDist);
		  
		  /*$("#distFee").empty().append("$"+ curDistPrice +".00").removeClass("distFeeSpecial");
		  $("#zipInput").removeClass("zipCodeError");*/
			document.cookie = "zip="+curZip;
			document.cookie = "fee="+curDistPrice;
			//alert(document.cookie);
			return false;
		  
	  } else {
		  
		  /*curDistPrice = distFee[4];
		  //alert("Zip not found or out of bounds: "+ curZip +", "+ curDistPrice);
		  $("#distFee").empty().append(""+ curDistPrice +"").addClass("distFeeSpecial");
		  $("#zipInput").addClass("zipCodeError");*/
		  updateLinks (false, curCar, distType);
		  return false;
	  }
	  
  }
	
	
});

changePricing(curCar);	
changeDistFee();
updateLinks (true, curCar, distType);
//changeDistFee($().,distBotTitle);	


var scrollToBDW = $(".scrollToBDW");
var scrollToVIP = $(".scrollToVIP");
var scrollToSHRM = $(".scrollToSHRM");
var scrollToMW = $(".scrollToMW");
var scrollTo = [$("#BasicDetailAndWashPackage"),$("#VIPPackage"),$("#ShowroomPackage"),$("#MachineWaxService")];
	

	function scrollToFocus(button){
		
		if(button == scrollToBDW){
			//$(scrollTo[0]).scrollTop();
			return scrollTo[0];
		} else if(button == scrollToVIP){
			//$(scrollTo[1]).scrollTop();
			return scrollTo[1];
		} else if(button == scrollToSHRM){
			//$(scrollTo[2]).scrollTop();
			return scrollTo[2];
		} else if(button == scrollToMW){
			//$(scrollTo[3]).scrollTop();
			return scrollTo[3];
		}	
		
			
		
/*		$("#button").click(function() {
				$([document.documentElement, document.body]).animate({
				scrollTop: $("#elementtoScrollToID").offset().top
			}, 2000);
});*/
		
	}
	
/*$(".scrollToBDW, .scrollToVIP, .scrollToSHRM, .scrollToMW").click(function(){
	
	//var button = $(this);
	
	var scrollHere = scrollToFocus($(this));
	alert(scrollHere);
	$('html, body').animate({
                    scrollTop: scrollHere.offset().top
                }, 200);
	
	
});	*/
	
$(".scrollToBDW").click(function(){
	
	//var button = $(this);
	
	var scrollHere = scrollTo[0];
	//alert(scrollHere);
	$('html, body').animate({
                    scrollTop: scrollHere.offset().top
                }, 200);
	
	
});		

	$(".scrollToVIP").click(function(){
	
	//var button = $(this);
	
	var scrollHere = scrollTo[1];
	//alert(scrollHere);
	$('html, body').animate({
                    scrollTop: scrollHere.offset().top
                }, 200);
	
	
});	
	$(".scrollToSHRM").click(function(){
	
	//var button = $(this);
	
	var scrollHere = scrollTo[2];
	//alert(scrollHere);
	$('html, body').animate({
                    scrollTop: scrollHere.offset().top
                }, 200);
	
	
});	
	$(".scrollToMW").click(function(){
	
	//var button = $(this);
	
	var scrollHere = scrollTo[3];
	//alert(scrollHere);
	$('html, body').animate({
                    scrollTop: scrollHere.offset().top
                }, 200);
	
	
});	
	
});// JavaScript Document
