import React from 'react';
import { FormControl } from 'react-bootstrap';

export default class ValidatedInput extends FormControl {
    constructor(props) {
        super(props);

        if (!props._registerInput || !props._unregisterInput) {
            throw new Error('Input must be placed inside the Form component');
        }
    }

    componentWillMount() {
        if (FormControl.prototype.componentWillMount) {
            super.componentWillMount();
        }

        this.props._registerInput(this);
    }

    componentWillUnmount() {
        if (FormControl.prototype.componentWillUnmount) {
            super.componentWillUnmount();
        }

        this.props._unregisterInput(this);
    }
}

ValidatedInput.propTypes = Object.assign({}, FormControl.propTypes, {
    name           : React.PropTypes.string.isRequired,
    validationEvent: React.PropTypes.oneOf([
        '', 'onChange', 'onBlur', 'onFocus'
    ]),
    validate       : React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string
    ]),
    errorHelp      : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ])
});

ValidatedInput.defaultProps = Object.assign({}, FormControl.defaultProps, {
    validationEvent: ''
});
