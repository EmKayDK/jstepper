
$(document).ready(function() {
	setTimeout(RunQUnit, 100);
});

var KEYCODES = {
	UP: 38,
	DOWN: 40,
	S: 83
}

function RunQUnit() {

	module('Adding or Subtracting floats');

	test('Adding floats', function() {

		expect(5);
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.1, 0.1, true), 0.2, '0.1 + 0.1 = 0.2');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.01, 0.01, true), 0.02, '0.01 + 0.01 = 0.02');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(1, 0.001, true), 1.001, '1 + 0.001 = 1.001');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 0.001, true), 1, '0.999 + 0.001 = 1');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 0.999, true), 1.998, '0.999 + 0.999 = 1.998');

	});

	test('Subtracting floats', function() {

		expect(5);
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.1, 0.1, false), 0, '0.1 - 0.1 = 0');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.01, 0.01, false), 0, '0.01 - 0.01 = 0');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(1, 0.001, false), 0.999, '1 - 0.001 = 0.999');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 0.001, false), 0.998, '0.999 - 0.001 = 0.998');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 0.999, false), 0, '0.999 - 0.999 = 0');

	});

	var objDownEvent = jQuery.Event('keydown');
	objDownEvent.keyCode = KEYCODES.UP;

	var objUpEvent = jQuery.Event('keyup');
	objUpEvent.keyCode = KEYCODES.UP;

	module('Stepping with ints');

	test('Stepping up', function() {

		expect(4);

		$('#txtQUnit').jStepper();
		$('#txtQUnit').val('0');
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '1', 'Step up from 0 to 1 through 1 step of 1');
		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper();
		$('#txtQUnit').val('0');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '5', 'Step up from 0 to 5 through 5 steps of 1');
		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ normalStep: 0.1 });
		$('#txtQUnit').val('0');
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '0,1', 'Step up from 0 to 0.1 through 1 step of 0.1');
		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ normalStep: 0.1 });
		$('#txtQUnit').val('0');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '0,5', 'Step up from 0 to 0.5 through 5 steps of 0.1');
		$('#txtQUnit').unbind();

	});

	module('Multiple fields');

	test('Stepping up', function() {

		expect(2);

		$('#txtQUnit, #txtQUnit2').jStepper();
		$('#txtQUnit').val('0');
		$('#txtQUnit2').val('0');
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '1', 'Step up from 0 to 1 on first field');
		equal($('#txtQUnit2').val(), '0', 'Other field not stepped up yet');

	});

	module('Metadata and chaining');

	test('Applying and stepping up', function() {

		expect(2);

		$('#txtQUnit3').jStepper().val('1');
		equal($('#txtQUnit3').val(), '1', 'Chaining');
		$('#txtQUnit3').trigger(objDownEvent);
		equal($('#txtQUnit3').val(), '6', 'Metadata');

	});

	module('Validating field after stepping');

	test('allowDecimals', function() {

		expect(2);

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ allowDecimals: false });
		$('#txtQUnit').val('1.2');
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '2', 'Removing decimal part down with low decimal');

		$('#txtQUnit').val('1.9');
		$('#txtQUnit').trigger(objDownEvent);
		equal($('#txtQUnit').val(), '2', 'Removing decimal part down with high decimal');

	});

	test('disableNonNumeric', function() {

		expect(3);

		objUpEvent.keyCode = KEYCODES.S;

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ disableNonNumeric: true });
		$('#txtQUnit').val('s');
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '', 'Typing a letter and nothing else in the field ');

		$('#txtQUnit').val('1s');
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '1', 'Typing a number and a letter in the field');

		$('#txtQUnit').val('s2s');
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '2', 'Typing a letter, a number and a letter in the field');

	});

	test('maxValue', function() {

		expect(3);

		objUpEvent.keyCode = KEYCODES.UP;
		objDownEvent.keyCode = KEYCODES.UP;

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ maxValue: 10 });
		$('#txtQUnit').val('8');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '9', 'Stepping up and not hitting the roof');

		$('#txtQUnit').val('9');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '10', 'Stepping up and hitting the roof');

		$('#txtQUnit').val('10');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '10', 'Stepping up and breaking the roof');

	});

	test('minValue', function() {

		expect(3);

		objUpEvent.keyCode = KEYCODES.DOWN;
		objDownEvent.keyCode = KEYCODES.DOWN;

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ minValue: 5 });
		$('#txtQUnit').val('7');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '6', 'Stepping down and not hitting the floor');

		$('#txtQUnit').val('6');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '5', 'Stepping down and hitting the floor');

		$('#txtQUnit').val('5');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '5', 'Stepping down and breaking the floor');

	});


	// Hiding QUnit fields after testing is complete
	$('#txtQUnit, #txtQUnit2, #txtQUnit3').hide();

}