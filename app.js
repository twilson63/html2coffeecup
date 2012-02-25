var app, coffeecup, convert, flatiron, page;

require('coffee-script');

coffeecup = require('coffeecup');

convert = require('html2coffeekup').convert;

flatiron = require('flatiron');

page = function() {
  doctype(5);
  return html(function() {
    head(function() {
      return title('html2coffeecup');
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
        h1('HTML2CoffeeCup');
        h3('Convert your HTML to CoffeeCup');
        return form({
          method: 'POST',
          action: '/'
        }, function() {
          p(function() {
            label("html");
            br();
            return textarea({
              name: 'html',
              style: 'height:100px;width:90%'
            }, function() {
              return this.html;
            });
          });
          hr();
          p(function() {
            label("coffeecup");
            br();
            return textarea({
              name: 'coffeecup',
              style: 'height:100px;width:90%'
            }, function() {
              return this.coffeecup;
            });
          });
          return p(function() {
            return button('Convert');
          });
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

app.start(3000);
