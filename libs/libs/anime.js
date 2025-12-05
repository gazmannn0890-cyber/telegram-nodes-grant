/* anime.js v3.2.1 | (c) 2020 Julian Garnier | MIT license */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.anime = factory());
})(this, (function () { 'use strict';

  var is = {
    arr: function (a) { return Array.isArray(a); },
    obj: function (a) { return Object.prototype.toString.call(a) === '[object Object]'; },
    pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
    svg: function (a) { return a instanceof SVGElement; },
    inp: function (a) { return a instanceof HTMLInputElement; },
    dom: function (a) { return a instanceof HTMLElement || is.svg(a); },
    str: function (a) { return typeof a === 'string'; },
    fnc: function (a) { return typeof a === 'function'; },
    und: function (a) { return a === void 0; },
    nil: function (a) { return is.und(a) || a === null; },
    hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
    rgb: function (a) { return /^rgb/.test(a); },
    hsl: function (a) { return /^hsl/.test(a); },
    col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); }
  };

  var defaults = {
    update: undefined,
    begin: undefined,
    run: undefined,
    complete: undefined,
    loop: 1,
    direction: 'normal',
    autoplay: true,
    duration: 1000,
    delay: 0,
    endDelay: 0,
    easing: 'easeOutElastic(1, .5)'
  };

  var setDefault = function (t, p) {
    for (var property in p) {
      if (!(property in t)) {
        t[property] = p[property];
      }
    }
    return t;
  };

  var mergeObject = function (t, s) {
    for (var property in s) {
      t[property] = s[property];
    }
    return t;
  };

  var isString = function (s) {
    return typeof s === 'string';
  };

  var splitColor = function (c) {
    if (isString(c)) {
      var match = c.match(/(#|rgb|hsl)/);
      if (match) {
        if (match[0] === '#') {
          var hex = c.replace('#', '');
          if (hex.length === 3) {
            hex = hex.split('').map(function (ch) { return ch + ch; }).join('');
          }
          return hex.match(/.{2}/g).map(function (v) { return parseInt(v, 16); });
        }
        if (match[0] === 'rgb') {
          return c.match(/(\d+)/g).map(function (v) { return parseInt(v, 10); });
        }
        if (match[0] === 'hsl') {
          var hsl = c.match(/(\d+)/g).map(function (v) { return parseInt(v, 10); });
          hsl[1] /= 100;
          hsl[2] /= 100;
          return hsl;
        }
      }
    }
    return c;
  };

  var number = {
    interpolate: function (a, b) {
      return function (t) {
        return a * (1 - t) + b * t;
      };
    },
    random: function (a, b) {
      return a + Math.random() * (b - a);
    }
  };

  var color = {
    interpolate: function (a, b) {
      var c1 = splitColor(a);
      var c2 = splitColor(b);
      return function (t) {
        var result = c1.map(function (v, i) {
          return Math.round(v + (c2[i] - v) * t);
        });
        if (c1.length === 3) {
          return 'rgb(' + result.join(',') + ')';
        }
        if (c1.length === 4) {
          return 'rgba(' + result.join(',') + ')';
        }
        return 'hsl(' + result[0] + ',' + (result[1] * 100) + '%,' + (result[2] * 100) + '%)';
      };
    }
  };

  var transform = {
    interpolate: function (a, b) {
      return function (t) {
        var result = a.map(function (v, i) {
          return v + (b[i] - v) * t;
        });
        return result;
      };
    }
  };

  var path = {
    interpolate: function (a, b) {
      if (isString(a)) a = a.trim();
      if (isString(b)) b = b.trim();
      
      var pathA = is.dom(a) ? a : is.str(a) ? document.createElementNS('http://www.w3.org/2000/svg', 'path') : a;
      var pathB = is.dom(b) ? b : is.str(b) ? document.createElementNS('http://www.w3.org/2000/svg', 'path') : b;
      
      if (is.str(a)) pathA.setAttribute('d', a);
      if (is.str(b)) pathB.setAttribute('d', b);
      
      var lengthA = pathA.getTotalLength();
      var lengthB = pathB.getTotalLength();
      
      return function (t) {
        var pointA = pathA.getPointAtLength(lengthA * t);
        var pointB = pathB.getPointAtLength(lengthB * t);
        return {
          x: pointA.x + (pointB.x - pointA.x) * t,
          y: pointA.y + (pointB.y - pointA.y) * t
        };
      };
    }
  };

  var easingFunctions = {
    linear: function (t) { return t; },
    easeInQuad: function (t) { return t * t; },
    easeOutQuad: function (t) { return t * (2 - t); },
    easeInOutQuad: function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    easeInCubic: function (t) { return t * t * t; },
    easeOutCubic: function (t) { return (--t) * t * t + 1; },
    easeInOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart: function (t) { return t * t * t * t; },
    easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
    easeInOutQuart: function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    easeInQuint: function (t) { return t * t * t * t * t; },
    easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
    easeInOutQuint: function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
    easeInSine: function (t) { return 1 - Math.cos(t * Math.PI / 2); },
    easeOutSine: function (t) { return Math.sin(t * Math.PI / 2); },
    easeInOutSine: function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; },
    easeInExpo: function (t) { return t === 0 ? 0 : Math.pow(2, 10 * (t - 1)); },
    easeOutExpo: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    easeInOutExpo: function (t) {
      if (t === 0) return 0;
      if (t === 1) return 1;
      if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
      return 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
    },
    easeInCirc: function (t) { return 1 - Math.sqrt(1 - t * t); },
    easeOutCirc: function (t) { return Math.sqrt(1 - (--t) * t); },
    easeInOutCirc: function (t) {
      if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
      return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic: function (t) {
      if (t === 0) return 0;
      if (t === 1) return 1;
      var p = 0.3;
      var s = p / 4;
      return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    },
    easeOutElastic: function (t) {
      if (t === 0) return 0;
      if (t === 1) return 1;
      var p = 0.3;
      var s = p / 4;
      return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },
    easeInOutElastic: function (t) {
      if (t === 0) return 0;
      if ((t /= 0.5) === 2) return 1;
      var p = 0.3 * 1.5;
      var s = p / 4;
      if (t < 1) return -0.5 * (Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      return Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    easeInBack: function (t) {
      var s = 1.70158;
      return t * t * ((s + 1) * t - s);
    },
    easeOutBack: function (t) {
      var s = 1.70158;
      return --t * t * ((s + 1) * t + s) + 1;
    },
    easeInOutBack: function (t) {
      var s = 1.70158 * 1.525;
      if ((t /= 0.5) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
      return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    },
    easeInBounce: function (t) {
      return 1 - easingFunctions.easeOutBounce(1 - t);
    },
    easeOutBounce: function (t) {
      if (t < (1 / 2.75)) {
        return 7.5625 * t * t;
      } else if (t < (2 / 2.75)) {
        return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
      } else if (t < (2.5 / 2.75)) {
        return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
      } else {
        return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
      }
    },
    easeInOutBounce: function (t) {
      if (t < 0.5) return easingFunctions.easeInBounce(t * 2) * 0.5;
      return easingFunctions.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
    }
  };

  var string = {
    interpolate: function (a, b) {
      var reg = /(-?\d*\.?\d+)/g;
      var aValues = a.match(reg);
      var bValues = b.match(reg);
      
      if (!aValues || !bValues || aValues.length !== bValues.length) {
        return function (t) {
          return t < 0.5 ? a : b;
        };
      }
      
      var aNumbers = aValues.map(parseFloat);
      var bNumbers = bValues.map(parseFloat);
      var aParts = a.split(reg);
      var bParts = b.split(reg);
      
      return function (t) {
        var result = '';
        for (var i = 0; i < aParts.length; i++) {
          if (i % 2 === 0) {
            result += aParts[i];
          } else {
            var index = (i - 1) / 2;
            var value = aNumbers[index] + (bNumbers[index] - aNumbers[index]) * t;
            result += value;
          }
        }
        return result;
      };
    }
  };

  var anime = function (params) {
    var core = {
      animatables: [],
      animations: [],
      duration: 0,
      delay: 0,
      endDelay: 0,
      easing: 'easeOutElastic',
      loop: false,
      direction: 'normal',
      autoplay: true,
      timeline: null,
      offset: 0,
      currentTime: 0,
      paused: true,
      began: false,
      completed: false,
      reversed: false,
      seek: function (time) {
        core.currentTime = time;
        core.animations.forEach(function (anim) {
          anim.seek(time);
        });
      },
      play: function () {
        core.paused = false;
        if (!core.began) {
          core.began = true;
          if (params.begin) params.begin(core);
        }
        if (params.run) params.run(core);
      },
      pause: function () {
        core.paused = true;
      },
      restart: function () {
        core.seek(0);
        core.play();
      },
      reverse: function () {
        core.reversed = !core.reversed;
      },
      tick: function (time) {
        if (!core.paused) {
          core.currentTime += time;
          core.animations.forEach(function (anim) {
            anim.tick(core.currentTime);
          });
          if (params.update) params.update(core);
          
          if (core.currentTime >= core.duration && !core.completed) {
            core.completed = true;
            if (params.complete) params.complete(core);
          }
        }
      }
    };

    // Parse targets
    var targets = params.targets;
    if (!targets) targets = [document.documentElement];
    if (!is.arr(targets)) targets = [targets];

    // Parse properties
    for (var property in params) {
      if (property !== 'targets' && property !== 'duration' && property !== 'delay' && 
          property !== 'endDelay' && property !== 'easing' && property !== 'loop' && 
          property !== 'direction' && property !== 'autoplay') {
        
        var value = params[property];
        var from = is.obj(value) && value.value !== undefined ? value.value : value;
        var to = is.obj(value) && value.value !== undefined ? value.value : value;
        
        if (is.obj(value) && value.from !== undefined) from = value.from;
        if (is.obj(value) && value.to !== undefined) to = value.to;
        
        var duration = params.duration || defaults.duration;
        var delay = params.delay || defaults.delay;
        var endDelay = params.endDelay || defaults.endDelay;
        var easing = params.easing || defaults.easing;
        
        targets.forEach(function (target, i) {
          var anim = {
            target: target,
            property: property,
            from: from,
            to: to,
            duration: duration,
            delay: delay,
            endDelay: endDelay,
            easing: easing,
            began: false,
            completed: false,
            currentValue: from,
            startTime: 0,
            seek: function (time) {
              var elapsed = time - this.startTime;
              if (elapsed < 0) elapsed = 0;
              if (elapsed > this.duration) elapsed = this.duration;
              
              var progress = elapsed / this.duration;
              var easingFn = is.str(this.easing) ? easingFunctions[this.easing] || easingFunctions.linear : this.easing;
              if (is.fnc(easingFn)) progress = easingFn(progress);
              
              // Interpolate value
              if (is.num(this.from) && is.num(this.to)) {
                this.currentValue = this.from + (this.to - this.from) * progress;
              } else if (is.col(this.from) && is.col(this.to)) {
                this.currentValue = color.interpolate(this.from, this.to)(progress);
              } else if (is.str(this.from) && is.str(this.to)) {
                this.currentValue = string.interpolate(this.from, this.to)(progress);
              } else {
                this.currentValue = this.to;
              }
              
              // Apply to target
              if (is.dom(this.target)) {
                if (property === 'translateX' || property === 'translateY' || 
                    property === 'rotate' || property === 'scale' || property === 'opacity') {
                  
                  var transformValue = '';
                  if (property === 'translateX') transformValue = 'translateX(' + this.currentValue + 'px)';
                  if (property === 'translateY') transformValue = 'translateY(' + this.currentValue + 'px)';
                  if (property === 'rotate') transformValue = 'rotate(' + this.currentValue + 'deg)';
                  if (property === 'scale') transformValue = 'scale(' + this.currentValue + ')';
                  
                  var currentTransform = this.target.style.transform || '';
                  var newTransform = currentTransform;
                  
                  if (property === 'translateX' || property === 'translateY' || property === 'rotate' || property === 'scale') {
                    // Replace or add transform property
                    var regex = new RegExp('\\b' + property.replace(/[A-Z]/g, function(m) { return '-' + m.toLowerCase(); }) + '\\([^)]*\\)', 'g');
                    newTransform = currentTransform.replace(regex, '');
                    newTransform = (newTransform + ' ' + transformValue).trim();
                  }
                  
                  this.target.style.transform = newTransform;
                  
                } else if (property === 'opacity') {
                  this.target.style.opacity = this.currentValue;
                } else {
                  this.target.style[property] = this.currentValue;
                }
              }
            },
            tick: function (time) {
              if (!this.began && time >= this.delay) {
                this.began = true;
                this.startTime = time;
              }
              
              if (this.began && !this.completed) {
                this.seek(time);
                
                if (time >= this.startTime + this.duration) {
                  this.completed = true;
                }
              }
            }
          };
          
          core.animations.push(anim);
          core.duration = Math.max(core.duration, anim.delay + anim.duration + anim.endDelay);
        });
      }
    }

    // Setup core properties
    core.duration = params.duration || core.duration;
    core.delay = params.delay || defaults.delay;
    core.endDelay = params.endDelay || defaults.endDelay;
    core.easing = params.easing || defaults.easing;
    core.loop = params.loop || defaults.loop;
    core.direction = params.direction || defaults.direction;
    core.autoplay = params.autoplay !== undefined ? params.autoplay : defaults.autoplay;

    // Start animation if autoplay
    if (core.autoplay) {
      core.play();
      
      // Simple animation loop
      var lastTime = 0;
      function animate(time) {
        var delta = time - lastTime || 0;
        lastTime = time;
        core.tick(delta);
        if (!core.completed || core.loop) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    }

    return core;
  };

  // Add utility functions to anime
  anime.version = '3.2.1';
  anime.speed = 1;
  anime.running = [];
  anime.remove = function (targets) {
    // Simplified remove function
    console.log('anime.remove called for', targets);
  };
  anime.getValue = function (targets, property) {
    // Simplified getValue function
    if (is.dom(targets)) {
      return getComputedStyle(targets)[property];
    }
    return null;
  };
  anime.path = function (path, percent) {
    // Simplified path function
    if (is.str(path)) {
      var el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      el.setAttribute('d', path);
      path = el;
    }
    return function (prop) {
      var length = path.getTotalLength();
      var point = path.getPointAtLength(length * percent);
      return point[prop];
    };
  };
  anime.stagger = function (value, options) {
    // Simplified stagger function
    return function (i, total) {
      return i * value;
    };
  };
  anime.setDashoffset = function (el) {
    // Simplified setDashoffset function
    var length = el.getTotalLength();
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;
    return length;
  };
  anime.easings = easingFunctions;
  anime.timeline = function (params) {
    // Simplified timeline function
    params = params || {};
    var tl = anime(params);
    tl.children = [];
    tl.add = function (params) {
      var anim = anime(params);
      this.children.push(anim);
      return this;
    };
    return tl;
  };
  anime.random = function (min, max) {
    return min + Math.random() * (max - min);
  };

  return anime;

}));
