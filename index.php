<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Hex Dashboard</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="css/plugins/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="css/plugins/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="css/plugins/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link href="css/overrides.css" rel="stylesheet">

</head>

<body>

<div id="wrapper">

<!-- Navigation -->
<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
<!-- Header -->
<div class="navbar-header">
    <a class="navbar-brand" href="index.php">Hex Dashboard</a>
</div>
<!-- End Header -->

<!-- Sidebar -->
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
        <ul class="nav" id="side-menu">
            <li>
                <a class="active" href="index.php"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>
            <li>
                <a class="active" href="https://docs.google.com/a/blueacorn.com/spreadsheets/d/1gA8cGXgSgdkI_TDwXYRo5wU1m1eXA2OU49kyKrO-C9g/edit#gid=754151978" target="_blank"><i class="fa fa-tasks fa-fw"></i> Backlog</a>
            </li>
        </ul>
    </div>
</div>
<!-- End Sidebar-->
</nav>
<!-- End Navigation -->

<div id="page-wrapper">
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header">Hex Dashboard</h1>
    </div>
    <!-- /.col-lg-12 -->
</div>
<!-- /.row -->
<div class="row">
    <?php require_once "blocks/panel.html" ?>
</div>
<!-- /.row -->
<div class="row">
    <?php require_once "blocks/work.html" ?>
    <?php require_once "blocks/milestones.html" ?>
    <?php require_once "blocks/roadblocks.html" ?>
</div>
<!-- /.col-lg-4 -->
</div>
<!-- /.row -->
</div>
<!-- /#page-wrapper -->

</div>
<!-- /#wrapper -->

<!-- jQuery -->
<script src="js/jquery-1.11.1.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>

<script src="js/spreadsheet.js"></script>
<script src="http://spreadsheets.google.com/feeds/list/1gA8cGXgSgdkI_TDwXYRo5wU1m1eXA2OU49kyKrO-C9g/1/public/values?alt=json-in-script&amp;callback=importCurrentWork"></script>
<script src="http://spreadsheets.google.com/feeds/list/1gA8cGXgSgdkI_TDwXYRo5wU1m1eXA2OU49kyKrO-C9g/2/public/values?alt=json-in-script&amp;callback=importBacklog"></script>
<script src="http://spreadsheets.google.com/feeds/list/1gA8cGXgSgdkI_TDwXYRo5wU1m1eXA2OU49kyKrO-C9g/3/public/values?alt=json-in-script&amp;callback=importPlanningBacklog"></script>
<script src="http://spreadsheets.google.com/feeds/list/1gA8cGXgSgdkI_TDwXYRo5wU1m1eXA2OU49kyKrO-C9g/4/public/values?alt=json-in-script&amp;callback=importDataValidation"></script>
<script src="http://spreadsheets.google.com/feeds/list/1gA8cGXgSgdkI_TDwXYRo5wU1m1eXA2OU49kyKrO-C9g/5/public/values?alt=json-in-script&amp;callback=importMilestones"></script>

<!--<script src="js/plugins/metisMenu/metisMenu.min.js"></script>--->

<!--&lt;!&ndash; Morris Charts JavaScript &ndash;&gt;-->
<!--<script src="js/plugins/morris/raphael.min.js"></script>-->
<!--<script src="js/plugins/morris/morris.min.js"></script>-->
<!--<script src="js/plugins/morris/morris-data.js"></script>-->

<!-- Custom Theme JavaScript -->
<!--<script src="js/sb-admin-2.js"></script>-->

</body>

</html>
