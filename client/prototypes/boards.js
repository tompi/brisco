(function($) {

    var Result = Backbone.Model.extend({
    });

    var ResultList = Backbone.Collection.extend({
        model: Result
    });

    var Results = new ResultList();

    var ResultRowView = Backbone.View.extend({
        tagName: 'tr',
        template: Handlebars.compile($('#resultRowTemplate').html()),
        events: { 
            "click": "edit"
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
            alert("todo: edit");
        },
        clear: function() {
          this.model.clear();
        }
    });     
    
    var Board = Backbone.Model.extend({
    });

    var BoardList = Backbone.Collection.extend({
        model: Board
    });

    var Boards = new BoardList();

    var BoardRowView = Backbone.View.extend({
        tagName: 'li',
        template: Handlebars.compile($('#boardTemplate').html()),
        events: { 
            "click": "showBoard"
        },
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },        
        render: function(model) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        showBoard: function() {
            alert("todo: showBoard");
        },
        clear: function() {
          this.model.clear();
        }
    });        

    var AppView = Backbone.View.extend({
        el: $("#boardsApp"),
        initialize: function() {            
            Results.bind('add', this.addResult, this);
            Results.bind('reset', this.addAllResults, this);
            Results.bind('all', this.render, this);
            Boards.bind('add', this.addBoard, this);
            Boards.bind('reset', this.addAllBoards, this);
            Boards.bind('all', this.render, this);
            Boards.add({boardNo: 1});
            Boards.add({boardNo: 2});
            Results.add(
                    {
                        nsPairNo: 1,
                        ewPairNo: 2,
                        contract: {
                            Level: 4,
                            Suit: briscoGame.Suit.Hearts,
                            Player: briscoGame.Direction.North,
                            Tricks: 11                            
                        },
                        points: 650,
                        result: 1
                    });
            Results.add(
                    {
                        nsPairNo: 3,
                        ewPairNo: 4,
                        contract: {
                            Level: 4,
                            Suit: briscoGame.Suit.Hearts,
                            Player: briscoGame.Direction.North,
                            Tricks: 11                            
                        },
                        points: 650,
                        result: 1
                    });
            Results.add(
                    {
                        nsPairNo: 5,
                        ewPairNo: 6,
                        contract: {
                            Level: 4,
                            Suit: briscoGame.Suit.Hearts,
                            Player: briscoGame.Direction.North,
                            Tricks: 10                            
                        },
                        points: 620,
                        result: -2
                    });                    
        },
        events: {
            "keypress": "shortCuts"
        },
        addResult: function(result) {
          var view = new ResultRowView({model: result});
          this.$("#resultsTableBody").append(view.render().el);
        }, 
        addAllResults: function() {
          Results.each(this.addResult);
        },        
        addBoard: function(board) {
          var view = new BoardRowView({model: board});
          this.$("#boardListAdd").before(view.render().el);
        }, 
        addAllBoards: function() {
          Boards.each(this.addBoard);
        },        
        shortCuts: function(e) {
            //if (e.keyCode == 13) this.save();
        }
    });
    var appview = new AppView;

})(jQuery);