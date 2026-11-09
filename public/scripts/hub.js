// @ts-check
// "Comment ça marche": the central hub (`[data-hub]`). Port of
// the app repository's static/landing-flux.js, same behaviour.
//
// The three zones run on ONE active example at a time, looping 1 → 2 → 3 → 4.
// For example i: its question lights up; a dot carries it to the hub; term i of
// the hub lights up; the dot goes on to answer i, which stays lit a few
// seconds; everything dims, then the next example.
//
// One requestAnimationFrame loop drives the steps. Off screen it pauses where
// it is and resumes on return. Link paths are recomputed from the real card
// positions on every resize.
//
// Loaded WITHOUT `defer`, in <head>, on purpose: the dimmed state only exists
// under `html[data-flux]`, and setting that attribute before first paint keeps
// the hub from showing fully lit then dimming. Without JavaScript, without
// IntersectionObserver, or under `prefers-reduced-motion`, the attribute is
// never set: everything stays visible, with no animation.
//
// No copy here: every visible text lives in the page. No SVG element is
// created: the script only sets the `d` of paths already in the markup.
(function () {
  "use strict";

  /** Step durations, in milliseconds. */
  var DURATIONS = {
    lightUp: 600,
    travel: 1000,
    pause: 800,
    hold: 2500,
    fadeOut: 700,
  };
  // A clock jump (background tab) must not skip steps.
  var MAX_STEP_MS = 64;

  var root = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /**
   * @typedef {{ element: Element, play: () => void, pause: () => void, stop: () => void }} Hub
   * @typedef {{ duration: number, start: () => void, path?: SVGPathElement }} Step
   * @typedef {{ left: number, right: number, top: number, bottom: number, midX: number, midY: number }} Box
   */

  /** @type {Hub[]} */
  var hubs = [];

  /** @param {number} x */
  function ease(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  /** @param {number} n */
  function round(n) {
    return Math.round(n * 10) / 10;
  }

  /**
   * @param {Element} hub
   * @returns {Hub | null}
   */
  function createHub(hub) {
    var links = hub.querySelector(".hub-links");
    var dot = links ? links.querySelector(".hub-dot") : null;
    var core = hub.querySelector(".hub-core");
    if (!(links instanceof SVGSVGElement) || !(dot instanceof SVGCircleElement) || !core) {
      return null;
    }
    var svgDot = dot;
    var coreElement = core;
    var sideBySide = window.matchMedia("(min-width: 1024px)");
    var count = hub.querySelectorAll(".hub-card--in").length;

    /**
     * @param {string} selector
     * @param {number} example
     * @returns {Element}
     */
    function one(selector, example) {
      var found = hub.querySelector(selector + '[data-example="' + example + '"]');
      if (!found) {
        throw new Error("hub: missing " + selector + " " + example);
      }
      return found;
    }

    /**
     * @param {string} selector
     * @param {number} example
     * @returns {SVGPathElement}
     */
    function path(selector, example) {
      var found = one(selector, example);
      if (!(found instanceof SVGPathElement)) {
        throw new Error("hub: not a path " + selector);
      }
      return found;
    }

    /**
     * @param {Element} element
     * @returns {Box}
     */
    function box(element) {
      var base = hub.getBoundingClientRect();
      var r = element.getBoundingClientRect();
      return {
        left: r.left - base.left,
        right: r.right - base.left,
        top: r.top - base.top,
        bottom: r.bottom - base.top,
        midX: r.left - base.left + r.width / 2,
        midY: r.top - base.top + r.height / 2,
      };
    }

    function draw() {
      var c = box(coreElement);
      var gutter = Infinity;
      var cards = hub.querySelectorAll(".hub-card");
      for (var k = 0; k < cards.length; k++) {
        var card = cards[k];
        if (card) {
          gutter = Math.min(gutter, box(card).left);
        }
      }
      gutter = round(gutter - 12);

      for (var i = 1; i <= count; i++) {
        var input = box(one(".hub-card--in", i));
        var output = box(one(".hub-card--out", i));
        var term = box(one(".hub-term", i));
        var dIn;
        var dOut;

        if (sideBySide.matches) {
          // Side by side: a curve from the card to the hub term, then from the
          // term to the answer. It reaches the height of the term it lights.
          var e = (c.left - input.right) / 2;
          dIn = "M" + round(input.right) + " " + round(input.midY) +
            " C" + round(input.right + e) + " " + round(input.midY) +
            " " + round(c.left - e) + " " + round(term.midY) +
            " " + round(c.left) + " " + round(term.midY);
          var s = (output.left - c.right) / 2;
          dOut = "M" + round(c.right) + " " + round(term.midY) +
            " C" + round(c.right + s) + " " + round(term.midY) +
            " " + round(output.left - s) + " " + round(output.midY) +
            " " + round(output.left) + " " + round(output.midY);
        } else {
          // Stacked: through the left gutter, so no card is crossed.
          dIn = "M" + round(input.left) + " " + round(input.midY) +
            " H" + gutter + " V" + round(c.top - 16) +
            " H" + round(c.midX) + " V" + round(c.top);
          dOut = "M" + round(c.midX) + " " + round(c.bottom) +
            " V" + round(c.bottom + 16) + " H" + gutter +
            " V" + round(output.midY) + " H" + round(output.left);
        }
        path('.hub-line[data-leg="in"]', i).setAttribute("d", dIn);
        path('.hub-line[data-leg="out"]', i).setAttribute("d", dOut);
      }
    }

    function dimAll() {
      var active = hub.querySelectorAll("[data-active]");
      for (var k = 0; k < active.length; k++) {
        var element = active[k];
        if (element) {
          element.removeAttribute("data-active");
        }
      }
      svgDot.style.opacity = "0";
    }

    // The full sequence: six steps per example, for every example.
    /** @type {Step[]} */
    var steps = [];
    for (var i = 1; i <= count; i++) {
      (function (n) {
        var lineIn = path('.hub-line[data-leg="in"]', n);
        var lineOut = path('.hub-line[data-leg="out"]', n);
        steps.push({
          duration: DURATIONS.lightUp,
          start: function () {
            dimAll();
            one(".hub-card--in", n).setAttribute("data-active", "");
          },
        });
        steps.push({
          duration: DURATIONS.travel,
          path: lineIn,
          start: function () {
            lineIn.setAttribute("data-active", "");
          },
        });
        steps.push({
          duration: DURATIONS.pause,
          start: function () {
            svgDot.style.opacity = "0";
            one(".hub-term", n).setAttribute("data-active", "");
          },
        });
        steps.push({
          duration: DURATIONS.travel,
          path: lineOut,
          start: function () {
            lineOut.setAttribute("data-active", "");
          },
        });
        steps.push({
          duration: DURATIONS.hold,
          start: function () {
            svgDot.style.opacity = "0";
            one(".hub-card--out", n).setAttribute("data-active", "");
          },
        });
        steps.push({ duration: DURATIONS.fadeOut, start: dimAll });
      })(i);
    }
    if (steps.length === 0) {
      return null;
    }

    var index = 0;
    var elapsed = 0;
    var started = false;
    var running = false;
    /** @type {number | null} */
    var previous = null;
    /** @type {number | null} */
    var frame = null;

    /**
     * @param {SVGPathElement} line
     * @param {number} progress
     */
    function placeDot(line, progress) {
      var length = line.getTotalLength();
      var point = line.getPointAtLength(length * ease(progress));
      svgDot.setAttribute("cx", String(round(point.x)));
      svgDot.setAttribute("cy", String(round(point.y)));
      svgDot.style.opacity = "1";
    }

    /** @param {Step | undefined} step */
    function must(step) {
      if (!step) {
        throw new Error("hub: no step");
      }
      return step;
    }

    /** @param {number} timestamp */
    function tick(timestamp) {
      if (!running) {
        return;
      }
      if (previous !== null) {
        elapsed += Math.min(timestamp - previous, MAX_STEP_MS);
      }
      previous = timestamp;

      var current = must(steps[index]);
      while (elapsed >= current.duration) {
        elapsed -= current.duration;
        index = (index + 1) % steps.length;
        current = must(steps[index]);
        current.start();
      }
      if (current.path) {
        placeDot(current.path, elapsed / current.duration);
      }
      frame = window.requestAnimationFrame(tick);
    }

    /** @type {ResizeObserver | null} */
    var resizeObserver = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(draw);
      resizeObserver.observe(hub);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(draw);
    }
    draw();

    function pause() {
      running = false;
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    return {
      element: hub,
      play: function () {
        if (running) {
          return;
        }
        if (!started) {
          started = true;
          must(steps[0]).start();
        }
        running = true;
        previous = null;
        frame = window.requestAnimationFrame(tick);
      },
      pause: pause,
      stop: function () {
        pause();
        if (resizeObserver !== null) {
          resizeObserver.disconnect();
        }
        dimAll();
      },
    };
  }

  /** @type {IntersectionObserver | null} */
  var observer = null;

  function start() {
    // `[data-hub]`, NOT `[data-flux]`: that one is on <html> to enable the
    // animation, and selecting it would create a second engine on the whole
    // page that never pauses.
    var elements = document.querySelectorAll("[data-hub]");
    hubs = [];
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var hub = element ? createHub(element) : null;
      if (hub) {
        hubs.push(hub);
      }
    }
    observer = new IntersectionObserver(
      function (entries) {
        for (var k = 0; k < entries.length; k++) {
          var entry = entries[k];
          for (var h = 0; h < hubs.length; h++) {
            var hub = hubs[h];
            if (entry && hub && hub.element === entry.target) {
              if (entry.isIntersecting) {
                hub.play();
              } else {
                hub.pause();
              }
            }
          }
        }
      },
      { threshold: 0.2 }
    );
    for (var j = 0; j < hubs.length; j++) {
      var item = hubs[j];
      if (item) {
        observer.observe(item.element);
      }
    }
  }

  function stopAll() {
    if (observer !== null) {
      observer.disconnect();
      observer = null;
    }
    for (var i = 0; i < hubs.length; i++) {
      var hub = hubs[i];
      if (hub) {
        hub.stop();
      }
    }
    hubs = [];
  }

  function apply() {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      root.removeAttribute("data-flux");
      stopAll();
      return;
    }
    root.setAttribute("data-flux", "");
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    } else if (observer === null) {
      start();
    }
  }

  apply();
  // The preference can change with the page open: the hub follows, no reload.
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener("change", apply);
  }
})();
