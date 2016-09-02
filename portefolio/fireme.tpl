<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="ie9 no-js"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en">
<head>

    <!-- META DATA -->
    <meta charset="UTF-8">
    <meta name="author" content="Charbonnier maeva">
    <meta name="category" content="Portefolio, Front-End Developer">
    <meta name="description" content="I am a Front-End Developer, Webdesigner and UX Designer from France. I share my skill and career with you. This is a website home made. ">
    <meta name="keywords" content="Portefolio, Front-End Developer, Webdesigner, UX Designer">
    <meta name="publisher" content="Maeva Charbonnier">
    <meta name="robots" content="all">

    <title>About Me</title>

    <!--lib jquery -->
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

    <!-- CSS -->
	<link href="https://fonts.googleapis.com/css?family=Erica+One|Ranchers" rel="stylesheet"> 
    <link type="text/css" rel="stylesheet" href="css/style.css" />
	
    <!--json -->
    <script id="data" type="application/json" src="json/data.json"></script>

    <!-- JAVASCRIPT -->
    <script type="text/javascript" src="js/effect.js"></script>

</head>
<body>
	<div class="name">
		maeva 
	</div>
	<div class="overlay menu">
		<ul class="overlay-content fr">
			<li>
				<a class="overlay-link" data-title="me">MEUHOI</a>
			</li>
			<li>
				<a class="overlay-link" data-title="skill">COMPETENCES</a>	
			</li>
			<li>
				<a class="overlay-link" data-title="work">CLIENTS</a>
			</li>
			<li>	
				<a class="overlay-link" data-title="contact">CONTACT</a>
			</li>			
		</ul>
		<ul class="overlay-content engl">
			<li>
				<a class="overlay-link" data-title="me">MOOE</a>
			</li>
			<li>
				<a class="overlay-link skill" data-title="skill">SKILLS</a>	
			</li> 
			<li>
				<a class="overlay-link" data-title="work">WORKS</a>
			</li>
			<li>	
				<a class="overlay-link" data-title="contact">CONTACT</a>
			</li>				
		</ul>
		<form class="menu-search" method="get" action="/search">
			<input class="menu-search-field" type="text" name="search" placeholder="Search">
			<button class="menu-search-button" type="submit"></button>
		</form>
		<div class="menu-footer">
			<div class="wrapper-lang"> 
				<span class="language fr"></span>
				<span class="language engl"></span>
			</div>
		</div>
		
	</div>
	<div class="menu-emplacement">
				<span class="menu-icon sprite"></span>
				<span class="arrow menu"></span>
				<span class="round-circle menu"></span>
				<div class="text-wrapper">
					<span class="text-menu">
						<p class="text-principal">MEUHNU</p>			
					</span>
				</div>
	</div>

</body>
</html>
