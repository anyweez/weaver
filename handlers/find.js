/* jslint node: true, esnext: true */
module.exports = (function () {
    var vocabulary = [{
            term: 'Abraham Lincoln',
            id: 0
        }, {
            term: 'Bacon',
            id: 1
        }
    ];

    return {
        init: function () {
            // TODO: load vocabulary from an external file somewhere.
        },
        route: '/find/:term',
        // Handler function.
        func: function* (term) {
            this.set('Content-type', 'text/json');
            this.body = JSON.stringify(vocabulary.filter(function (item) {
                return (item.term.toLowerCase().indexOf(term.toLowerCase()) >= 0);
            }));
        },
    };
}());