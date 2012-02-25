require 'coffee-script'
coffeecup = require 'coffeecup'
{ convert } = require 'html2coffeekup'
filed = require 'filed'

flatiron = require 'flatiron'

page = ->
  doctype 5
  html ->
    head -> 
      title 'html2coffeecup'
      meta name: 'description', content: 'Convert html 2 coffeekup or coffeecup'
      meta name: 'keywords', content: 'coffeescript, coffeecup, coffeekup, html2coffee, html2coffeekup, html2coffeecup'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'
      link rel: 'stylesheet', href: '/stylesheets/base.css'
      link rel: 'stylesheet', href: '/stylesheets/skeleton.css'
      link rel: 'stylesheet', href: '/stylesheets/layout.css'
      comment '[if lt IE 9]>\r\n\t<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>\r\n<![endif]'
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
        h1 'html2CoffeeCup'
        div style: 'float:right', ->
          a '.twitter-share-button', href: 'https://twitter.com/share', 'data-url': 'http://html2coffeecup.cloudfoundry.com', 'data-text': '@twilson63 when I get to use #coffeecup, I prefer #html2coffeekup #coffeescript', 'Tweet'
          script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
          br()
          a '.twitter-follow-button', href: 'https://twitter.com/twilson63', 'data-show-count': 'false', 'Follow @twilson63'
          script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
          
        small 'Convert your HTML to CoffeeCup'
        form method: 'POST', action: '/', ->
          p ->
            textarea name: 'html', placeholder: '< insert your html here >', style: 'height:150px;width:98%', -> @html
          p -> 
            button style: 'width: 100%', '<-- CONVERT -->'
          p ->
            textarea name: 'coffeecup', placeholder: '< press [convert] and see your coffeecup >', style: 'height:150px;width:98%', -> @coffeecup

        div style: 'text-align:center', ->
          a href: 'https://github.com/twilson63/html2coffeecup', 'View Source on Github'

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

app.router.get '/stylesheets/:css', (css) ->
  filed("./public/stylesheets/#{css}").pipe(@res)
app.start process.env.VMC_APP_PORT or 3000
