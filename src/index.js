import React from 'react';
import PropTypes from 'prop-types';

const isSafari = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') == -1;
};

class TextareaCompatible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      cursorPosition: -1,
    };

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
    const selectionEnd = e.target.selectionEnd;
    const cursorPosition = maxLength - (newVal.length - selectionEnd);
    const leftPart = newVal.substring(0, cursorPosition);
    const rightPart = newVal.substring(selectionEnd);
    onChange(leftPart + rightPart);
    this.setState({ cursorPosition });
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

  componentDidUpdate() {
    const cursorPosition = this.state.cursorPosition;
    if (cursorPosition !== -1 && cursorPosition <= this.getValue().length) {
      this.setState({ cursorPosition: -1 });
      this.textarea.selectionEnd = cursorPosition;
      this.textarea.selectionStart = cursorPosition;
    }
  }

  render() {
    const { maxLength, placeholder, style, ...props } = this.props;

    const options = {};
    if (!isSafari()) {
      // Use maxlength attribue except that it is a safari browser.
      options.maxLength = maxLength;
    }

    const isMultiLinePlaceholder =
      placeholder.length > 0 && placeholder.includes('\n');
    if (isMultiLinePlaceholder) {
      options.onBlur = this.handleBlur;
      options.onFocus = this.handleFocus;
    } else if (placeholder.length > 0) {
      options.placeholder = placeholder;
    }

    const inputValue = this.getValue();
    const showMultipleLinePlaceholder =
      isMultiLinePlaceholder && !this.state.focused && inputValue.length === 0;
    return (
      <textarea
        {...props}
        {...options}
        value={showMultipleLinePlaceholder ? placeholder : inputValue}
        style={Object.assign({}, style, {
          color: showMultipleLinePlaceholder ? '#9f9f9f' : '#333',
        })}
        onChange={this.handleChange}
        ref={textarea => {
          this.textarea = textarea;
        }}
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
  onBlur: PropTypes.func,
};

TextareaCompatible.defaultProps = {
  value: '',
  maxLength: Number.MAX_SAFE_INTEGER,
  placeholder: '',
};

export default TextareaCompatible;
