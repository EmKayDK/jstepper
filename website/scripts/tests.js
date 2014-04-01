
$(document).ready(function() {
	RunQUnit();
});

function RunQUnit() {

	module("Adding or Subtracting floats");

	test("Adding floats", function() {

		expect(5);
		equal(AddOrSubtractTwoFloats(0.1, 0.1, true), 0.2, "0.1 + 0.1 = 0.2");
		equal(AddOrSubtractTwoFloats(0.01, 0.01, true), 0.02, "0.01 + 0.01 = 0.02");
		equal(AddOrSubtractTwoFloats(1, 0.001, true), 1.001, "1 + 0.001 = 1.001");
		equal(AddOrSubtractTwoFloats(0.999, 0.001, true), 1, "0.999 + 0.001 = 1");
		equal(AddOrSubtractTwoFloats(0.999, 0.999, true), 1.998, "0.999 + 0.999 = 1.998");

	});

	test("Subtracting floats", function() {

		expect(5);
		equal(AddOrSubtractTwoFloats(0.1, 0.1, false), 0, "0.1 - 0.1 = 0");
		equal(AddOrSubtractTwoFloats(0.01, 0.01, false), 0, "0.01 - 0.01 = 0");
		equal(AddOrSubtractTwoFloats(1, 0.001, false), 0.999, "1 - 0.001 = 0.999");
		equal(AddOrSubtractTwoFloats(0.999, 0.001, false), 0.998, "0.999 - 0.001 = 0.998");
		equal(AddOrSubtractTwoFloats(0.999, 0.999, false), 0, "0.999 - 0.999 = 0");

	});

	var objEvent = jQuery.Event("keydown");
	objEvent.keyCode = 38;

	module("Stepping with ints");

	test("Stepping up", function() {

		expect(4);

		$("#txtQUnit").jStepper();
		$("#txtQUnit").val("0");
		$("#txtQUnit").trigger(objEvent);
		equal($("#txtQUnit").val(), "1", "Step up from 0 to 1 through 1 step of 1");
		$("#txtQUnit").unbind();

		$("#txtQUnit").jStepper();
		$("#txtQUnit").val("0");
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		equal($("#txtQUnit").val(), "5", "Step up from 0 to 5 through 5 steps of 1");
		$("#txtQUnit").unbind();

		$("#txtQUnit").jStepper({ normalStep: 0.1 });
		$("#txtQUnit").val("0");
		$("#txtQUnit").trigger(objEvent);
		equal($("#txtQUnit").val(), "0,1", "Step up from 0 to 0.1 through 1 step of 0.1");
		$("#txtQUnit").unbind();


		$("#txtQUnit").jStepper({ normalStep: 0.1 });
		$("#txtQUnit").val("0");
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		$("#txtQUnit").trigger(objEvent);
		equal($("#txtQUnit").val(), "0,5", "Step up from 0 to 0.5 through 5 steps of 0.1");
		$("#txtQUnit").unbind();

		// Hiding QUnit field after testing is complete
		$("#txtQUnit").hide();

	});

}