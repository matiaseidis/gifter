<!DOCTYPE html>
<!--[if IE 7]>    <html class="no-js lt-ie10 lt-ie9 lt-ie8 ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie10 lt-ie9 ie8" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 ie9" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<!-- Avoid script blocking -->
<script></script>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gifter</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/jquery.nouislider.css">
<!-- <link rel="stylesheet" href="css/flip.css"> -->
<link rel="stylesheet" href="css/gifter.css">

<link rel="shortcut icon" href="images/favicon.ico">

<link rel="icon"
      type="image/png"
      href="http://example.com/myicon.png">

</head>
<body>
<nav class="navbar navbar-default navbar-static-top" role="navigation">
  <div class="container">
    <ul class="nav navbar-nav">

                <li class="active"><a href="#"><span class="glyphicon glyphicon-refresh"></span>Empezar de nuevo</a></li>

                <li>



                    </li>
                <li>

                 <div id="selectedItemsButtonBox">
                            <a href="#" title="recomendaciones seleccionadas" class="btn btn-lg" type="button" id="selectedItemsButton">
                                            <span class="glyphicon glyphicon-gift"></span>
                                            </a>

                </li>
              </ul>

  </div>
</nav>

	<div class="container">

	<!--
    <div id="spinner">
		<h1>Gifter</h1>
		<div id="spinner-inner">
			<img id="thinking" src="images/thinking.jpg">
		</div>
	</div>
	-->
	<div id="upperBox" class="row">
        <div class="col-md-12">
            <div class="col-md-4"></div>
                <div class="col-md-4">
                    <!--
                    <h1>Gifter</h1>
                    -->
                </div>
                <div class="col-md-4">
                </div>
            </div>
        </div>

        <div id="mainBox" class="row">

            <div class="col-md-1">
                <div id="pricesSliderBox">
                 <div id="pricesSlider"></div>
                 <div id="priceSliderTooltipFrom"></div>
                 <div id="priceSliderTooltipTo"></div>
                </div>
            </div>

            <div id="spinner" class="col-md-10">
            		<!-- <h1>Gifter</h1> -->
            		<div id="spinner-inner">
            			<img id="thinking" src="images/thinking.jpg" />
            		</div>
            	</div>

            <div id="noSpinner" class="col-md-10 flip-container">
                <div class="flipper">
                    <div class="row recommendations front" id="recommendations"></div>
                    <div id="selectedItemsBox" class="back">
                        <p>Recomendaciones seleccionadas:</p>
                        <div class="selectedItemsLine row"></div>
                    </div>

                </div>
            </div>



            <div class="col-md-1">
                <div class="arrow_box">
                    <span class="glyphicon glyphicon-chevron-right" id="more-button"></span>
                </div>
            </div>

        </div>

        <div id="lowerBox" class="row">
        <p><h6>Made by us</h6></p>
        </div>


    </div>

<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/modal.js"></script>
<script type="text/javascript" src="js/carousel.js"></script>
<script type="text/javascript" src="js/jquery.nouislider.min.js"></script>
<!--<script type="text/javascript" src="js/jquery.flip.min.js"></script>-->

</body>



</html>