
import React from 'react';
import PropTypes from 'prop-types';

const isSafari = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') == -1);
};

class TextareaCompatible extends React.Component {

  constructor(props) {
    super(props);
    this.state = { focused: false };

    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  getValue() {
    const { value, maxLength } = this.props;
    return value.length > maxLength ? value.substring(0, maxLength) : value;
  }

  handleChange(e) {
    const { maxLength, onChange } = this.props;
    const newVal = e.target.value;

    if (!isSafari() || newVal.length <= maxLength) {
      onChange & onChange(newVal);
      return;
    }

    // When it exceeds the maximum length of textarea, truncate the exceed of the changed difference.
    const cursorPosition = e.target.selectionEnd;
    onChange(newVal.substring(0, maxLength - (newVal.length - cursorPosition))
      + newVal.substring(cursorPosition));
  }

  handleFocus(e) {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  handleBlur(e) {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  render() {
    const {
      value,  // eslint-disable-line no-unused-vars
      maxLength,
      placeholder,
      onChange,  // eslint-disable-line no-unused-vars
      onBlur,
      onFocus,
      ...props
    } = this.props;

    const options = {};
    if (!isSafari()) {
      // Use maxlength attribue except that it is a safari browser.
      options.maxLength = maxLength;
    }

    const isMultiLinePlaceholder = placeholder.length > 0 && placeholder.includes('\n');
    if (isMultiLinePlaceholder) {
      options.onBlur = this.handleBlur;
      options.onFocus = this.handleFocus;
    } else if (placeholder.length > 0) {
      options.placeholder = placeholder;
    }

    if (!isMultiLinePlaceholder && onBlur !== undefined) {
      options.onBlur = onBlur;
    }

    if (!isMultiLinePlaceholder && onFocus !== undefined) {
      options.onFocus = onFocus;
    }

    const inputValue = this.getValue();
    const showMultipleLinePlaceholder = (isMultiLinePlaceholder &&!this.state.focused
      && inputValue.length === 0);
    return (
      <textarea
        value={ showMultipleLinePlaceholder ? placeholder : inputValue}
        style={{ color: showMultipleLinePlaceholder ? '#9f9f9f': '#333' }}
        onChange={this.handleChange}
        { ...options }
        { ...props }
      />
    );
  }
}

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

export default TextareaCompatible;
