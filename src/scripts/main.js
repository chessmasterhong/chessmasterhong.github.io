require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: '../vendor/jquery/dist/jquery',
        underscore: '../vendor/underscore/underscore',
        backbone: '../vendor/backbone/backbone'
    }
});

require([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    'use strict';

    var Project = Backbone.Model.extend({
        defaults: function() {
            return {
                title: '',
                caption: '',
                thumbnailUrl: '//placehold.it/400x400',
                demoUrl: '#',
                srcUrl: '#'
            };
        }
    });

    var Projects = Backbone.Collection.extend({
        model: Project
    });

    var ProjectList = new Projects();

    var ProjectView = Backbone.View.extend({
        model: new Project(),
        tagName: 'li',
        initialize: function() {
            this.template = _.template($('#project-item-template').html());
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var PortfolioView = Backbone.View.extend({
        model: ProjectList,
        el: $('#portfolio-items'),
        initialize: function() {
            this.render();
        },
        render: function() {
            var self = this;
            self.$el.html('');
            _.each(this.model.toArray(), function(project) {
                self.$el.append(
                    new ProjectView({ model: project }).render().$el
                );
            });
            return this;
        }
    });

    $(document).ready(function() {
        ProjectList.add(new Project({ title: 'Hello', caption: 'World' }));
        ProjectList.add(new Project({ title: 'Foo', caption: 'Bar' }));
        var Portfolio = new PortfolioView();

        $('.portfolio-item').hover(
            function() {
                $(this).find('.item-caption').fadeIn(250);
            },
            function() {
                $(this).find('.item-caption').fadeOut(250);
            }
        );
    });
});
