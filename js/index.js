(function(){
	var app = angular.module('janeM',[]);

	//about me
	app.controller('AboutMeCtrl',['$scope',function($scope){
		$scope.aboutMeData = {firstName: 'Jane',lastName: 'Mendonca',designation : [{title: 'Web Developer'},{title: 'Cartoonist'},{title: 'Illustrator'}]};
	}]).directive('aboutme', function(){
		return {
			template: 	'<label class="fontsize48">{{aboutMeData.firstName +" "+ aboutMeData.lastName}}</label> '+
						'<ul class="horizontal"><li ng-repeat="obj in aboutMeData.designation">{{obj.title}}</li></ul>'
		};
	});
	 
	//references
	app.controller('ReferencesCtrl', ['$scope',function($scope){
		$scope.references = {links: [{text: 'facebook',url: 'http://facebook.com/imbecile.art'},{text: 'linkedin',url: 'https://www.linkedin.com/pub/jane-mendonca/43/18a/ab2'},
				{text: 'youtube',url: 'http://www.youtube.com/user/ZDwarf/videos'}]};
		$scope.contact = {title:"Contact Jane",info:"jane.zomgzomg@gmail.com"};
	}]).directive('ref', function(){
		return {
			template: 	'<ul class="fontsize30 horizontal textalignright"><li class="lsf" ng-repeat="obj in references.links"><a target="_blank" ng-href="{{obj.url}}">{{obj.text}}</a></li></ul>'+
						'<br><a href="mailto:{{contact.info}}">{{contact.title}}</a>'
		};
	});

	//menu options
	app.controller('ContentCtrl', ['$scope',function($scope){
		$scope.menu = {options:[{title: 'Snake/Slug', url:'snake.template.html'},{title: 'Table Tennis', url:'tt.template.html'},
		{title: 'Design', url:'design.template.html'},{title: 'Resume', url:'resume.template.html'}]};
		$scope.currentTab='snake.template.html';		
		$scope.selectMenu = function(mobj){
			$scope.currentTab=mobj.url;
		};
		$scope.activeMenu = function(mobj){
			return mobj == $scope.currentTab;
		};

		//images content
		$scope.images = [
			{	caption:"British Accents - The Adventures of Colin and Jeeves: Comic Strip", url:"../images/colinjeeves.png",
				about:"Jeeves and his pet Colin embark on exciting Adventures as they learn about various Workplace Concepts."},
			{	caption:"Daenerys - Game of Thrones Bookmark: Front",url:"../images/daenerysbookmarkfront.PNG",
				about:"The front sides of 3 separate bookmarks in Sepia, Colour and Monochrome."},
			{	caption:"Daenerys - Game of Thrones Bookmark: Back",url:"../images/daenerysbookmarkback.PNG",
				about:"The back sides of 3 separate bookmarks in Sepia, Colour and Monochrome."}, 
			{	caption:"Pixelated: A Self Potrait",url:"../images/jane8bit.png",
				about:"Retro Me."},
			{	caption:"Vectorised: A Self Potrait",url:"../images/janevector.png",
				about:"Vectorised Me!"}, 
			{	caption:"Tottenham-Liverpool Infographic: Match Statistics",url:"../images/totliv.jpg",
				about:"Poster Design for The Top Corner"}, 
			{	caption:"West Brom-Man City: Pre-Match Poster",url:"../images/wbrommancity.jpg",
				about:"Poster Design for The Top Corner"},
			{	caption:"Arsenal vs Chelsea: Post-Match Poster",url:"../images/chelars.jpg",
				about:"Poster Design for The Top Corner"}, 
			{	caption:"Digital Colour & Digital Inking (ONLY)",url:"../images/facescolour.jpg",
				about:"Drawn by the friend of a friend."},
			{	caption:"A look into the iPad Theatre Menu: App Design",url:"../images/ipadmenuapp.png",
				about:"Just an insight into an app of 10 screens!"}];
		$scope.currentIndex=0;
		$scope.loadPreviousImage = function(){
			$scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.images.length - 1;
		};
		$scope.loadNextImage = function(){
			$scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
		};
		$scope.$watch('currentIndex', function() {
		  $scope.images.forEach(function(image) {
		    image.visible = false;
		  });
		 
		  $scope.images[$scope.currentIndex].visible = true;
		});

		//games content
		$scope.games = [
			{
				caption: 'A Single-Player game of Snake through the eyes of a Slug (or not). Current support: keyboard input only',
				title: 'Snake/Slug',
				url: 'demo/slug.html',
				instr: 'Move: Arrow Keys | Pause: P | Restart after Game Over: Enter'				
			},
			{
				caption: 'A Multi-Player game that employs the basic logic of a Table-tennis match. Current support: Chrome browsers; keyboard input only',
				title: 'Table Tennis',
				url: 'demo/tabletennis.html',
				instr: 'Left Player Controls: W: move up | S: move down. \r\nRight Player Controls:UP arrow key: move up | DOWN arrow key: move down'
			}
		];

		$scope.gameIndex=0;
		$scope.$watch('currentTab', function() {
			if($scope.currentTab == 'snake.template.html')
				$scope.gameIndex=0;
			else if($scope.currentTab == 'tt.template.html')
				$scope.gameIndex=1;
		});

	}]).directive('menuoptions',function(){
		return {
			template: '<nav><section><ul class="horizontal"><li ng-repeat="opt in menu.options" ng-class="{active: activeMenu(opt.url)}" ng-click="selectMenu(opt)">{{opt.title}}</li></ul></section></nav>'
		};
	}).directive('contentarea',function(){
		return {
			template: '<section ng-include="currentTab" class="contentArea"></section>'
		}
	}).directive('imageslider',function(){
		return {
			template: '<input value="back" type="button" class="lsf" ng-click="loadPreviousImage()"/><input value="next" type="button" class="lsf" ng-click="loadNextImage()"/>'+
			'<figure ng-repeat="img in images" ng-show="img.visible"><img src="{{img.url}}"><figcaption class="fontweightbold">{{img.caption}}</figcaption><figcaption class="fontsize14">{{img.about}}</figcaption></figure>'
		}
	}).directive('game', function(){
		return {
			template: '<section><label>{{games[gameIndex].caption}}</label><br><label>{{games[gameIndex].instr}}</label><br>'+
			'<div id="framewrap"><iframe id="frame" src="{{games[gameIndex].url}}" focus="true"></iframe></div></section>'
		}
	}).directive('focus', function($timeout) {
		return {
			scope : {
				 trigger : '@focus'
			},
			link : function(scope, element) {
				scope.$watch('trigger', function(value) {
  					if (value === "true") {
   						$timeout(function() {
   							element[0].focus();
   						});
  					}
 				});
   			}
		}
	});
}) ();
