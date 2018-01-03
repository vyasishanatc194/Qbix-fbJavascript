//var accountHolder = document.getElementsByName("profile_id");
//accountHolder = accountHolder[0].value;
var liObj = document.querySelectorAll("._698");
var fbFriendLogIn = new Array();		
//fbFriendLogIn[accountHolder] = new Array();		
for(var i = 0;i < liObj.length; i++){
	var userName = liObj[i].querySelectorAll("._6a div.fsl a"),			
	userFriend = liObj[i].querySelectorAll("._6a a._39g5"),			
	userFriendPicture = liObj[i].querySelectorAll(".clearfix a._5q6s img"),			
	friendUserId = liObj[i].querySelectorAll(".FriendRequestFriends");
	frienduserIDdone = friendUserId[0].dataset.profileid;
	userFriendPicture = (userFriendPicture.length > 0) ? userFriendPicture[0].currentSrc : "";
	var mutualfbfriend = new Array();
	var userObj = new Object();
	
	userObj = {				
		name :  userName[0].innerHTML,
		userId: friendUserId[0].dataset.profileid,
		detail : (userFriend.length > 0) ? userFriend[0].innerHTML : "",
		picture : userFriendPicture,
		mutualFriend : new Array(),
		url : 'https://www.facebook.com/profile.php?id='+frienduserIDdone+'&sk=friends'
	};
	//fbFriendLogIn[accountHolder].push(userObj);
	fbFriendLogIn.push(userObj);
}
//console.log(fbFriendLogIn);
var fbFriendLogInUser = new Array();
var index = 0
var intervalForMutualFriend = null;
var getMutualFriend = function(){
	//if(index < fbFriendLogIn.length){
	if(index < 4){
		var userFriend = new Object()
		userFriend = fbFriendLogIn[index];
		var mutualFriend    = window.open (userFriend.url, "_blank");
		mutualFriend.addEventListener (
			"load",
			function () {
				var mutualFriendDom = mutualFriend.document;
				mutualFriendGetObj = mutualFriendDom.querySelectorAll('._698');
				for(var j = 0;j < mutualFriendGetObj.length; j++){
					var mutualFriendUserName = mutualFriendGetObj[j].querySelectorAll("._6a div.fsl a"),	
					mutualuserFriend = mutualFriendGetObj[j].querySelectorAll("._6a a._39g5"),	
					mutualuserFriendPicture = mutualFriendGetObj[j].querySelectorAll(".clearfix a._5q6s img"),	
					friendUserId = mutualFriendGetObj[j].querySelectorAll(".FriendRequestFriends");	
					mutualuserFriend = (mutualuserFriend.length > 0) ? mutualuserFriend[0].innerHTML : "";	
					mutualuserFriendPicture = (mutualuserFriendPicture.length > 0) ? mutualuserFriendPicture[0].currentSrc : "";	
					var userMutual = {
						name :  mutualFriendUserName[0].innerHTML,
						userId : friendUserId[0].dataset.profileid,
						detail : mutualuserFriend,
						picture : mutualuserFriendPicture
					}
					userFriend.mutualFriend.push(userMutual);
				}
				fbFriendLogInUser[index] = userFriend;
			},
			false
		);
		index = index+1;
	}else{
		clearInterval(intervalForMutualFriend);
		console.log(fbFriendLogInUser);
	}
	
}
intervalForMutualFriend = setInterval(getMutualFriend, 5000);










=========================================================================================================================



var intervalForScroll = '';
var liObj = document.querySelectorAll("._698");
var liLength = liObj.length;
var scrollTime = 1;
var fbFriendLogIn = new Array();
var fbFriendLogInUser = new Array();
var getScroll = function(){
	console.log(liLength);
	window.scrollTo(0,document.body.scrollHeight);
	var allLoad = setTimeout(function (){
		if(scrollTime){
			var newLength = document.querySelectorAll("._698").length;
			if(liLength != newLength){
				liLength = newLength;
				console.log('here/'+ liLength);
				if(liLength > 100){
					scrollTime = 0;
				}
			}else{
				console.log('else here/'+ liLength);
				scrollTime = 0;
			}
		}else{
			console.log('else  ' + liLength);
		}
	},1000);
	if(!scrollTime){
		console.log('timeout' + document.querySelectorAll("._698").length);
		var liObj = document.querySelectorAll("._698");
		//var liLength = liObj.length;
		//fbFriendLogIn[accountHolder] = new Array();		
		for(var i = 0;i < liObj.length; i++){
			var userName = liObj[i].querySelectorAll("._6a div.fsl a"),			
			userFriend = liObj[i].querySelectorAll("._6a a._39g5"),			
			userFriendPicture = liObj[i].querySelectorAll(".clearfix a._5q6s img"),			
			friendUserId = liObj[i].querySelectorAll(".FriendRequestFriends");
			frienduserIDdone = friendUserId[0].dataset.profileid;
			userFriendPicture = (userFriendPicture.length > 0) ? userFriendPicture[0].currentSrc : "";
			var mutualfbfriend = new Array();
			var userObj = new Object();
			userObj = {				
				name :  userName[0].innerHTML,
				userId: friendUserId[0].dataset.profileid,
				detail : (userFriend.length > 0) ? userFriend[0].innerHTML : "",
				picture : userFriendPicture,
				mutualFriend : new Array(),
				url : 'https://www.facebook.com/profile.php?id='+frienduserIDdone+'&sk=friends'
			};
			//fbFriendLogIn[accountHolder].push(userObj);
			fbFriendLogIn.push(userObj);
		}
		clearInterval(intervalForScroll);
		clearTimeout(allLoad);
	}
}

intervalForScroll = setInterval(getScroll, 2000);




=======================
var intervalForScroll = '';
var liObj = document.querySelectorAll("._698");
var liLength = liObj.length;
var scrollTime = 1;
var fbFriendLogIn = new Array();
var fbFriendLogInUser = new Array();
var getScroll = function(){
	window.scrollTo(0,document.body.scrollHeight);
	var allLoad = setTimeout(function (){
		if(scrollTime){
			var newLength = document.querySelectorAll("._698").length;
			if(liLength != newLength){
				liLength = newLength;
			}else{
				scrollTime = 0;
			}
		}
	},1000);
	if(!scrollTime){
		var liObj = document.querySelectorAll("._698");
		for(var i = 0;i < liObj.length; i++){
			var userName = liObj[i].querySelectorAll("._6a div.fsl a"),			
			userFriend = liObj[i].querySelectorAll("._6a a._39g5"),			
			userFriendPicture = liObj[i].querySelectorAll(".clearfix a._5q6s img"),			
			friendUserId = liObj[i].querySelectorAll(".FriendRequestFriends");
			frienduserIDdone = friendUserId[0].dataset.profileid;
			userFriendPicture = (userFriendPicture.length > 0) ? userFriendPicture[0].currentSrc : "";
			var mutualfbfriend = new Array();
			var userObj = new Object();
			userObj = {				
				name :  userName[0].innerHTML,
				userId: friendUserId[0].dataset.profileid,
				detail : (userFriend.length > 0) ? userFriend[0].innerHTML : "",
				picture : userFriendPicture,
				mutualFriend : new Array(),
				url : 'https://www.facebook.com/profile.php?id='+frienduserIDdone+'&sk=friends'
			};
			fbFriendLogIn.push(userObj);
		}
		var index = 0;
		var initial = 10000;
		var intervalForMutualFriend = null;
		var fbFriendLogInUser = new Array();
		var getMutualFriend = function(){
			if(index < fbFriendLogIn.length){
			//if(index < 2){
				clearInterval(intervalForMutualFriend);
				var userFriend = new Object()
				userFriend = fbFriendLogIn[index];
				var mutualFriend    = window.open (userFriend.url, "_blank");
				mutualFriend.addEventListener (
					"load",
					function () {
						var mutualFriendDom = mutualFriend.document;
						var intervalForScrollForMutualFriend = '';
						var liObjForMutualFriend = mutualFriendDom.querySelectorAll("._698");
						var liObjForMutualFriendLength = liObjForMutualFriend.length;
						var scrollTimeMutualFreind = 1;
						var getScrollMutualFreind = function(){
							mutualFriend.scrollTo(0,mutualFriendDom.body.scrollHeight);
							var allLoadMutualFriend = setTimeout(function (){
								if(scrollTimeMutualFreind){
									var newLength = mutualFriendDom.querySelectorAll("._698").length;
									if(liObjForMutualFriendLength != newLength){
										liObjForMutualFriendLength = newLength;
									}else{
										scrollTimeMutualFreind = 0;
									}
								}
							},1000);
							if(scrollTimeMutualFreind == 0){
								clearTimeout(allLoadMutualFriend);
								mutualFriendGetObj = mutualFriendDom.querySelectorAll('._698');
								for(var j = 0;j < mutualFriendGetObj.length; j++){
									var mutualFriendUserName = mutualFriendGetObj[j].querySelectorAll("._6a div.fsl a"),	
									mutualuserFriend = mutualFriendGetObj[j].querySelectorAll("._6a a._39g5"),	
									mutualuserFriendPicture = mutualFriendGetObj[j].querySelectorAll(".clearfix a._5q6s img"),	
									/* friendUserId = mutualFriendGetObj[j].querySelectorAll(".FriendRequestFriends");	
									if(!(friendUserId.length > 0)){
										friendUserId = mutualFriendGetObj[j].querySelectorAll(".FriendRequestOutgoing")
										console.log(friendUserId);
									} */
									mutualuserFriend = (mutualuserFriend.length > 0) ? mutualuserFriend[0].innerHTML : "";	
									mutualuserFriendPicture = (mutualuserFriendPicture.length > 0) ? mutualuserFriendPicture[0].currentSrc : "";	
									var userMutual = {
										name :  mutualFriendUserName[0].innerHTML,
										//userId : friendUserId[0].dataset.profileid,
										detail : mutualuserFriend,
										picture : mutualuserFriendPicture
									}
									userFriend.mutualFriend.push(userMutual);
								}
								fbFriendLogInUser[index] = userFriend;
								//fbFriendLogIn[index] = userFriend;
								clearInterval(intervalForScrollMutualFriend);
								intervalForMutualFriend = setInterval(getMutualFriend, initial);
							}
						}
						intervalForScrollMutualFriend = setInterval(getScrollMutualFreind, 2000);
					},
					false
				);
				index = index+1;
			}else{
				clearInterval(intervalForMutualFriend);
				//console.log(fbFriendLogInUser);
				console.log(fbFriendLogIn);
			}
			
		}
		intervalForMutualFriend = setInterval(getMutualFriend, initial);
		clearInterval(intervalForScroll);
		clearTimeout(allLoad);
	}
}

intervalForScroll = setInterval(getScroll, 1500);

=======================