# html2coffeecup

A web application that takes html and coverts into coffeecup

[http://html2coffeecup.nodejitsu.com](http://html2coffeecup.nodejitsu.com)

## Requirements

* [NodeJs](http://nodejs.org)
* [Flatiron](http://flatiron.com)
* [CoffeeScript](http://coffeescript.org)
* [CoffeeCup](http://coffeecup-docs.nodejitsu.com/)
* [html2coffeekup](http://github.com/brandonbloom/html2coffeekup)

## Run

``` sh
npm start
```
## CoffeeCup

``` coffeescript
page = ->
  doctype 5
  html ->
    head -> title 'html2coffeecup'
    body ->
      script type: 'text/javascript', src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      coffeescript ->
        $ ->
          $('form').submit (e) ->
            e.preventDefault()
            html = $('textarea[name=html]').text()
            $.post '/', $(this).serialize(), (data) ->
              console.log data
              $('textarea[name=coffeecup]').text data
            false
      div '.container', ->
        h1 'HTML2CoffeeCup'
        h3 'Convert your HTML to CoffeeCup'
        a href: 'https://github.com/twilson63/html2coffeecup', 'View Source on Github'
        form method: 'POST', action: '/', ->
          p ->
            label "html"
            br()
            textarea name: 'html', style: 'height:100px;width:90%', -> @html
          hr()
          p ->
            label "coffeecup"
            br()
            textarea name: 'coffeecup', style: 'height:100px;width:90%', -> @coffeecup
          p -> 
            button 'Convert'

```

## Flatiron

``` coffeescript
app = flatiron.app
app.use flatiron.plugins.http
app.router.post '/', ->
  @res.writeHead 200, 'Content-Type': 'text/html'
  coffeecup = convert @req.body.html, @res, prefix: '', (err) =>
    console.log err if err?
  @res.end()
app.router.get '/', ->
  @res.writeHead 200, 'Content-Type': 'text/html'
  @res.end coffeecup.render(page, html: '', coffeecup: '')
app.start process.env.VMC_APP_PORT or 3000

```

## License

See LICENSE
