function getNodes(selector) {
    var nodes = document.querySelectorAll(selector);
    return Array.prototype.slice.call(nodes);
}

function loadSync(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api' + url, false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        alert(xhr.responseText);
    }
}

function loadAsync(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api' + url, true);
    xhr.addEventListener('load', function () {
        alert(xhr.responseText);
    });
    xhr.addEventListener('error', function () {
        alert('Something wrong!');
    });
    xhr.send();
    return xhr;
}

function sendDataViaTag(tagName, query) {
    var tag = document.createElement(tagName);
    tag.src = 'https://www.google.com/?q=' + query;
    document.body.appendChild(tag);
    document.body.removeChild(tag);
    alert('See request in Network tab of Developer Tools');
}

document.addEventListener('DOMContentLoaded', function () {
    // activate example buttons for slide / example toggle
    getNodes('.js-toggle-example').forEach(function (button) {
        var selector = button.getAttribute('data-target');
        var target = document.querySelector(selector);
        if (target) {
            button.addEventListener('click', function () {
                target.classList.toggle('with-example');
            });
        } else {
            console.warning('Element with selector %s not found!', selector);
        }
    });

    // activate example buttons for tag requests
    getNodes('.js-tag-request').forEach(function (button) {
        var tagName = button.getAttribute('data-tag-name');
        var query = button.getAttribute('data-query');

        button.addEventListener('click', function (event) {
            event.preventDefault();
            return sendDataViaTag(tagName, query);
        });
    });
    // activate example buttons for XHR requests
    getNodes('.js-xhr-request').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            var type = button.getAttribute('data-type');
            var url = button.getAttribute('data-url');

            switch (type) {
                case 'sync':
                    return loadSync(url);
                default:
                    return loadAsync(url);
            }
        });
    });
});
