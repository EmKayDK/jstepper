// jStepper 1.5.3

// A jQuery plugin by EmKay usable for making a numeric textfield value easy to increase or decrease.

(function(jQuery) {

	jQuery.fn.jStepper = function(param1, param2, param3) {

		if (this.length > 1) {
			this.each(function() { $(this).jStepper(param1) });
			return this;
		}

		if (typeof param1 === 'string') {

			if (param1 === 'option') {

				if (param3 === null) {
					param3 = jQuery.fn.jStepper.defaults[param2];
				}

				this.data('jstepper.o')[param2] = param3;
			}

			return this;

		}

		var o = jQuery.extend({}, jQuery.fn.jStepper.defaults, param1);

		if (jQuery.metadata) {
			o = jQuery.extend({}, o, this.metadata());
		}

		this.data('jstepper.o', o);

		if (o.disableAutocomplete) {
			this.attr('autocomplete', 'off');
		}

		if (jQuery.isFunction(this.mousewheel)) {
			this.mousewheel(function(e, intDelta) {
				if (intDelta > 0) { // Up

					var objDownEvent = jQuery.Event('keydown');
					objDownEvent.keyCode = 38;

					MakeStep(1, objDownEvent, this);
					return false;
				}
				else if (intDelta < 0) { // Down

					var objDownEvent = jQuery.Event('keydown');
					objDownEvent.keyCode = 40;

					MakeStep(0, objDownEvent, this);
					return false;
				}
			});
		}

		this.blur(function() {
			CheckValue(this, null);
		});

		this.keydown(function(e) {

			var key = e.keyCode;

			if (key === 38) { // Up
				MakeStep(1, e, this);
			} else if (key === 40) { // Down
				MakeStep(0, e, this);
			} else {

				if (o.overflowMode === 'ignore') {

					var objValueToCheck = $(this).val().indexOf("-") === 0 ? o.minValue : o.maxValue;

					if (objValueToCheck) {

						if ($(this).val().length >= objValueToCheck.toString().length) {

							if (
								((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) &&
								(this.selectionStart === this.selectionEnd)
								) {
								return false;
							}

						}

					}

				}

			}

		});

		this.keyup(function(e) {

			CheckValue(this, e);

		});

		var CheckValue = function(objElm, key) {

			var $objElm = jQuery(objElm);

			var strValue = $objElm.val();
			var initialStrValue = strValue;

			if (o.disableNonNumeric) {
				strValue = strValue.replace(/[^\d\.,\-]/gi, '');
				strValue = strValue.replace(/-{2,}/g, '-');
				strValue = strValue.replace(/(.+)\-+/g, '$1');
			}

			var bOverflow = false;

			if (o.maxValue !== null) {
				if (strValue > o.maxValue) {
					strValue = o.maxValue;
					bOverflow = true;
				}
			}

			if (o.minValue !== null) {
				if (strValue != '' && parseFloat(strValue) < parseFloat(o.minValue)) {
					strValue = o.minValue;
					bOverflow = true;
				}
			}

			if (IsUpOrDownKey(key) === true || key === null || bOverflow === true) {
				strValue = DoTheChecks(strValue);
			}

			if (initialStrValue != strValue) {
				$objElm.val(strValue);
			}

		};

		var MakeStep = function(bDirection, key, objElm) {

			var $objElm = jQuery(objElm);

			var stepToUse;

			if (key) {

				if (key.ctrlKey) {
					stepToUse = o.ctrlStep;
				} else if (key.shiftKey) {
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

			numValue = numValue.toString().replace(/\./, o.decimalSeparator);

			$objElm.val(numValue);

			objElm.selectionStart = numValue.length - intSelectionStart;
			objElm.selectionEnd = numValue.length - intSelectionEnd;

			CheckValue(objElm, key);

			if (o.onStep) {
				o.onStep($objElm, bDirection, bLimitReached);
			}

			return false;

		};

		var DoTheChecks = function(strValue) {

			var strResult = strValue.toString();
			strResult = CheckMinDecimals(strResult);
			strResult = CheckMaxDecimals(strResult);
			strResult = CheckAllowDecimals(strResult);
			strResult = CheckMinLength(strResult);

			return strResult;

		};

		var CheckMinDecimals = function(strValue) {

			var strResult = strValue;

			if (o.minDecimals > 0) {
				var intDecimalsMissing;
				if (strResult.indexOf('.') != -1) {
					var intDecimalsNow = strResult.length - (strResult.indexOf('.') + 1);
					if (intDecimalsNow < o.minDecimals) {
						intDecimalsMissing = o.minDecimals - intDecimalsNow;
					}
				} else {
					intDecimalsMissing = o.minDecimals;
					strResult = strResult + '.';
				}
				for (var intDecimalIndex = 1; intDecimalIndex <= intDecimalsMissing; intDecimalIndex++) {
					strResult = strResult + '0';
				}
			}

			return strResult;

		};

		var CheckMaxDecimals = function(strValue) {

			var strResult = strValue;

			if (o.maxDecimals > 0) {
				var intDecimalsNow = 0;
				if (strResult.indexOf('.') != -1) {
					intDecimalsNow = strResult.length - (strResult.indexOf('.') + 1);
					if (o.maxDecimals < intDecimalsNow) {
						strResult = strResult.substring(0, strResult.indexOf('.')) + '.' + strResult.substring(strResult.indexOf('.') + 1, strResult.indexOf('.') + 1 + o.maxDecimals);
					}
				}
			}

			return strResult;

		};

		var CheckAllowDecimals = function(strValue) {

			var strResult = strValue;

			if (!o.allowDecimals) {

				strResult = strResult.toString().replace(o.decimalSeparator, '.');
				strResult = strResult.replace(new RegExp('[\\.].+'), '');

			}

			return strResult;

		};

		var CheckMinLength = function(strValue) {

			var strResult = strValue;

			if (o.minLength !== null) {
				var intLengthNow = strResult.length;

				if (strResult.indexOf('.') != -1) {
					intLengthNow = strResult.indexOf('.');
				}
				var bIsNegative = false;
				if (strResult.indexOf('-') != -1) {
					bIsNegative = true;
					strResult = strResult.replace(/-/, '');
				}

				if (intLengthNow < o.minLength) {
					for (var i = 1; i <= (o.minLength - intLengthNow) ; i++) {
						strResult = '0' + strResult;
					}
				}

				if (bIsNegative) {
					strResult = '-' + strResult;
				}

			}

			return strResult;

		};

		var IsUpOrDownKey = function(key) {

			var bResult = false;

			if (key !== null) {

				if (key.keyCode === 38 || key.keyCode === 40) {
					bResult = true;
				}

			}

			return bResult;

		};

		var GetOption = function(strOptionName) {

			return this.data('jstepper.o')[strOptionName];

		};

		return this;

	};

	jQuery.fn.jStepper.AddOrSubtractTwoFloats = function(fltValue1, fltValue2, bAddSubtract) {

		var strNumber1 = fltValue1.toString();
		var strNumber2 = fltValue2.toString();

		var strResult = '';

		if (strNumber1.indexOf('.') > -1 || strNumber2.indexOf('.') > -1) {

			// If no decimals on one of them, then put them on!
			if (strNumber1.indexOf('.') === -1) {
				strNumber1 = strNumber1 + '.0';
			}

			if (strNumber2.indexOf('.') === -1) {
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

			var bIsNegative = false;

			if (intResult < 0) {
				bIsNegative = true;
				intResult = Math.abs(intResult);
			}

			strResult = intResult.toString();

			for (var intZerosAdded = 0; intZerosAdded < ((intOriginalDecimalLength - strResult.length) + 1) ; intZerosAdded++) {
				strResult = '0' + strResult;
			}

			if (strResult.length >= intOriginalDecimalLength) {
				strResult = strResult.substring(0, strResult.length - intOriginalDecimalLength) + '.' + strResult.substring(strResult.length - intOriginalDecimalLength);
			}

			if (bIsNegative === true) {
				strResult = '-' + strResult;
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
		onStep: null,
		overflowMode: 'default'
	};

})(jQuery);