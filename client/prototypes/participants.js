$(function() {
    var Pair = Backbone.Model.extend({
        pairNo: -1,
        nameNE: null,
        nameSW: null,
        clear: function() {
            this.destroy();
        }
    });

    var PairList = Backbone.Collection.extend({
        model: Pair
    });

    var Pairs = new PairList();

    var RowView = Backbone.View.extend({
        tagName: 'tr',
        template: Handlebars.compile($('#pairsTableTemplate').html()),
        events: {
            "click .edit": "edit",
            "click .delete": "clear"
        },
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },
        render: function(model) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        edit: function() {
            var editor = new EditorView({
                model: this.model
            });
            editor.render();
            $('#pairEditor').html(editor.render().el).modal('show').on("shown", function() {
                $('#nameNE').focus();
            });
        },
        clear: function() {
            this.model.clear();
        }
    });

    var EditorView = Backbone.View.extend({
        template: Handlebars.compile($('#editPairsTemplate').html()),
        events: {
            "click #save-pair": "save",
            "keypress": "updateOnEnter"
        },
        initialize: function() {},
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            $('#pairEditor').html(this.el).modal('show').on("shown", function() {
                $('#nameNE').focus();
            });
            return this;
        },
        save: function() {
            var isNew = !(this.model.get('pairNo'));
            this.model.set('pairNo', $('#pairNo').val());
            this.model.set('nameNE', $('#nameNE').val());
            this.model.set('nameSW', $('#nameSW').val());
            if (isNew) Pairs.add(this.model);
            $('#pairEditor').modal('hide');
            return false;
        },
        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.save();
        }
    });

    var AppView = Backbone.View.extend({
        el: $("#pairListApp"),
        initialize: function() {
            Pairs.bind('add', this.addOne, this);
            Pairs.bind('reset', this.addAll, this);
            Pairs.bind('all', this.render, this);

            Pairs.add({
                pairNo: 1,
                nameNE: "John Forrester",
                nameSW: "Aylene Joleen"
            });
            Pairs.add({
                pairNo: 2,
                nameNE: "Wayne Schmayne",
                nameSW: "Wolum Holum"
            });
        },
        events: {
            "click #add-pair": "addPair",
            "keypress": "shortCuts"
        },
        addOne: function(pair) {
            var view = new RowView({
                model: pair
            });
            this.$("#pairsTableBody").append(view.render().el);
        },
        addAll: function() {
            Pairs.each(this.addOne);
        },
        addPair: function() {
            var editor = new EditorView({
                model: new Pair()
            });
            editor.render();
        },
        shortCuts: function(e) {
            //alert(e.keyCode);
            //if (e.keyCode == 13) this.save();
        }
    });
    var appview = new AppView;
});
