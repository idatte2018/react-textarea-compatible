(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global.TextareaCompatible = factory(global.React,global.PropTypes));
}(this, (function (React,PropTypes) { 'use strict';

React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var isSafari = function isSafari() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') == -1;
};

var TextareaCompatible = function (_React$Component) {
  inherits(TextareaCompatible, _React$Component);

  function TextareaCompatible(props) {
    classCallCheck(this, TextareaCompatible);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { focused: false };

    _this.getValue = _this.getValue.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  TextareaCompatible.prototype.getValue = function getValue() {
    var _props = this.props,
        value = _props.value,
        maxLength = _props.maxLength;

    return value.length > maxLength ? value.substring(0, maxLength) : value;
  };

  TextareaCompatible.prototype.handleChange = function handleChange(e) {
    var _props2 = this.props,
        maxLength = _props2.maxLength,
        onChange = _props2.onChange;

    var newVal = e.target.value;

    if (!isSafari() || newVal.length <= maxLength) {
      onChange & onChange(newVal);
      return;
    }

    // When it exceeds the maximum length of textarea, truncate the exceed of the changed difference.
    var cursorPosition = e.target.selectionEnd;
    onChange(newVal.substring(0, maxLength - (newVal.length - cursorPosition)) + newVal.substring(cursorPosition));
  };

  TextareaCompatible.prototype.handleFocus = function handleFocus(e) {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  TextareaCompatible.prototype.handleBlur = function handleBlur(e) {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  TextareaCompatible.prototype.render = function render() {
    var _props3 = this.props,
        maxLength = _props3.maxLength,
        placeholder = _props3.placeholder,
        style = _props3.style,
        props = objectWithoutProperties(_props3, ['maxLength', 'placeholder', 'style']);


    var options = {};
    if (!isSafari()) {
      // Use maxlength attribue except that it is a safari browser.
      options.maxLength = maxLength;
    }

    var isMultiLinePlaceholder = placeholder.length > 0 && placeholder.includes('\n');
    if (isMultiLinePlaceholder) {
      options.onBlur = this.handleBlur;
      options.onFocus = this.handleFocus;
    } else if (placeholder.length > 0) {
      options.placeholder = placeholder;
    }

    var inputValue = this.getValue();
    var showMultipleLinePlaceholder = isMultiLinePlaceholder && !this.state.focused && inputValue.length === 0;
    return React.createElement('textarea', _extends({}, props, options, {
      value: showMultipleLinePlaceholder ? placeholder : inputValue,
      style: Object.assign({}, style, {
        color: showMultipleLinePlaceholder ? '#9f9f9f' : '#333'
      }),
      onChange: this.handleChange
    }));
  };

  return TextareaCompatible;
}(React.Component);

TextareaCompatible.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

TextareaCompatible.defaultProps = {
  value: '',
  maxLength: Number.MAX_SAFE_INTEGER,
  placeholder: ''
};

return TextareaCompatible;

})));
