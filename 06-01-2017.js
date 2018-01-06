var intervalForScroll = '';
var liObj = document.querySelectorAll('._698');
var liLength = liObj.length;
var scrollTime = 1;
var fbFriendLogIn = new Array();
var fbFriendLogInUser = new Array();
var getScroll = function(){
	window.scrollTo(0,document.body.scrollHeight);
	var allLoad = setTimeout(function (){
		if(scrollTime){
			var newLength = document.querySelectorAll('._698').length;
			if(liLength != newLength){
				liLength = newLength;
				if(liLength > 60)
					scrollTime = 0;
			}else{
				scrollTime = 0;
			}
		}
	},1000);
	if(!scrollTime){
		var liObj = document.querySelectorAll('._698');
		for(var i = 0;i < liObj.length; i++){
			var userName = liObj[i].querySelectorAll('._6a div.fsl a'),			
			userFriend = liObj[i].querySelectorAll('._6a a._39g5'),			
			userFriendPicture = liObj[i].querySelectorAll('.clearfix a._5q6s img'),			
			friendUserId = liObj[i].querySelectorAll('.FriendRequestFriends');
			frienduserIDdone = friendUserId[0].dataset.profileid;
			userFriendPicture = (userFriendPicture.length > 0) ? userFriendPicture[0].currentSrc : '';
			var mutualfbfriend = new Array();
			var userObj = new Object();
			userObj = {				
				name :  userName[0].innerHTML,
				userId: friendUserId[0].dataset.profileid,
				detail : (userFriend.length > 0) ? userFriend[0].innerHTML : '',
				picture : userFriendPicture,
				mutualFriend : new Array(),
				url : 'https://www.facebook.com/profile.php?id='+frienduserIDdone+'&sk=friends'
			};
			fbFriendLogIn.push(userObj);
		}
		
		var index = 0;
		var initial = 10000;
		var mutualFriend    = window.open();
		var intervalForMutualFriend = null;
		var fbFriendLogInUser = new Array();
		var getMutualFriend = function(){
			//if(index < fbFriendLogIn.length){
			clearInterval(intervalForMutualFriend);
			if(index < 2){
				var userFriend = new Object()
				userFriend = fbFriendLogIn[index];
				console.log(userFriend.name);
				//var mutualFriend    = window.open (userFriend.url, '_blank');
				mutualFriend.location = '';
				mutualFriend.location = userFriend.url;
				console.log(userFriend.name+' here2');
				var getMutualFreindFromWindow = setTimeout(function (){
					mutualFriend.addEventListener ('load',loadWindow(fbFriendLogIn,index,mutualFriend,getMutualFreindFromWindow),false);
					index = index+1;
				},1000);
				
				
			}else{
				mutualFriend.close();
				console.log(fbFriendLogIn);
			}
			
		}
		intervalForMutualFriend = setInterval(getMutualFriend, 100);
		var loadWindow = function (fbFriendLogIn,index,mutualFriend,getMutualFreindFromWindow) {
			var userFriend = fbFriendLogIn[index];
			var mutualFriendDom = mutualFriend.document;
			var liObjForMutualFriend = mutualFriendDom.querySelectorAll('._698');
			var liObjForMutualFriendLength = liObjForMutualFriend.length;
			var intervalForScrollForMutualFriend = '';
			var scrollTimeMutualFreind = 1;
			var getScrollMutualFreind = function(){
				mutualFriend.scrollTo(0,mutualFriendDom.body.scrollHeight);
				var allLoadMutualFriend = setTimeout(function (){
					if(scrollTimeMutualFreind){
						var newLength = mutualFriendDom.querySelectorAll('._698').length;
						if(liObjForMutualFriendLength != newLength){
							liObjForMutualFriendLength = newLength;
						}else{
							scrollTimeMutualFreind = 0;
						}
					}
				}	,500);
				if(scrollTimeMutualFreind == 0){
					clearTimeout(allLoadMutualFriend);
					mutualFriendGetObj = mutualFriendDom.querySelectorAll('._698');
					for(var j = 0;j < mutualFriendGetObj.length; j++){
						var mutualFriendUserName = mutualFriendGetObj[j].querySelectorAll('._6a div.fsl a'),	
							mutualuserFriend = mutualFriendGetObj[j].querySelectorAll('._6a a._39g5'),	
							mutualuserFriendPicture = mutualFriendGetObj[j].querySelectorAll('.clearfix a._5q6s img'),	
							mutualuserFriend = (mutualuserFriend.length > 0) ? mutualuserFriend[0].innerHTML : '';	
						mutualuserFriendPicture = (mutualuserFriendPicture.length > 0) ? mutualuserFriendPicture[0].currentSrc : '';	
						var userMutual = {
							name :  mutualFriendUserName[0].innerHTML,
							detail : mutualuserFriend,
							picture : mutualuserFriendPicture
						}
						userFriend.mutualFriend.push(userMutual);
					}
					fbFriendLogInUser[index] = userFriend;
					clearTimeout(getMutualFreindFromWindow);
					clearInterval(intervalForScrollMutualFriend);
					intervalForMutualFriend = setInterval(getMutualFriend, initial);
				}
			}
			intervalForScrollMutualFriend = setInterval(getScrollMutualFreind, 2000);
		}
		clearInterval(intervalForScroll);
		clearTimeout(allLoad);
	}
}

intervalForScroll = setInterval(getScroll, 1500);
