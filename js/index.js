(function(){
	var app = angular.module('janeM',[]);
	app.controller('AboutMe',function(){
		this.product = AboutMeData;
	});

	var AboutMeData = {
		firstName: 'Jane',
		lastName: 'Mendonca',
		designation : [
			{
				title: 'Web Developer'
			},
			{
				title: 'Cartoonist'
			},
			{
				title: 'Illustrator'
			}
		],
		links: [
			{
				text: 'facebook',
				url: 'http://facebook.com/imbecile.art'
			},
			{
				text: 'linkedin',
				url: 'https://www.linkedin.com/pub/jane-mendonca/43/18a/ab2'
			},
			{
				text: 'youtube',
				url: 'http://www.youtube.com/user/ZDwarf/videos'
			}
		]
	}
}) ();
