'use strict'

var d3 = require('d3')

/**
 * An SVG based slider control
 * @constructor
 */
function sliderControl() {

    var _update = function (v) { value = stepValue(v); }; // General update function that updates the value

    var xScale;      // Scale for the x-axis
    var brush;       // Brush which is used to represent the slider
    var slider = {}; // The slider control that will be returned
    var valActual = 0;
    var valAlpha = 0.2;

    // The following properties are public and modified through the getter/setter functions
    var margin = { top: 0, left: 20, bottom: 20, right: 20 };
    var cssClass = '';
    var width = undefined;
    var height = undefined;
    var minimumValue = 0;
    var maximumValue = 100;
    var stepSize = 0.1;
    var value = 0;
    var handleWidth = 10;

    // The following functions are public and modified through the getter/setter functions
    var _callback = function (slider, v) {};

    /**
     * Changes the width of the slider (pre initialization only)
     * @param {number} The width that the slider should take
     * @return {number} The width that the slider should take or the slider
     */
    slider.width = function (_) {
        if (!arguments.length) return width;
        width = _;
        return slider;
    };

    /**
     * Changes the height of the slider (pre initialization only)
     * @param {number} The height that the slider should take
     * @return {number} The height that the slider should take or the slider
     */
    slider.height = function (_) {
        if (!arguments.length) return height;
        height = _;
        return slider;
    };

    /**
     * Changes the width of the slider handle (pre initialization only)
     * @param {number} The width of the slider handle
     * @return {number} The width of the slider handle or the slider
     */
    slider.handleWidth = function (_) {
        if (!arguments.length) return handleWidth;
        handleWidth = _;
        return slider;
    };

    /**
     * Changes the minimum value of the slider (pre initialization only)
     * @param {number} The minimum value that the slider can take
     * @return {number} The minimum value that the slider can take or the slider
     */
    slider.minimumValue = function (_) {
        if (!arguments.length) return minimumValue;
        minimumValue = _;
        return slider;
    };

    /**
     * Changes the maximum value of the slider (pre initialization only)
     * @param {number} The maximum value that the slider can take
     * @return {number} The maximum value that the slider can take or the slider
     */
    slider.maximumValue = function (_) {
        if (!arguments.length) return maximumValue;
        maximumValue = _;
        return slider;
    };

    /**
     * Changes the step size of the slider (pre initialization only)
     * @param {number} The step size that the slider uses
     * @return {number} The step size that the slider uses or the slider
     */
    slider.stepSize = function (_) {
        if (!arguments.length) return stepSize;
        stepSize = _;
        return slider;
    };

    /**
     * Changes the margin of the slider (pre initialization only)
     * @param {object} The margin that the slider should use
     * @return {number} The margin that the slider is using or the slider
     */
    slider.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return slider;
    };

   /**
    * Changes the custom CSS class that should be attatched to the slider (pre initialization only)
    * @param {string} The custom CSS class of the slider
    * @return {string} The current custom CSS class of the slider or the slider
    */
    slider.cssClass = function (_) {
        if (!arguments.length) return cssClass;
        cssClass = _;
        return slider;
    };

    /**
    * Changes the current value of the slider
    * @param {number} The current value of the slider
    * @return {number} The current value of the slider or the slider
    */
    slider.value = function (_) {
        if (!arguments.length) return value;
        if (_ !== value) {
            _update(_);
            _callback(slider, _);
        }
        return slider;
    };

    /**
    * Changes the current value of the slider to the next higher increment
    * @return {object} The slider
    */
    slider.increment = function() {
        if (value < maximumValue) {
            var v = Math.min(maximumValue, value + stepSize);
            _update(v);
            _callback(slider, v);
        }
        return slider;
    };

    /**
    * Changes the current value of the slider to the next lower increment
    * @return {object} The slider
    */
    slider.decrement = function() {
        if (value > minimumValue) {
            var v = Math.max(minimumValue, value - stepSize);
            _update(v);
            _callback(slider, v);
        }
        return slider;
    };

    /**
    * Changes the callback of the slider, triggered when the value changes
    * @param {function} The function to call that can take up to 2 parameters (slider, value)
    * @return {function} The current callback function
    */
    slider.callback = function (_) {
        if (!arguments.length) return _callback;
        _callback = _;
        return slider;
    };

    function stepValue(val) {

      if (val === minimumValue || val === maximumValue) {
        return val;
      }

        var valModStep = (val - minimumValue) % stepSize;
        var alignValue = val - valModStep;

        if (Math.abs(valModStep) * 2 >= stepSize) {
          alignValue += (valModStep > 0) ? stepSize : -stepSize;
        }

      return alignValue;
    }

    /**
     * When the slider changes it's value by having the slider dragged
     * then calculate the new value and trigger an update/callback
     */
    function brushed() {

        // if this is not a programmatic event
        if (d3.event.sourceEvent) {
            // determine the value from the mouse position and the scale
            v = stepValue(xScale.invert(d3.mouse(this)[0]));

            // trigger an update of the value and a callback if the
            // value has changed - which throttles the updates when
            // the slider has hit the min/max value
            if(v !== value) {
               _update(v);
               _callback(slider, v);
            }
        }
    };

    /**
     * Configures the slider based on the given JavaScript object
     * which makes configuring a slider from JSON much simpler.
     * @param {object} A JavaScript object of properties
     * @return {object} The slider for method chaining
     */
    slider.configure = function(config) {

        // ensure that we don't have an empty object
        config = config || {};

        if(config.width) { slider.width(config.width); }
        if(config.height) { slider.height(config.height); }
        if(config.minimumValue) { slider.minimumValue(config.minimumValue); }
        if(config.maximumValue) { slider.maximumValue(config.maximumValue); }
        if(config.stepSize) { slider.stepSize(config.stepSize); }
        if(config.value) { slider.value(config.value); }
        if(config.cssClass) { slider.cssClass(config.cssClass); }
        if(config.handleWidth) { slider.handleWidth(config.handleWidth); }
        if(config.margin) { slider.margin(config.margin); }

        return slider;
    };

    /**
     * Appends the slider to the DOM underneath the given target
     * @param {selector} Either a D3 object or a string selector to locate the DOM element to insert into. Must be an SVG element, or child of an SVG element
     * @return {object} The slider for method chaining
     */
    slider.appendTo = function (target) {

        // calculate the appropriate tick values
        var range = maximumValue - minimumValue,
            ticks = [minimumValue,
                     stepValue(minimumValue + range*0.25),
                     stepValue(minimumValue + range*0.5),
                     stepValue(minimumValue + range*0.75),
                     maximumValue];


        // Convert the target into a valid D3 selection
        // that we can append to
        target = d3.select(target);

        // If width was not specified, use the width of the target
        if (width === undefined) width = target.node().getBoundingClientRect().width
        // If height was not specified, use the height of the target
        if (height === undefined) height = target.node().getBoundingClientRect().height

        var innerWidth = Math.max(0, width - margin.left - margin.right)
        var innerHeight = Math.max(0, height - margin.top - margin.bottom)

        // Set the scale for the x-axis and restrict it to the given values
        xScale = d3.scale.linear()
                   .domain([minimumValue, maximumValue])
                   .range([0, innerWidth])
                   .clamp(true);

        // Setup a brush that covers the given scale, when that brush
        // changes trigger the brushed function
        brush = d3.svg.brush()
            .x(xScale)
            .extent([0, 0])
            .on("brush", brushed);

        // Create the svg element
        var svg = target.append("svg")
            .attr("class", "slider " + cssClass)
            .attr("width", width)
            .attr("height", height);

        // Create the bars used to represent a slider
        var sliderBarGroup = svg.append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"),
            sliderBg = sliderBarGroup
                .append("rect")
                    .attr("class", "bg-bar")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", xScale(maximumValue))
                    .attr("height", innerHeight),
            sliderBar = sliderBarGroup
                .append("rect")
                    .attr("class", "fill-bar")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 0)
                    .attr("height", innerHeight);
        var scale = svg.append("g")
                .attr("class", "scale")
                .attr("transform", "translate(" + margin.left + ", " + (height - margin.bottom) + ")")
                .call(d3.svg.axis()
                    .scale(xScale)
                    .tickSize(0)
                    .tickValues(ticks)
                    .tickFormat(d3.format('.2s'))); // ensure that end ticks are not displayed

        // Create the slider group
        var slide = svg.append("g")
            .attr("class", "slider " + cssClass)
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .call(brush);

        // Create the slider handle
        var handle = slide.append("rect")
            .attr("class", "handle")
            .attr("height", innerHeight)
            .style("cursor", "ew-resize")
            .attr("width", handleWidth);

        function valTween() {
            var valError = value - valActual;
            if (Math.abs(valError) < 1e-3) {
                valActual = value;
                return true;
            }
            else valActual += valError * valAlpha;
            // Move the slider handle to the correct location
            handle.attr("x", xScale(valActual));

            // Move the filled bar to the slider location by modifying the width
            sliderBar.attr("width", xScale(valActual));
            return false;
        }

        // Extend the update function to do some extra interesting things
        _update = function (val) {

            value = stepValue(val);

            // Update the brush position
            brush.extent([val, val]);

            d3.timer(valTween);
            sliderBar.attr("data-bind", "value: " + xScale(value))
        };

        // Update to the initial value
        _update(value);

        return slider;
    };

    slider.prototype = Object.prototype; // set prototype inheritance
    return slider;
};

module.exports = sliderControl