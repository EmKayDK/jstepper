// jStepper 1.4.0

// A jQuery plugin by EmKay usable for making a numeric textfield value easy to increase or decrease.

(function(jQuery) {

	jQuery.fn.jStepper = function(options) {

		if (this.length > 1) {
			this.each(function() { $(this).jStepper(options) });
			return this;
		}

		var o = jQuery.extend({}, jQuery.fn.jStepper.defaults, options);

		if (jQuery.metadata) {
			o = jQuery.extend({}, o, this.metadata());
		}

		if (o.disableAutocomplete) {
			this.attr('autocomplete', 'off');
		}

		if (jQuery.isFunction(this.mousewheel)) {
			this.mousewheel(function(objEvent, intDelta) {
				if (intDelta > 0) { // Up
					MakeStep(o, 1, objEvent, this);
					return false;
				}
				else if (intDelta < 0) { // Down
					MakeStep(o, 0, objEvent, this);
					return false;
				}
			});
		}

		this.keydown(function(e) {
			var key = e.keyCode;

			if (key === 38) { // Up
				MakeStep(o, 1, e, this);
			}

			if (key === 40) { // Down
				MakeStep(o, 0, e, this);
			}

		});

		this.keyup(function(e) {

			CheckValue(o, this);

		});

		var CheckValue = function(o, objElm) {

			var $objElm = jQuery(objElm);

			var strValue = $objElm.val();
			var initialStrValue = strValue;

			if (o.disableNonNumeric) {
				strValue = strValue.replace(/[^\d\.,\-]/gi, '');
			}

			if (!o.allowDecimals) {
				strValue = strValue.replace(/[^\d\-]/gi, '');
			}

			if (o.maxValue !== null) {
				if (strValue >= o.maxValue) {
					strValue = o.maxValue;
				}
			}

			if (o.minValue !== null) {
				if (strValue < o.minValue && strValue != '') {
					strValue = o.minValue;
				}
			}

			if (initialStrValue != strValue) {
				$objElm.val(strValue);
			}

		};

		var MakeStep = function(o, bDirection, keydown, objElm) {

			var $objElm = jQuery(objElm);

			var stepToUse;

			if (keydown) {

				if (keydown.ctrlKey) {
					stepToUse = o.ctrlStep;
				} else if (keydown.shiftKey) {
					stepToUse = o.shiftStep;
				} else {
					stepToUse = o.normalStep;
				}

			} else {
				stepToUse = o.normalStep;
			}

			var numValue = $objElm.val();

			var intSelectionStart = numValue.length - objElm.selectionStart;
			var intSelectionEnd = numValue.length - objElm.selectionEnd;

			numValue = numValue.replace(/,/g, '.');
			numValue = numValue.replace(o.decimalSeparator, '.');

			numValue = numValue + '';
			if (numValue.indexOf('.') != -1) {
				numValue = numValue.match(new RegExp('-{0,1}[0-9]+[\\.][0-9]*'));
			}

			numValue = numValue + '';
			if (numValue.indexOf('-') != -1) {
				numValue = numValue.match(new RegExp('-{0,1}[0-9]+[\\.]*[0-9]*'));
			}

			numValue = numValue + '';
			numValue = numValue.match(new RegExp('-{0,1}[0-9]+[\\.]*[0-9]*'));

			if (numValue === '' || numValue == '-' || numValue === null) {
				numValue = o.defaultValue;
			}

			if (bDirection === 1) {
				numValue = jQuery.fn.jStepper.AddOrSubtractTwoFloats(numValue, stepToUse, true);
			} else {
				numValue = jQuery.fn.jStepper.AddOrSubtractTwoFloats(numValue, stepToUse, false);
			}

			var bLimitReached = false;

			if (o.maxValue !== null) {
				if (numValue >= o.maxValue) {
					numValue = o.maxValue;
					bLimitReached = true;
				}
			}

			if (o.minValue !== null) {
				if (numValue <= o.minValue) {
					numValue = o.minValue;
					bLimitReached = true;
				}
			}

			numValue = numValue + '';

			if (o.minLength !== null) {
				var intLengthNow = numValue.length;

				if (numValue.indexOf('.') != -1) {
					intLengthNow = numValue.indexOf('.');
				}
				var bIsNegative = false;
				if (numValue.indexOf('-') != -1) {
					bIsNegative = true;
					numValue = numValue.replace(/-/, '');
				}

				if (intLengthNow < o.minLength) {
					for (var i = 1; i <= (o.minLength - intLengthNow) ; i++) {
						numValue = '0' + numValue;
					}
				}

				if (bIsNegative) {
					numValue = '-' + numValue;
				}

			}

			numValue = numValue + '';

			var intDecimalsNow;

			if (o.minDecimals > 0) {
				var intDecimalsMissing;
				if (numValue.indexOf('.') != -1) {
					intDecimalsNow = numValue.length - (numValue.indexOf('.') + 1);
					if (intDecimalsNow < o.minDecimals) {
						intDecimalsMissing = o.minDecimals - intDecimalsNow;
					}
				} else {
					intDecimalsMissing = o.minDecimals;
					numValue = numValue + '.';
				}
				for (var intDecimalIndex = 1; intDecimalIndex <= intDecimalsMissing; intDecimalIndex++) {
					numValue = numValue + '0';
				}
			}

			if (o.maxDecimals > 0) {
				intDecimalsNow = 0;
				if (numValue.indexOf('.') != -1) {
					intDecimalsNow = numValue.length - (numValue.indexOf('.') + 1);
					if (o.maxDecimals < intDecimalsNow) {
						numValue = numValue.substring(0, numValue.indexOf('.')) + '.' + numValue.substring(numValue.indexOf('.') + 1, numValue.indexOf('.') + 1 + o.maxDecimals);
					}
				}
			}

			if (!o.allowDecimals) {
				numValue = numValue + '';
				numValue = numValue.replace(new RegExp('[\\.].+'), '');
			}

			numValue = numValue.replace(/\./, o.decimalSeparator);

			$objElm.val(numValue);

			objElm.selectionStart = numValue.length - intSelectionStart;
			objElm.selectionEnd = numValue.length - intSelectionEnd;

			CheckValue(o, objElm);

			if (o.onStep) {
				o.onStep($objElm, bDirection, bLimitReached);
			}

			return false;

		};

		return this;

	};

	jQuery.fn.jStepper.AddOrSubtractTwoFloats = function(fltValue1, fltValue2, bAddSubtract) {

		var strNumber1 = fltValue1.toString();
		var strNumber2 = fltValue2.toString();

		var strResult = '';

		if (strNumber1.indexOf('.') > -1 || strNumber2.indexOf('.') > -1) {

			// If no decimals on one of them, then put them on!
			if (strNumber1.indexOf('.') == -1) {
				strNumber1 = strNumber1 + '.0';
			}

			if (strNumber2.indexOf('.') == -1) {
				strNumber2 = strNumber2 + '.0';
			}

			// Get only decimals
			var strDecimals1 = strNumber1.substr(strNumber1.indexOf('.') + 1);
			var strDecimals2 = strNumber2.substr(strNumber2.indexOf('.') + 1);

			// Getting the integers...
			var strInteger1 = strNumber1.substr(0, strNumber1.indexOf('.'));
			var strInteger2 = strNumber2.substr(0, strNumber2.indexOf('.'));

			//Make sure that the two decimals are same length (ie .02 vs .001) and append zeros as necessary.
			var bNotSameLength = true;

			while (bNotSameLength) {

				if (strDecimals1.length !== strDecimals2.length) {
					if (strDecimals1.length < strDecimals2.length) {
						strDecimals1 += '0';
					} else {
						strDecimals2 += '0';
					}
				} else {
					bNotSameLength = false;
				}

			}

			var intOriginalDecimalLength = strDecimals1.length;

			for (var intCharIndex = 0; intCharIndex <= strDecimals1.length - 1; intCharIndex++) {
				strInteger1 = strInteger1 + strDecimals1.substr(intCharIndex, 1);
				strInteger2 = strInteger2 + strDecimals2.substr(intCharIndex, 1);
			}

			var intInteger1 = Number(strInteger1);
			var intInteger2 = Number(strInteger2);
			var intResult;

			if (bAddSubtract) {
				intResult = intInteger1 + intInteger2;
			} else {
				intResult = intInteger1 - intInteger2;
			}

			strResult = intResult.toString();

			for (var intZerosAdded = 0; intZerosAdded < ((intOriginalDecimalLength - strResult.length) + 1) ; intZerosAdded++) {
				strResult = '0' + strResult;
			}

			if (strResult.length >= intOriginalDecimalLength) {
				strResult = strResult.substring(0, strResult.length - intOriginalDecimalLength) + '.' + strResult.substring(strResult.length - intOriginalDecimalLength);
			}

		} else {
			if (bAddSubtract) {
				strResult = Number(fltValue1) + Number(fltValue2);
			} else {
				strResult = Number(fltValue1) - Number(fltValue2);
			}

		}

		return Number(strResult);

	};

	jQuery.fn.jStepper.defaults = {
		maxValue: null,
		minValue: null,
		normalStep: 1,
		shiftStep: 5,
		ctrlStep: 10,
		minLength: null,
		disableAutocomplete: true,
		defaultValue: 1,
		decimalSeparator: ',',
		allowDecimals: true,
		minDecimals: 0,
		maxDecimals: null,
		disableNonNumeric: true,
		onStep: null
	};

})(jQuery);