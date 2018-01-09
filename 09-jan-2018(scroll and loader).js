var intervalForScroll = '';
var liObj = document.querySelectorAll('._698');
var liLength = liObj.length;
var scrollTime = 1;
var fbFriendLogIn = new Array();
var fbFriendLogInUser = new Array();
var loaderImage = 'https://www.creditmutuel.fr/cmne/fr/banques/webservices/nswr/images/loading.gif';
var elem = document.createElement('div'); // Create Div for Loader
elem.style.cssText = 'position:fixed;width:100%;height:100%;opacity:0.3;z-index:100;background:url("'+loaderImage+'") no-repeat center center rgba(0,0,0,0.25)';
elem.setAttribute("id", "facebookLoaderByQbix");
var container = document.body;
container.insertBefore(elem, container.firstChild); //Append in body Of facebook

var facebookLoder = document.getElementById('facebookLoaderByQbix'); // Get Facebook loader div

var getScroll = function(){ // Start Scrolling Interval For get friends of Logged In User
	window.scrollTo(0,document.body.scrollHeight); // Scroll 
	var allLoad = setTimeout(function (){ // Set Timeout for load user friends
		if(scrollTime){ // Set Variable for continue to scroll 
			var newLength = document.querySelectorAll('._698').length;
			if(liLength != newLength){ // check the length of loaded friend and previously get Friend
				liLength = newLength; 
			}else{
				scrollTime = 0; //Stop Scroll 
			}
		}
	},1500);
	if(!scrollTime){ // complete get logged in users Friend
	// Start geting Friends of Logged In User
		var liObj = document.querySelectorAll('._698'); //get All user friend object li
		for(var i = 0;i < liObj.length; i++){ 
			var userName = liObj[i].querySelectorAll('._6a div.fsl a'),			
			userFriend = liObj[i].querySelectorAll('._6a a._39g5'),			
			userFriendPicture = liObj[i].querySelectorAll('.clearfix a._5q6s img'),			
			friendUserId = liObj[i].querySelectorAll('.FriendRequestFriends');
			frienduserIDdone = friendUserId[0].dataset.profileid;
			userFriendPicture = (userFriendPicture.length > 0) ? userFriendPicture[0].currentSrc : '';
			var userObj = new Object(); // User Object for user data
			userObj = {				
				name :  userName[0].innerHTML,
				userId: friendUserId[0].dataset.profileid,
				detail : (userFriend.length > 0) ? userFriend[0].innerHTML : '',
				picture : userFriendPicture,
				mutualFriend : new Array(),
				url : 'https://www.facebook.com/profile.php?id='+frienduserIDdone+'&sk=friends'
			};
			fbFriendLogIn.push(userObj); //push to main user object
		}
	// End geting Friends of Logged In User
	// Start Getting Friend of Friend
		var index = 0;
		var initial = 10000; 
		var mutualFriend    = window.open();
		var intervalForMutualFriend = null;
		var fbFriendLogInUser = new Array();
		var getMutualFriend = function(){ // Set interval for load friends of friend list
			
			clearInterval(intervalForMutualFriend);
			//if(index < fbFriendLogIn.length){ //Check logged in user length for stop to loading friends of friend list currently it checks for 1
			if(index < 4){
				var userFriend = new Object()
				userFriend = fbFriendLogIn[index]; 
				//var mutualFriend    = window.open (userFriend.url, '_blank');
				mutualFriend.location = null;
				mutualFriend.location = userFriend.url; //set location for window open
				var getMutualFreindFromWindow = setTimeout(function (){  // Set timeout for load current page
					mutualFriend.addEventListener ('load',loadWindow(fbFriendLogIn,index,mutualFriend,getMutualFreindFromWindow),false); // Event listener after load page 
					index = index+1;
				},1000);
			}else{
				mutualFriend.close(); //when users friend list complete then close the tab
				mutualFriend.parent.focus(); // Focus to parent tab
				console.log(fbFriendLogIn); 
				facebookLoder.style.visibility="hidden"; // hide loader 
				
			}
			
		}
		intervalForMutualFriend = setInterval(getMutualFriend, 100); //Interval for new friend load
		var loadWindow = function (fbFriendLogIn,index,mutualFriend,getMutualFreindFromWindow) { // eventlistener function which grab data from friends 
			var userFriend = fbFriendLogIn[index];
			var mutualFriendDom = mutualFriend.document; // get document from popup 
			var elemmentForFreinds = document.createElement('div'); //create loader div
			elemmentForFreinds.style.cssText = 'position:fixed;width:100%;height:100%;opacity:0.3;z-index:100;background:url("'+loaderImage+'") no-repeat center center rgba(0,0,0,0.25)';
			elemmentForFreinds.setAttribute("id", "facebookLoaderByQbix");
			var containerFrienOfFrienLoader = mutualFriendDom.body; 
				containerFrienOfFrienLoader.insertBefore(elemmentForFreinds, containerFrienOfFrienLoader.firstChild); //append loader
			var liObjForMutualFriend = mutualFriendDom.querySelectorAll('._698'); //grab count for friends li
			var liObjForMutualFriendLength = liObjForMutualFriend.length;
			var intervalForScrollForMutualFriend = '';
			var scrollTimeMutualFreind = 1;
			var getScrollMutualFreind = function(){ //set interval for scroll in friends tab
				mutualFriend.scrollTo(0,mutualFriendDom.body.scrollHeight); //scroll
				var allLoadMutualFriend = setTimeout(function (){ // Set timeout for scroll load
					if(scrollTimeMutualFreind){ // Set variable for check scroll complete 
						var newLength = mutualFriendDom.querySelectorAll('._698').length;
						if(liObjForMutualFriendLength != newLength){ // Check length for friends of friends
							liObjForMutualFriendLength = newLength;
						}else{
							scrollTimeMutualFreind = 0;
						}
					}
				}	,500);
				if(scrollTimeMutualFreind == 0){ // scroll stops 
					clearTimeout(allLoadMutualFriend); // Clear Timeout for scroll in friends tab
					mutualFriendGetObj = mutualFriendDom.querySelectorAll('._698'); //get friends li of friend
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
					fbFriendLogInUser[index] = userFriend; // set to array
					clearTimeout(getMutualFreindFromWindow);// clear timeout for loading page content 
					clearInterval(intervalForScrollMutualFriend);// clear interval for scroll
					intervalForMutualFriend = setInterval(getMutualFriend, initial); //Interval for new friend load
				}
			}
			intervalForScrollMutualFriend = setInterval(getScrollMutualFreind, 2000); //set interval for scroll in friends tab
		}
		//End Getting Friend of friend
		clearInterval(intervalForScroll);// clear interval for logged in user scroll
		clearTimeout(allLoad);// clear timeout for logged in user scroll
	}
}

intervalForScroll = setInterval(getScroll, 1500);// set interval for logged in user scroll
