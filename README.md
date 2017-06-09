# react-textarea-compatible

A react textarea component which absorbs the difference in multiple browsers.

The following features are provided.

- Treats line break as 1 letter in safari when the maxLength attribute is set.
- Supports placeholder with multiple lines.

```javascript
import TextareaCompatible from 'react-textarea-compatible';

React.renderComponent(
  <div>
    <TextareaCompatible
      value={this.state.memo}
      maxLength={30}
      placeholder="this is \na \nmultiple line \nplaceholder"
    />
  </div>,
  document.querySelector('#element'));
```

## Install

`npm install react-textarea-compatible`


## Development

To release patch, minor or major version:

    % npm run release:patch
    % npm run release:minor
    % npm run release:major

This will run eslint, compile sources from `src/` to `lib/`, `es/` and `dist/`, bump a
version in `package.json` and then create a new git commit with tag. If tests or
linter fails — commit won't be created. If tasks succeed it publishes to npm and pushes a tag to github.
