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
<link rel="stylesheet" href="css/gifter.css">
</head>
<body>
<nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
  <div class="container">
    <ul class="nav navbar-nav">
                <li class="active"><a href="#">Empezar de nuevo</a></li>
                <li>


                </li>
                <li>

                 <div id="selectedItemsButtonBox">
                            <a href="#" title="recomendaciones seleccionadas" class="btn btn-lg" type="button" id="selectedItemsButton">
                                            <span class="glyphicon glyphicon-gift"></span>
                                            </a>

                </li>
              </ul>

              <form class="navbar-form navbar-left" role="search">
                  <div class="form-group">
                    <span class="glyphicon glyphicon-usd"></span>
                    <input type="text" class="form-control input-sm" id="priceFrom" placeholder="desde">
                    <input type="text" class="form-control input-sm" id="priceTo" placeholder="hasta">
                   </div>
               </form>
               <form class="navbar-form navbar-right" role="search">
<div class="form-group">
                       <button type="submit" class="btn btn-primary" id="more-button" >M&#225;s recomendaci&#243;nes</button>
                   </div>


                     </form>

                  <!--
                                            <div class="row">

                                              <div class="col-xs-1">
                                              <span class="glyphicon glyphicon-usd"></span>
                                              </div>
                                              <div class="col-xs-3">
                                                <input type="text" class="form-control input-sm" id="priceFrom" placeholder="desde">
                                              </div>
                                              <div class="col-xs-3">
                                                  <input type="text" class="form-control input-sm" id="priceTo" placeholder="hasta">
                                                </div>
                                            </div>
-->







  </div>
</nav>

	<div class="container">
    <div id="spinner">
		<h1>Gifter</h1>
		<div id="spinner-inner">
			<img id="thinking" src="images/thinking.jpg">
		</div>
	</div>
	
	<div id="upperBox" class="row">
        <div class="col-md-12">
            <div class="col-md-4">

<!--
<div class="row">

  <div class="col-xs-1">
  <span class="glyphicon glyphicon-usd"></span>
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control input-sm" id="priceFrom" placeholder="desde">
  </div>
  <div class="col-xs-3">
      <input type="text" class="form-control input-sm" id="priceTo" placeholder="hasta">
    </div>
</div>
-->

<!--
             <div id="selectedItemsButtonBox">
            <a href="#" title="recomendaciones seleccionadas" class="btn btn-lg" type="button" id="selectedItemsButton">
                            <span class="glyphicon glyphicon-gift"></span>
                            </a>

            </div>
            -->
            </div>
                <div class="col-md-4">
                    <h1>Gifter</h1>
                </div>
                <div class="col-md-4">
                    <!--
                    <a id="more-button" class="btn btn-primary btn-lg" role="button">Más<br /> recomendaciónes</a>
                    -->

                </div>
            </div>
        </div>

        <div id="selectedItemsBox" class="row">
            <p>Recomendaciones seleccionadas:</p>
            <div class="selectedItemsLine col-md-12"></div>
        </div>

        <div id="mainBox" class="row"></div>

        <div id="lowerBox" class="row">
        <p><h6>Made by us</h6></p>
        </div>


    </div>

<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/modal.js"></script>
<script type="text/javascript" src="js/carousel.js"></script>
<script type="text/javascript" src="js/selectedItemsCarousel.js"></script>

</body>



</html>