"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_native_1 = require("react-native");
const color_1 = require("./lib/color");
class AsyncImageAnimated extends react_1.Component {
    constructor(props) {
        super(props);
        this.onError = () => {
            this.setState(() => ({
                failed: true,
            }), () => {
                react_native_1.Animated.timing(this.state.placeholderColorAnimated, {
                    duration: 200,
                    toValue: 0.0,
                }).start();
            });
        };
        this.onLoad = () => {
            const { delay } = this.props;
            const { imageOpacity, placeholderOpacity, placeholderScale, } = this.state;
            const callback = () => this.setState(() => ({ loaded: true }));
            switch (this.animationStyle) {
                case 'fade':
                    return react_native_1.Animated.parallel([
                        react_native_1.Animated.timing(placeholderOpacity, {
                            delay,
                            duration: 200,
                            toValue: 0,
                        }),
                        react_native_1.Animated.timing(imageOpacity, {
                            delay,
                            duration: 300,
                            toValue: 1,
                        }),
                    ]).start(callback);
                case 'shrink':
                    return react_native_1.Animated.parallel([
                        react_native_1.Animated.parallel([
                            react_native_1.Animated.timing(placeholderOpacity, {
                                delay,
                                duration: 200,
                                toValue: 0,
                            }),
                            react_native_1.Animated.timing(placeholderScale, {
                                delay,
                                duration: 200,
                                toValue: 0,
                            }),
                        ]),
                        react_native_1.Animated.timing(imageOpacity, {
                            delay,
                            duration: 300,
                            toValue: 1,
                        }),
                    ]).start(callback);
                default:// explode
                    return react_native_1.Animated.sequence([
                        react_native_1.Animated.parallel([
                            react_native_1.Animated.timing(placeholderScale, {
                                delay,
                                duration: 100,
                                toValue: 0.7,
                            }),
                            react_native_1.Animated.timing(placeholderOpacity, {
                                duration: 100,
                                toValue: 0.66,
                            }),
                        ]),
                        react_native_1.Animated.parallel([
                            react_native_1.Animated.parallel([
                                react_native_1.Animated.timing(placeholderOpacity, {
                                    duration: 200,
                                    toValue: 0,
                                }),
                                react_native_1.Animated.timing(placeholderScale, {
                                    duration: 200,
                                    toValue: 1.2,
                                }),
                            ]),
                            react_native_1.Animated.timing(imageOpacity, {
                                delay: 200,
                                duration: 300,
                                toValue: 1,
                            }),
                        ]),
                    ]).start(callback);
            }
        };
        this.animatePlaceholderColor = () => {
            const { failed, loaded, placeholderColorAnimated, } = this.state;
            if (failed || loaded)
                return;
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(placeholderColorAnimated, {
                    duration: 500,
                    toValue: 1.0,
                }),
                react_native_1.Animated.timing(placeholderColorAnimated, {
                    duration: 400,
                    toValue: 0.0,
                }),
            ]).start(this.animatePlaceholderColor);
        };
        const style = typeof props.style === 'number'
            ? react_native_1.StyleSheet.flatten(props.style)
            : props.style;
        const { width, height } = style;
        if (!width || !height) {
            if (__DEV__)
                console.warn('AsyncImageAnimated: Width and height should be defined in styles.');
        }
        this.animationStyle = props.placeholderSource
            ? 'fade'
            : props.animationStyle;
        this.state = {
            failed: false,
            imageOpacity: new react_native_1.Animated.Value(0),
            loaded: false,
            placeholderColorAnimated: new react_native_1.Animated.Value(1.0),
            placeholderColorLightened: props.placeholderColor
                ? color_1.lightenColor(props.placeholderColor, 20)
                : 'transparent',
            placeholderOpacity: new react_native_1.Animated.Value(1.0),
            placeholderScale: new react_native_1.Animated.Value(1.0),
        };
    }
    componentDidMount() {
        if (!this.props.placeholderSource) {
            this.animatePlaceholderColor();
        }
    }
    render() {
        const { imageKey, placeholderColor, placeholderSource, source, style, } = this.props;
        const { failed, imageOpacity, loaded, placeholderColorAnimated, placeholderColorLightened, placeholderOpacity, placeholderScale, } = this.state;
        return (<react_native_1.View style={style}>

        {!failed &&
            <react_native_1.Animated.Image key={imageKey} source={source} resizeMode={'stretch'} style={[
                style,
                {
                    opacity: imageOpacity,
                    position: 'absolute',
                    resizeMode: 'stretch',
                },
            ]} onLoad={this.onLoad} onError={this.onError}/>}

        {(placeholderSource && !loaded) &&
            <react_native_1.Animated.Image source={placeholderSource} style={[
                style,
                {
                    opacity: placeholderOpacity,
                    position: 'absolute',
                    resizeMode: 'stretch',
                },
            ]}/>}

        {(!placeholderSource && !loaded) &&
            <react_native_1.Animated.View style={[
                style,
                {
                    backgroundColor: placeholderColor
                        ? placeholderColorAnimated.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                placeholderColor,
                                placeholderColorLightened,
                            ],
                        })
                        : 'transparent',
                    opacity: placeholderOpacity,
                    position: 'absolute',
                    transform: [{ scale: placeholderScale }],
                },
            ]}/>}

      </react_native_1.View>);
    }
}
exports.default = AsyncImageAnimated;
//# sourceMappingURL=AsyncImageAnimated.js.map