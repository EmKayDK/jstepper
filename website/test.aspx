<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>jQuery <%=strJqueryVersion%> + jStepper test</title>
	<meta name="robots" content="noindex" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-<%=strJqueryVersion %>.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/qunit/qunit-1.17.1.js"></script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.metadata/2.0/jquery.metadata.min.js"></script>
	<script type="text/javascript" src="/scripts/jquery.jstepper.min.js"></script>
	<script type="text/javascript" src="/scripts/syn.js"></script>
	<script type="text/javascript" src="/scripts/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="/scripts/tests.js"></script>

	<link rel="Stylesheet" href="/style/main.css" type="text/css" />
	<link rel="Stylesheet" href="http://code.jquery.com/qunit/qunit-1.17.1.css" type="text/css" />

</head>
<body>

	<div id="qunit"></div>
	<div id="qunit-fixture"></div>

	<input type="text" id="txtQUnit" />
	<input type="text" id="txtQUnit2" />
	<input type="text" id="txtQUnit3" class="{'normalStep': 5}" />

</body>
</html>
