var { NativeModules } = require('react-native');
module.exports = NativeModules.CommonConfigModule;

// 通过调用CommonConfigModule.getUserId(123456) 给原生传递userid