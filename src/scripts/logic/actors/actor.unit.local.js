define(['actor.unit'], function (unit) {
    return function (spec) {
        var that = unit(spec);
        var stats = {
            focus: '',
            state: 'base'
        };
        _.extend(that.variables, stats);

        var subscribe = {
            'map.click': 'checkMapClick'
        };

        _.extend(that.handlers.subscribe, subscribe);

        that.checkMapClick = function (e) {
            if (that.variables.selected) {
                that.generatePath(e);
            }
        };

        return that;
    }
});