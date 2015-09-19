<%@ Page Language="C#" AutoEventWireup="true" CodeFile="default.aspx.cs" Inherits="_default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>jStepper - A jQuery plugin by EmKay</title>

	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="/scripts/jquery.jstepper.min.js"></script>
	<script type="text/javascript" src="/scripts/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="/scripts/scripts.js"></script>
	<link rel="Stylesheet" href="/style/main.css" type="text/css" />
</head>
<body>

	<h1>jStepper</h1>

	A jQuery plugin by <a href="https://plus.google.com/u/0/108624457536656302111">EmKay</a> usable for making a numeric textfield value easy to increase or decrease.<br />
	<br />

	Auto mousewheel support if Brandon Aaron's <a href="http://plugins.jquery.com/mousewheel/">mousewheel plugin</a> has also been included on the page (try it by hovering over the field below and scroll your mouse).

	<h2>Download (v. 1.5.3)</h2>
	(Tested with jQuery 1.4, 1.11.2 and 2.1.3 in IE11, Firefox, Chrome and Safari)<br />
	<br />
	<a href="/scripts/jquery.jstepper.js">Normal</a><br />
	<a href="/scripts/jquery.jstepper.min.js">Minified for production</a> (Only 4,0 KB and 1,8 KB gzipped)<br />
	<br />

	<h2>Source code</h2>
	The source code is hosted at GitHub: <a href="https://github.com/EmKayDK/jstepper">https://github.com/EmKayDK/jstepper</a>
	<br />

	<h2>Test</h2>

	<form method="post" action="/">

		<label for="txtTesting">Text field with jStepper applied.</label><br />
		<input type="text" name="txtTesting" id="txtTesting" value="0" /><br />
		<br />

		<label for="txtScript">Feel free to test jStepper by changing the script for the field above and hit "Apply script".</label><br />
		<textarea name="txtScript" id="txtScript"><%=GetTestScript() %></textarea><br />
		<br />

		<button type="submit" id="btnSubmit">Apply script</button>

	</form>

	<%=GetTestScriptTag() %>

	<h2>Options</h2>

	<table id="jStepperDoc" class="tablehover">
		<thead>
			<tr>
				<th>Name</th>
				<th>Data type</th>
				<th>Default value</th>
				<th>Explanation</th>
				<th>Example</th>
			</tr>

			<tr>
				<td>maxValue</td>
				<td>Float</td>
				<td>Infinite</td>
				<td>Max value the stepper can increase the value to.</td>
				<td class="exampleCol">$(obj).jStepper({maxValue:100});</td>
			</tr>

			<tr>
				<td>minValue</td>
				<td>Float</td>
				<td>Infinite</td>
				<td>Minimum value the stepper can increase the value to.</td>
				<td class="exampleCol">$(obj).jStepper({minValue:0});</td>
			</tr>

			<tr>
				<td>normalStep</td>
				<td>Float</td>
				<td>1</td>
				<td>The value with which the stepper should increase or decrease per step.</td>
				<td class="exampleCol">$(obj).jStepper({normalStep:1});</td>
			</tr>

			<tr>
				<td>shiftStep</td>
				<td>Float</td>
				<td>5</td>
				<td>The value with which the stepper should increase or decrease per step if Shift is also pressed.</td>
				<td class="exampleCol">$(obj).jStepper({shiftStep:5});</td>
			</tr>

			<tr>
				<td>ctrlStep</td>
				<td>Float</td>
				<td>10</td>
				<td>The value with which the stepper should increase or decrease per step if Ctrl is also pressed.</td>
				<td class="exampleCol">$(obj).jStepper({ctrlStep:10});</td>
			</tr>

			<tr>
				<td>minLength</td>
				<td>Integer</td>
				<td>0</td>
				<td>The minimum length of the number in front of any decimal separator.<br />
					If length is lower than minLength, appropriate number of zeros are added in front.</td>
				<td class="exampleCol">$(obj).jStepper({minLength:2});</td>
			</tr>

			<tr>
				<td>disableAutocomplete</td>
				<td>Boolean</td>
				<td>true</td>
				<td>If set to false, the autocomplete feature of the textfield will not be disabled.</td>
				<td class="exampleCol">$(obj).jStepper({disableAutocomplete:true});</td>
			</tr>

			<tr>
				<td>defaultValue</td>
				<td>Float</td>
				<td>1</td>
				<td>If only invalid characters are found in the field when an increase or decrease is attempted, this value will be used as a new start.</td>
				<td class="exampleCol">$(obj).jStepper({defaultValue:1});</td>
			</tr>

			<tr>
				<td>decimalSeparator</td>
				<td>String</td>
				<td>, (comma)</td>
				<td>The character to separate the decimal value from the integers. Set to "," (comma) as default because it is the most common in my home country :oP</td>
				<td class="exampleCol">$(obj).jStepper({decimalSeparator:"."});</td>
			</tr>

			<tr>
				<td>allowDecimals</td>
				<td>Boolean</td>
				<td>true</td>
				<td>Determines wether or not a decimal value is accepted in the textfield. Overrules all other settings that have anything to do with decimals.</td>
				<td class="exampleCol">$(obj).jStepper({allowDecimals:false});</td>
			</tr>

			<tr>
				<td>minDecimals</td>
				<td>Integer</td>
				<td>0</td>
				<td>The minimum required number of decimals. If less decimals are found zeros will be added.</td>
				<td class="exampleCol">$(obj).jStepper({minDecimals:2});</td>
			</tr>

			<tr>
				<td>maxDecimals</td>
				<td>Integer</td>
				<td>Infinite</td>
				<td>The maximum allowed number of decimals. If more are found, the last ones are simply cut away. No rounding is applied.</td>
				<td class="exampleCol">$(obj).jStepper({maxDecimals:4});</td>
			</tr>

			<tr>
				<td>disableNonNumeric</td>
				<td>Boolean</td>
				<td>true</td>
				<td>If set to true, no invalid character keys will work in the textfield.</td>
				<td class="exampleCol">$(obj).jStepper({disableNonNumeric:true});</td>
			</tr>

			<tr>
				<td>overflowMode</td>
				<td>string</td>
				<td>default</td>
				<td>This controls how overflowing is handled. Consider the following example:<br />
					<br />
					{maxValue:999}<br />
					<br />
					If "1111" is typed in the field, the field will revert to the maxValue, which is "999".<br />
					<br />
					If overflowMode is set to 'ignore' like this;<br />
					<br />
					{maxValue:999, overflowMode:'ignore'}<br />
					<br />
					then the last press of the "1" key is simply ignored.<br />
					<br />
					This option only has an effect if maxValue also is set.
				</td>
				<td class="exampleCol">$(obj).jStepper({overflowMode:'ignore'});</td>
			</tr>

			<tr>
				<td>onStep</td>
				<td>Function</td>
				<td>null</td>
				<td>Callback function to call when a step has been made. The function will return the jQuery object on which the step was made, a boolean value of which direction the step was made in and a boolean value of whether or not maxValue or minValue was reached.</td>
				<td class="exampleCol">$(obj).jStepper({onStep:testfunction});<br />
					<br />
					function testfunction(objTextField, bDirection, bLimitReached) {<br />
					<br />
					&nbsp;&nbsp;if (bDirection) {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;// Was increased<br />
					&nbsp;&nbsp;} else {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;// Was decreased<br />
					&nbsp;&nbsp;}<br />

					&nbsp;&nbsp;if (bLimitReached) {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;// A limit was reached<br />
					&nbsp;&nbsp;} else {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;// A limit was not reached<br />
					&nbsp;&nbsp;}<br />
					<br />
					&nbsp;&nbsp;alert(objTextField.val());<br />
					<br />
					}<br />
					<br />

					<strong>OR</strong><br />
					<br />

					$(obj).jStepper({<br />
					&nbsp;&nbsp;onStep: function(objTextField, bDirection, bLimitReached) {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;if (bDirection) {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Was increased<br />
					&nbsp;&nbsp;&nbsp;&nbsp;} else {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Was decreased<br />
					&nbsp;&nbsp;&nbsp;&nbsp;}<br />

					&nbsp;&nbsp;&nbsp;&nbsp;if (bLimitReached) {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// A limit was reached<br />
					&nbsp;&nbsp;&nbsp;&nbsp;} else {<br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// A limit was not reached<br />
					&nbsp;&nbsp;&nbsp;&nbsp;}<br />
					<br />
					&nbsp;&nbsp;&nbsp;&nbsp;alert(objTextField.val());<br />
					&nbsp;&nbsp;}<br />
					});<br />

				</td>
			</tr>

		</thead>

	</table>

	<h3>Setting options after initialization</h3>
	You can set any of the options after initialization of jStepper like this:<br />
	$(obj).jStepper('option', 'maxValue', 60);<br />
	<br />

	If you want to revert the option to the default value, then simply set it to null:
	$(obj).jStepper('option', 'maxValue', null);
	
	<h1>Changelog</h1>

	<h2>1.5.3 (2015-09-19)</h2>
	<ul>
		<li>Fixed <a href="https://github.com/EmKayDK/jstepper/pull/14">issue #14</a> (thanks Benzolitz) reported at Github.</li>
	</ul>

	<h2>1.5.2 (2015-09-18)</h2>
	<ul>
		<li>Fixed <a href="https://github.com/EmKayDK/jstepper/issues/13">issue #13</a> (thanks ngocdiepnguyen) reported at Github.</li>
	</ul>

	<h2>1.5.1 (2015-05-03)</h2>
	<ul>
		<li>Fixed <a href="https://github.com/EmKayDK/jstepper/issues/9">issue #9</a> (thanks inexuscore) reported at Github.</li>
	</ul>

	<h2>1.5.0 (2015-01-24)</h2>
	<ul>
		<li>A few bugfixes reported at Github. Thanks, jedierikb!</li>
		<li>It's now possible to change options after initialization.</li>
		<li>Added the overflowMode option.</li>
		<li>Updated the targeted browsers and jQuery versions.</li>
	</ul>

	<h2>1.4.0 (2014-04-01)</h2>
	<ul>
		<li>Major rewrite of the plugin.</li>
		<li>A few performance enhancements and bug fixes.</li>
		<li>A lot of improvements to the documentation website.</li>
	</ul>

	<h2>1.3.3 (2014-03-31)</h2>
	<ul>
		<li>Bugfix by loicfevrier regarding using decimal separators when allowDecimals is set to false.</li>
	</ul>


	<h2>1.3.2 (2014-02-28)</h2>
	<em>Changelog started</em>
	<ul>
		<li>Bugfix by <a href="http://stefantsov.com/">Dima Stefantsov</a> regarding cursor position when using a non changing keypress in the field (Thanks dude!)</li>
		<li>Now using <a href="http://javascript-minifier.com/">http://javascript-minifier.com/</a> for the minified version.</li>
	</ul>
	<script>

		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date(); a = s.createElement(o),
			m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-48533859-1', 'emkay.dk');
		ga('send', 'pageview');
	</script>
</body>
</html>
