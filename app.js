var app, coffeecup, convert, filed, flatiron, page;

require('coffee-script');

coffeecup = require('coffeecup');

convert = require('html2coffeekup').convert;

filed = require('filed');

flatiron = require('flatiron');

page = function() {
  doctype(5);
  return html(function() {
    head(function() {
      title('html2coffeecup');
      meta({
        name: 'description',
        content: 'Convert html 2 coffeekup or coffeecup'
      });
      meta({
        name: 'keywords',
        content: 'coffeescript, coffeecup, coffeekup, html2coffee, html2coffeekup, html2coffeecup'
      });
      meta({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/base.css'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/skeleton.css'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/layout.css'
      });
      return comment('[if lt IE 9]>\r\n\t<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>\r\n<![endif]');
    });
    return body(function() {
      script({
        type: 'text/javascript',
        src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      });
      coffeescript(function() {
        return $(function() {
          return $('form').submit(function(e) {
            var html;
            e.preventDefault();
            html = $('textarea[name=html]').text();
            $.post('/', $(this).serialize(), function(data) {
              console.log(data);
              return $('textarea[name=coffeecup]').text(data);
            });
            return false;
          });
        });
      });
      return div('.container', function() {
        h1('html2CoffeeCup');
        div({
          style: 'float:right'
        }, function() {
          a('.twitter-share-button', {
            href: 'https://twitter.com/share',
            'data-url': 'http://html2coffeecup.cloudfoundry.com',
            'data-text': '@twilson63 when I get to use #coffeecup, I prefer #html2coffeekup #coffeescript'
          }, 'Tweet');
          script('!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");');
          br();
          a('.twitter-follow-button', {
            href: 'https://twitter.com/twilson63',
            'data-show-count': 'false'
          }, 'Follow @twilson63');
          return script('!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");');
        });
        small('Convert your HTML to CoffeeCup');
        form({
          method: 'POST',
          action: '/'
        }, function() {
          p(function() {
            return textarea({
              name: 'html',
              placeholder: '< insert your html here >',
              style: 'height:150px;width:98%'
            }, function() {
              return this.html;
            });
          });
          p(function() {
            return button({
              style: 'width: 100%'
            }, '<-- CONVERT -->');
          });
          return p(function() {
            return textarea({
              name: 'coffeecup',
              placeholder: '< press [convert] and see your coffeecup >',
              style: 'height:150px;width:98%'
            }, function() {
              return this.coffeecup;
            });
          });
        });
        return div({
          style: 'text-align:center'
        }, function() {
          return a({
            href: 'https://github.com/twilson63/html2coffeecup'
          }, 'View Source on Github');
        });
      });
    });
  });
};

app = flatiron.app;

app.use(flatiron.plugins.http);

app.router.post('/', function() {
  var _this = this;
  this.res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  coffeecup = convert(this.req.body.html, this.res, {
    prefix: ''
  }, function(err) {
    if (err != null) return console.log(err);
  });
  return this.res.end();
});

app.router.get('/', function() {
  this.res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  return this.res.end(coffeecup.render(page, {
    html: '',
    coffeecup: ''
  }));
});

app.router.get('/stylesheets/:css', function(css) {
  return filed("./public/stylesheets/" + css).pipe(this.res);
});

app.start(process.env.VMC_APP_PORT || 3000);
