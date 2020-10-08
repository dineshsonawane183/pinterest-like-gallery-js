(function () {
    'use strict';
    function init() {
        var dataFeed = [];
        let dataFeedPromsise = fetchDataFeed();
        dataFeedPromsise.then((data) => {
            dataFeed = data;
            //sort Data By View Count
            dataFeed.sort(function (a, b) { return a.viewCount - b.viewCount });
            generateLayout(dataFeed);
        });
        dataFeedPromsise.catch(function (error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }
    function loadFeed(dataFeed, startIndex) {
        var latestIndex = startIndex;
        for (var i = startIndex; i < dataFeed.length; i++) {
            let path = dataFeed[i].path;
            let innerHtml = `<div onclick="window.open('//pinkvilla.com${path}')">` +
                "<img src='" + dataFeed[i].imageUrl + "'>" +
                "<div class='content'><h2>" + dataFeed[i].title + "</h2></div></div>"
            var div = document.createElement("div");
            div.setAttribute("class", "grid-item");
            div.innerHTML = innerHtml;
            var listElm = document.querySelector('.grid');
            listElm.appendChild(div);
            latestIndex = startIndex;

        }
    }

    function generateLayout(dataFeed) {
        var startIndex = 0;
        // Initially load some items.
        loadFeed(dataFeed, startIndex);
        var colc = new Colcade('.grid', {
            columns: '.grid-col',
            items: '.grid-item'
        });

    }
    function fetchDataFeed() {
        var cdnFeedUrl = "https://content.xynie.com/feed/fashion-section.json";
        return fetch(cdnFeedUrl)
            .then(response => response.json())
    }
    init();
})();