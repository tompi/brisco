(function($) {

    var Pair = Backbone.Model.extend({
        pairNo: -1,
        nameNE: null,
        nameSW: null
    });

    var Pairs = Backbone.Collection.extend({
        initialize: function(models, options) {
            this.bind("add", options.view.renderPair);
        }
    });

    var pairsTableTemplate = Handlebars.compile($('#pairsTableTemplate').html());

    var AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function() {
            this.pairs = new Pairs([
                    {
                        pairNo: 1,
                        nameNE: "John Forrester",
                        nameSW: "Aylene Joleen"
                    },
                    {
                        pairNo: 2,
                        nameNE: "Wayne Schmayne",
                        nameSW: "Wolum Holum"
                    }
                ], {
                view: this
            });
            this.render(this.pairs);
        },
        events: {
            "click #add-pair": "addPair"
        },
        addPair: function() {
            var pair = new Pair({
                pairNo: $('#pairNo').val(),
                nameNE: $('#nameNE').val(),
                nameSW: $('#nameSW').val()
            });
            this.pairs.add(pair);
            this.render(this.pairs);
        },
        render: function(model) {
            $("#pairsTable tbody").html(pairsTableTemplate(model.toJSON()));
            return this;
        }
    });
    var appview = new AppView;

})(jQuery);