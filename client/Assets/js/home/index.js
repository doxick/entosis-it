import Moment from "moment";


(function(){
    var parseDuration = function(seconds) {
        var ago = seconds < 0;
        ago && (seconds *= -1);

        var steps = {
            d: 24 * 60 * 60,
            h: 60 * 60,
            m: 60,
            s: 1
        };
        var output = [];
        Object.keys(steps).forEach(function(key) {
            var amount = Math.floor(seconds / steps[key]);
            if (amount || output.length)
                output.push(amount + key);
            seconds = seconds % steps[key];
        });
        return (ago ? '- ':'') + output.join(', ');
    };
    setInterval(function(){
        var Now = Date.now();
        $('.js-timer').each(function(){
            var $this = $(this),
                diff = Moment.utc($this.data('time')).subtract(Now) / 1000;
            $this.text(parseDuration(diff));
        });
    },1000);
})();
