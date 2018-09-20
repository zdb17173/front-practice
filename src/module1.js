import _ from 'lodash'

function component1() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack','fran'], ' ');
    cosnole.error('I get called from print.js!');
    return element;
}

document.body.appendChild(component1());