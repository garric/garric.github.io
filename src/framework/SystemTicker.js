/**
 * Created by garricxiang on 2017/5/12.
 */

var sys;
(function (sys) {

    sys.$START_TIME = 0;
    sys.$invalidateRenderFlag = false;
    sys.$requestRenderingFlag = false;

    var SystemTicker = (function () {
        function SystemTicker() {
            this.callBackList = [];
            this.thisObjectList = [];

            this.$frameRate = 30;
            sys.$START_TIME = Date.now();
            this.frameDeltaTime = 1000 / this.$frameRate;
            this.lastCount = this.frameInterval = Math.round(60000 / this.$frameRate);
        }
        var c=SystemTicker,p=c.prototype;

        p.startTick = function (callBack, thisObject) {
            var index = this.getTickIndex(callBack, thisObject);
            if (index != -1) {
                return;
            }
            this.concatTick();
            this.callBackList.push(callBack);
            this.thisObjectList.push(thisObject);
        };

        p.stopTick = function (callBack, thisObject) {
            var index = this.getTickIndex(callBack, thisObject);
            if (index == -1) {
                return;
            }
            this.concatTick();
            this.callBackList.splice(index, 1);
            this.thisObjectList.splice(index, 1);
        };

        p.getTickIndex = function (callBack, thisObject) {
            var callBackList = this.callBackList;
            var thisObjectList = this.thisObjectList;
            for (var i = callBackList.length - 1; i >= 0; i--) {
                if (callBackList[i] == callBack &&
                    thisObjectList[i] == thisObject) {
                    return i;
                }
            }
            return -1;
        };

        p.concatTick = function () {
            this.callBackList = this.callBackList.concat();
            this.thisObjectList = this.thisObjectList.concat();
        };

        p.$setFrameRate = function (value) {
            value = +value || 0;
            if (value <= 0) {
                return false;
            }
            if (this.$frameRate == value) {
                return false;
            }
            this.$frameRate = value;
            if (value > 60) {
                value = 60;
            }

            this.frameDeltaTime = 1000 / value;
            //这里用60*1000来避免浮点数计算不准确的问题。
            this.lastCount = this.frameInterval = Math.round(60000 / value);
            return true;
        };
        /**
         * @private
         * 执行一次刷新
         */
        p.update = function () {
            var callBackList = this.callBackList;
            var thisObjectList = this.thisObjectList;
            var length = callBackList.length;
            var timeStamp = sys.getTimer();
            for (var i = 0; i < length; i++) {
                callBackList[i].call(thisObjectList[i], timeStamp);
            }
        };

        return SystemTicker;
    }());
    sys.SystemTicker = SystemTicker;
    sys.$ticker = new sys.SystemTicker();

    function getTimer() {
        return Date.now() - sys.$START_TIME;
    }
    sys.getTimer = getTimer;

})(sys || (sys = {}));
