const React = require('react');
const ReactNative = require('react-native');
const {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} = ReactNative;
const Button = (props) => {
  return <TouchableWithoutFeedback
    delayPressIn={0}
    // background={TouchableNativeFeedback.()} // eslint-disable-line new-cap
    {...props}
  >
    {props.children}
  </TouchableWithoutFeedback>;
};

module.exports = Button;
