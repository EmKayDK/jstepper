
$(document).ready(function() {
	setTimeout(RunQUnit, 100);
});

var KEYCODES = {
	UP: 38,
	DOWN: 40,
	S: 83,
	ONE: 49
};

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

		expect(6);
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.1, 0.1, false), 0, '0.1 - 0.1 = 0');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.01, 0.01, false), 0, '0.01 - 0.01 = 0');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(1, 0.001, false), 0.999, '1 - 0.001 = 0.999');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 0.001, false), 0.998, '0.999 - 0.001 = 0.998');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 0.999, false), 0, '0.999 - 0.999 = 0');
		equal(jQuery.fn.jStepper.AddOrSubtractTwoFloats(0.999, 1, false), -0.001, '0.999 - 1 = -0.001');

	});

	var objDownEvent = jQuery.Event('keydown');
	objDownEvent.keyCode = KEYCODES.UP;

	var objUpEvent = jQuery.Event('keyup');
	objUpEvent.keyCode = KEYCODES.UP;

	var objBlurEvent = jQuery.Event('blur');

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

	test('maxValue', function(assert) {

		var done = assert.async();

		expect(4);

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

		var objThreeKeyUp = jQuery.Event('keyup');

		$('#txtQUnit').unbind();
		$('#txtQUnit').jStepper({ minValue: 0, maxValue: 23, minLength: 2, minDecimals: 3, maxDecimals: 3, decimalSeparator: '.' });
		$('#txtQUnit').val('2');
		syn.type('4', $('#txtQUnit'));

		setTimeout(function() {
			assert.equal($('#txtQUnit').val(), '23.000', 'Inputting 24 with a max of 23 and minDecimals of 3');
			done();
		}, 100);

	});

	test('Overflow with overflow mode set to ignore', function(assert) {

		var done = assert.async();

		expect(1);

		objUpEvent.keyCode = KEYCODES.ONE;
		objDownEvent.keyCode = KEYCODES.ONE;

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ minValue: 1, maxValue: 999, minLength: 3, overflowMode: 'ignore' });
		$('#txtQUnit').val('111');
		$('#txtQUnit').focus();
		syn.type('1', $('#txtQUnit'));
		setTimeout(function() {
			assert.equal($('#txtQUnit').val(), '111', 'Accidentally typing 1111 in field with a max of 999');
			done();
		}, 100);
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

	test('Setting options', function() {

		expect(4);

		objUpEvent.keyCode = KEYCODES.UP;
		objDownEvent.keyCode = KEYCODES.UP;

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper({ maxValue: 20 });
		$('#txtQUnit').val('20');
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '20', 'Trying to go up but hitting the ceiling');

		$('#txtQUnit').jStepper('option', 'maxValue', 21);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '21', 'Trying again after resetting the maxValue higher');

		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '21', 'Trying again after but hitting the ceiling again this time');

		$('#txtQUnit').jStepper('option', 'maxValue', null);
		$('#txtQUnit').trigger(objDownEvent);
		$('#txtQUnit').trigger(objUpEvent);
		equal($('#txtQUnit').val(), '22', 'Trying again after removing the maxValue');

	});

	test('Validating value of field', function() {

		expect(4);

		$('#txtQUnit').unbind();

		$('#txtQUnit').jStepper();
		$('#txtQUnit').val('123-456');
		$('#txtQUnit').trigger(objBlurEvent);
		equal($('#txtQUnit').val(), '123456', 'Inputting a dash at the wrong place');

		$('#txtQUnit').val('123-');
		$('#txtQUnit').trigger(objBlurEvent);
		equal($('#txtQUnit').val(), '123', 'Inputting a dash at the wrong place, try 2');

		$('#txtQUnit').val('123----456');
		$('#txtQUnit').trigger(objBlurEvent);
		equal($('#txtQUnit').val(), '123456', 'Pasting in to many dashes');

		$('#txtQUnit').unbind();
		$('#txtQUnit').jStepper({ minValue: -1111, maxValue: 20, overflowMode: 'ignore' });
		$('#txtQUnit').val('-1');
		syn.type('1', $('#txtQUnit'));
		equal($('#txtQUnit').val(), '-11', 'Writing a negative number that is too long compared to maxValue');

	});

	// Hiding QUnit fields after testing is complete
	$('#txtQUnit, #txtQUnit2, #txtQUnit3').hide();

}