# Contributing to MAIT

First off, thank you for considering contributing to MAIT! It's people like you that make MAIT such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* A clear and descriptive title
* A detailed description of the proposed functionality
* Explain why this enhancement would be useful
* List any additional requirements

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the JavaScript/React styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End files with a newline

## Development Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Development Setup

1. Clone your fork of the repo
```bash
git clone https://github.com/your-username/MAIT.git
```

2. Install dependencies
```bash
cd MAIT
# Install backend dependencies
cd backend && npm install
# Install frontend dependencies
cd ../frontend && npm install
```

3. Create your feature branch
```bash
git checkout -b my-new-feature
```

### Coding Style

* 2 spaces for indentation
* 80 character line length
* Run `npm run lint` to check your code style
* Write meaningful commit messages

## Additional Notes

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

* All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/)
* Prefer the object spread operator (`{...anotherObj}`) over `Object.assign()`
* Inline `export`s with expressions whenever possible
```javascript
// Use this:
export default class ClassName {

}

// Instead of:
class ClassName {

}
export default ClassName
```

### React/JSX Styleguide

* Use JSX syntax
* Use camelCase for prop names
* Use PascalCase for component names
* Props naming:
  * Use "on" prefix for callbacks
  * Use verb as prefix for callback handlers
```javascript
// Good
<MyComponent onChange={this.handleChange} />

// Bad
<MyComponent changed={this.handleChange} />
```

## Questions?

Feel free to open an issue with your question, using the question template.

Thanks! ❤️ ❤️ ❤️
MAIT Team
