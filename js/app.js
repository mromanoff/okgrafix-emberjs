App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_VERSION: true,
    debugMode: true
});

App.Router.map(function () {
    this.resource('overview', {path: '/'});
    this.resource('photography');
    this.resource('photo', {path: 'photography/:photo_id'});
    this.resource('work');
    this.resource('workPage', {path: 'work/:work_id'});
    this.resource('contact');
});

App.PhotographyRoute = Ember.Route.extend({
    model: function () {
        return App.FiveHundredPx.findAll();
    }
});

App.PhotoRoute = Ember.Route.extend({
    model: function (params) {
        console.info('photo route', params);
        return App.FiveHundredPx.findOne(params);
    }
});


App.FiveHundredPx = Ember.Object.extend({
    imageMini: function () {
        return this.get('image_url')[0];
    }.property('image_url'),

    imageSmall: function () {
        return this.get('image_url')[1];
    }.property('image_url'),

    imageMedium: function () {
        return this.get('image_url')[2];
    }.property('image_url'),

    imageLarge: function () {
        return this.get('image_url')[3];
    }.property('image_url'),

    imageExtraLarge: function () {
        return this.get('image_url')[4];
    }.property('image_url')
});

App.FiveHundredPx.reopenClass({
    findAll: function () {
        var links = [];
        var url = 'https://api.500px.com/v1/photos?feature=user&user_id=678550&sort=votes_count&rpp=100&image_size[]=1&image_size[]=2&image_size[]=3&image_size[]=4&include_store=store_download&include_states=voted&consumer_key=vRemLRvbgOrkPsJhzeoGdSNHiuC22aZ4TgwgXQXK';
        $.getJSON(url).then(function (response) {
            response.photos.forEach(function (photo) {
                links.pushObject(App.FiveHundredPx.create(photo));
            });
        });
        return links;
    },

    findOne: function (params) {
        var photo = [];
        var url = 'https://api.500px.com/v1/photos/' + params.photo_id + '?image_size=3&comments=1&consumer_key=vRemLRvbgOrkPsJhzeoGdSNHiuC22aZ4TgwgXQXK';

        $.getJSON(url).then(function (response) {
            console.log('response photo', response.photo);
            photo.pushObject(App.FiveHundredPx.create(response.photo));

        });
        return photo;
    }
});


App.ContactController = Ember.ObjectController.extend({
    pageTitle: 'Contact'
});


App.WorkAdapter = DS.FixtureAdapter.extend();

App.Work = DS.Model.extend({
    "visible": DS.attr(),
    "category": DS.attr(),
    "name": DS.attr(),
    "url": DS.attr(),
    "image": DS.attr(),
    "description": DS.attr(),
    "information": DS.attr(),
    "client": DS.attr()
});

App.WorkRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('work');
    }
});

App.WorkController = Ember.ObjectController.extend({
    pageTitle: 'Work'
});

//App.WorkPageRoute = Ember.Route.extend({
//    model: function (work_id) {
//        return this.store.find('work', work_id);
//        //return work.findBy('id', item_id);
//    }
//});

App.WorkPageController = Ember.ObjectController.extend({
    pageTitle: 'Work'
});


Ember.Handlebars.helper('format-date', function (date) {
    return moment(date).fromNow();
});


Ember.Handlebars.helper('image-link', function(model, options) {
    var category = Handlebars.Utils.escapeExpression(model.get('category'));
    var image = Handlebars.Utils.escapeExpression(model.get('image'));
    var name = Handlebars.Utils.escapeExpression(model.get('name'));
    return new Ember.Handlebars.SafeString('<img class="" src="img/' + category + '/medium/'+ image +'" alt="' + name + '">');
});


/// FIXTURES
App.Work.FIXTURES = [
    {
        "id": 1,
        "visible": true,
        "category": "work",
        "name": "J2FIT",
        "url": "http://j2fit.com",
        "image": "j2fit.jpg",
        "description": "J2Fit (Journey To Fitness) is a team of expert fitness professionals who specialize in providing coaching in strength training, conditioning and nutrition. They required a responsive site as well as custom photography that could be accessible from multiple devices to advertise their varied health services.",
        "information": "Photography, Web Development, Wordpress, Bootstrap, LESS, CSS, HTML5, JavaScript, jQuery, Responsive Design",
        "client": [
            {
                "name": "J2FIT",
                "url": "http://j2fit.com"

            }
        ]
    },
    {
        "id": 2,
        "visible": true,
        "category": "work",
        "name": "Blink Fitness",
        "url": "http://blinkfitness.com/",
        "image": "blinkfitness.jpg",
        "description": "Blink Fitness is a leader in affordable fitness. Blink offers the cleanest, friendliest gyms you can find, this makes blink stand out in a crowd. Their website was built to fit the brand image and reach a large demographic of mobile users. In addition to the marketing site, Blink web presence includes a member portal and in club kiosks.",
        "information": "Senior Front End Developer, .NET, CSS, CSS3, LESS, Bootstrap, HTML5, JavaScript, jQuery, Responsive Design",
        "client": [
            {
                "name": "BlinkFitness by Equinox",
                "url": "http://blinkfitness.com"
            }
        ]
    },
    {
        "id": 3,
        "visible": true,
        "category": "work",
        "name": "Equinox",
        "url": "http://equinox.com/",
        "image": "equinox.jpg",
        "description": "Equinox - It's not Fitness. It's Life. For over 20 years, Equinox fitness clubs have provided an unparalleled member experience, setting new standards from personal training to group fitness to rejuvenating wellness treatments. The results are extraordinary. Tour the clubs and experience what ESPN calls \"the best gym in America.\" Featuring innovative group fitness classes, luxurious spas, exclusive boutiques and nourishing cafes, Equinox clubs provide members with an inviting and exhilarating fitness experience.",
        "information": "Senior Front End Developer, .NET, CSS, CSS3, SASS, HTML5, JavaScript, jQuery, Backbone JS",
        "client": [
            {
                "name": "Equinox",
                "url": "http://equinox.com"
            }
        ]
    },
    {
        "id": 4,
        "visible": true,
        "category": "work",
        "name": "QBlog by Equinox",
        "url": "http://q.equinox.com/",
        "image": "qblog.jpg",
        "description": "Q is Equinox’s editorial site that was created to change the conversation on fitness and wellness by presenting it in an elevated way. It was key for Equinox to have Q content delivered to fit all devices, our recent redesign included a complete responsive overhaul so that content can be delivered legibly and increase subscriptions.",
        "information": "Senior Front End Developer, .NET, CSS, CSS3, SASS, Bootstrap 3, HTML5, JavaScript, jQuery, Responsive Design",
        "client": [
            {
                "name": "QBlog by Equinox",
                "url": "http://q.equinox.com"
            }
        ]
    },

    {
        "id": 6,
        "visible": true,
        "category": "work",
        "name": "New York Color",
        "url": "http://newyorkcolor.com/",
        "image": "new_york_color.jpg",
        "description": "New York Color is highly popular discount beauty brand targeted towards teens and young adults. The New York Color website showcases the offerings of the brand's beauty products that can be found at most drug stores and major retailers. Other content includes a store locator, tips, tutorials, inspiration articles, press exposure, and promotions. Visitors are also able to request samples/communications from the company.",
        "information": "Drupal 6, CSS, CSS3, HTML5, JavaScript, jQuery, Modernizr, JW Player",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rapp.com"
            }
        ]
    },
    {
        "id": 7,
        "visible": true,
        "category": "work",
        "name": "Playboy Fragrances",
        "url": "http://www.playboyfragrances.com/",
        "image": "playboy_fragrances.jpg",
        "description": "This interactive website showcases the various offerings of the brand's \"For Him\" and \"For Her\" line of fragrances. The site houses photo galleries, editorial content, virtual tours, interviews, quizzes, and a history of the magazine. Playboy Fragrances also allows users to set up their own personal profiles with The Seduction Club. Here users can interact with the site in order to gain points and unlock goodies.",
        "information": "Drupal 6, CSS, CSS3, HTML5, JavaScript, jQuery, Modernizr, JW Player",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },
    {
        "id": 8,
        "visible": true,
        "category": "work",
        "name": "Halle Berry Fragrances",
        "url": "http://halleberryfragrances.com/",
        "image": "halle_berry.jpg",
        "description": "The concept behind the Halle Berry fragrance line is that each woman has many facets and Halle Berry has a scent for each. There are three parts to the site, one per fragrance, “Reveal”, “Pure Orchid” and “Halle”. As the user rolls over each scent they are directed to page that displays how the scent came to be, media and a view of the collection.",
        "information": "Drupal 6, CSS, CSS3, HTML5, JavaScript, jQuery, Modernizr, JW Player",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },

    {
        "id": 9,
        "visible": true,
        "category": "work",
        "name": "Astor Cosmetics",
        "url": "http://astorcosmetics.com/",
        "image": "astor.jpg",
        "description": "Astor is a well known European cosmetic brand focused on enhancing a woman’s natural beauty. The Astor Cosmetics site showcases the various product lines from skin care and makeup to nail care. Users can sign in to create a basic profile where they save items that sparked their interest. The site also features makeup news, tips and tutorials with behind the scenes footage of Artistic Advisor and fashion icon Heidi Klum.",
        "information": "Drupal 6, CSS, CSS3, HTML5, JavaScript, jQuery, Modernizr, JW Player",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },

    {
        "id": 10,
        "visible": true,
        "category": "work",
        "name": "Guess Parfums",
        "url": "http://guessparfums.com/",
        "image": "guess_seductive.jpg",
        "description": "Home of the GUESS fragrance brand, this interactive site showcases the product line, promotions, features a store locator and asks users to join in on the conversation. The site features three unforgettable women with their love stories from the perspective of their lovers. GUESS asks users, “Are you a legend in the making?” prompting them to share their stories on Facebook.",
        "information": "Drupal 6, CSS, CSS3, HTML5, JavaScript, jQuery, Modernizr, JW Player",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },

    {
        "id": 11,
        "visible": true,
        "category": "work",
        "name": "Sally Hansen",
        "url": "http://www.sallyhansen.com/",
        "image": "sally_hansen.jpg",
        "description": "They’ve come a long way from being just the master of nail care, today Sally Hansen is an all encompassing beauty brand that specializes in everything from makeup and hair removal to, of course, nail care. This site showcases the extensive product lines as well as featuring tutorials, quizzes and advice. The highlight of the site is an interactive nail product selector that helps you to determine the perfect look and product recommendation for you.",
        "information": "Drupal 6, CSS, CSS3, HTML5, JavaScript, jQuery, Modernizr, JW Player",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },

    {
        "id": 12,
        "visible": true,
        "category": "work",
        "name": "Project Focus",
        "url": "http://www2.witness.org/project-focus/?q=project-focus/",
        "image": "witness.jpg",
        "description": "WITNESS uses video to open the eyes of the world to human rights violations. This interactive online experience was built in conjunction with a charity drive to help gain donations. The user is welcomed by a blurry video and a voice over, a button Appears asking them to “open their eyes”, as the user clicks, the video becomes clearer. At the end, they are asked to “Help change the picture, click to donate.” The drive was highly successful, a substantial amount of money was raised. As a result of the press that came from the online experience, there was also an increase in both new membership and existing membership participation.",
        "information": "HTML5, CSS3, JavaScript, jQuery, PHP, JWPlayer",
        "client": [
            {
                "name": "COTY",
                "url": "http://www.coty.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },

    {
        "id": 13,
        "visible": true,
        "category": "work",
        "name": "resident",
        "url": "http://www.weareresident.com/",
        "image": "weareresident.jpg",
        "description": "This site showcases the New York based creative studio’s digital portfolio with clients that include Coldplay, Candies, Crest, Heineken, Jeep, Kanye West, Samsung, Time Warner Cable and more with easy access to contact information and a list of offerings. The site is clean and simple with fast loading expandable videos that display the studio’s various talents and showreel.",
        "information": "Design, Flash, Action Script 2, HTML, CSS, PHP",
        "client": [
            {
                "name": "resident",
                "url": "http://www.weareresident.com"
            }
        ]
    },

    {
        "id": 14,
        "visible": true,
        "category": "work",
        "name": "Master Card Marketing Center",
        "url": false,
        "image": "mastercard.jpg",
        "imageUrl": "img/work/medium/mastercard.jpg",
        "description": "This is a worldwide Intranet system for MasterCard executives and top-level employees. Here they are free to explore and order MasterCard brand items to gift to valued customers. The site also features consumer insights and training materials.",
        "information": "HTML, CSS, Photoshop, JavaScript, jQuery",
        "client": [
            {
                "name": "RGA",
                "url": false
            }
        ]
    },

    {
        "id": 15,
        "visible": true,
        "category": "work",
        "name": "myalli",
        "url": "http://www.myalli.com",
        "image": "myalli.jpg",
        "description": "My Alli is a weight loss supplement paired with a 24-week motivational program that includes check-in’s with a motivational online community and support system, interactive tools, success stories and product information. The My Alli site has been nominated for The 14th Annual Webby Awards in the Pharmaceuticals category. The Webby Awards is the leading international award honoring excellence on the Internet. The Webby Awards are presented by The International Academy of Digital Arts and Sciences. For more information and the full list of Nominees and Honorees, visit http://www.webbyawards.com.",
        "information": "HTML, CSS, JavaScript, jQuery, Ajax, Pluck 4, .NET, Photoshop",
        "client": [
            {
                "name": "GlaxoSmithKline",
                "url": "http://www.gsk.com"
            },
            {
                "name": "RAPP",
                "url": "http://www.rApp.com"
            }
        ]
    },

    {
        "id": 16,
        "visible": false,
        "category": "work",
        "name": "The City Style",
        "projectUrl": false,
        "image": "the_city_style.jpg",
        "description": "The City Style was a high-end online shoe retailer where users can register, make purchases, sign up for a weekly mailing list and become eligible for exclusive sales and discounts.",
        "information": "Design, HTML, CSS, JavaScript, jQuery, Ajax, PHP, Magento E-commerce, Photoshop",
        "client": false
    },

    {
        "id": 17,
        "visible": false,
        "category": "work",
        "name": "Aloft Hotels",
        "url": "http://www.starwoodhotels.com/alofthotels/",
        "image": false,
        "description": "Aloft Hotels is a member of the Starwood Hotels and Resorts family. A self-described ‘Style at a Steal for the traveler open to possibilities’, Aloft gives you the freedom to control and customize your travel adventure to fit your personal style. This site delivers information about the hotel, their various locations, a booking feature and offers a section dedicated towards social networking and generating buzz.",
        "information": "HTML, CSS, JavaScript, Struts, Tiles, JSP, JSTL, Photoshop",
        "client": [
            {
                "name": "STARWOOD HOTELS",
                "url": "http://www.starwoodhotels.com"
            }
        ]
    },

    {
        "id": 18,
        "visible": false,
        "category": "work",
        "name": "W Hotels",
        "url": "http://www.starwoodhotels.com/whotels/index.html",
        "image": false,
        "description": "W Hotels is a design-led lifestyle brand and the hotel category buster with 37 hotels and retreats in the most vibrant cities and exotic destinations around the world. This site was designed to bring all that W Hotels has to offer in one easy to use, consumer friendly package. Users can explore and book rooms at any destination, view special offers, shop and book events.",
        "information": "HTML, CSS, JavaScript, Struts, Tiles, JSP, JSTL, Photoshop",
        "client": [
            {
                "name": "STARWOOD HOTELS",
                "url": "http://www.starwoodhotels.com"
            }
        ]
    },

    {
        "id": 19,
        "visible": false,
        "category": "work",
        "name": "Sheraton Hotels and Resorts",
        "url": "http://www.starwoodhotels.com/sheraton/index.html",
        "image": false,
        "description": "Another member of the Starwood Hotels and Resorts family, this site was designed give easy access to information, photo galleries, neighborhood details, booking options, and vacation ideas at a glance.",
        "information": "HTML, CSS, JavaScript, Struts, Tiles, JSP, JSTL, Photoshop",
        "client": [
            {
                "name": "STARWOOD HOTELS",
                "url": "http://www.starwoodhotels.com"
            }
        ]
    }

];