'use strict';

function CalculatorService() {

  // Init attribute
  var display_before_operation = null; // if !null: the number before the operation sign
  var current_operation = null;
  var current_display = null; // For the current number
  var current_display_has_decimal = false;

  // Init Numbers
  var digits = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  };

  this.enterDigit = function(digit) {
    var d = digits[digit] || null;
    if (d !== null) {
      if (current_display_has_decimal === true) {

        var count_decimal = 0;
        count_decimal = (current_display.toString().indexOf('.') === -1)
          ? 0
          : current_display.toString().split(".")[1].length;
        current_display = current_display + (d / Math.pow(10, count_decimal + 1));
      }
      else {
        current_display = (current_display === null) ? d : current_display * 10 + d;
      }
    }
  };

  this.enterOperation = function(operation) {
    // Special case, we already have display_before_sign, operation and current_display
    if ((display_before_operation !== null) && (current_operation !== null) && (current_display !== null)) {
      this.enterEquals();
    }

    // Basic case, we have not last_display
    if (display_before_operation === null) {
      display_before_operation = current_display || 0; // switch current_display to display_before_operation
      current_operation = operation; // update operation to current one
      current_display = null;
      current_display_has_decimal = false;
    }
  };

  this.enterDot = function() {
    current_display_has_decimal = true;
  };

  this.enterEquals = function() {
    if ((display_before_operation !== null) && (current_operation !== null) && (current_display !== null)) {
      if (['+', '-', '*', '/', '%'].indexOf(current_operation) !== -1) {
        switch(current_operation) {
          case '+':
            current_display = display_before_operation + current_display;
            break;
          case '-':
            current_display = display_before_operation - current_display;
            break;
          case '*':
            current_display = display_before_operation * current_display;
            break;
          case '/':
            current_display = display_before_operation / current_display;
            break;
          case '%':
            current_display = display_before_operation % current_display;
            break;
        }
        current_display_has_decimal = (current_display.toString().indexOf('.') !== -1);
        display_before_operation = null;
        current_operation = null;
      }
    }
  };

  this.enterClear = function() {
    display_before_operation = null;
    current_display = null;
    current_operation = null;
    current_display_has_decimal = false;
  };

  this.getDisplay = function() {
    // On the case we display after enterOperation, return display_before_operation
    if (display_before_operation !== null && current_operation !== null && current_display === null) {
      return display_before_operation.toString();
    }

    return current_display && current_display.toString() || "0";
  };

}