function linear(t) {
    return t;
}
function linearReverce(t) {
    return 1 - t;
}
function quad(t, n) {
    return Math.pow(t, n);
}
function easeInOut(t) {
    if (t < 0.5) {
        return 4 * Math.pow(t, 3);
    }
    return 4 * Math.pow(t - 1, 3) + 1;
}

function fadeIn(el, f) {
    el.style.setProperty('opacity', `${f}`);
}
function fadeOut(el, f) {
    el.style.setProperty('opacity', `${1 - f}`);
}
function moveYIn(el, f, delta) {
    el.style.setProperty('transform', `translateY(${(1 - f) * delta}px)`);
    el.style.setProperty('opacity', `${f}`);
}
function moveYOut(el, f, delta) {
    el.style.setProperty('transform', `translateY(${f * delta}px)`);
    el.style.setProperty('opacity', `${1 - f}`);
}

export { easeInOut, fadeIn, fadeOut, linear, linearReverce, moveYIn, moveYOut, quad };
