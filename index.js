var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
  res.render('index');
});

// Testing:
require('quick.db').set('haroongames', {
  name: "▂ ▅ ▇ HaroonGames ▇ ▅ ▂",
  description: "Hi, welcome to ▂ ▅ ▇ HaroonGames ▇ ▅ ▂!\n\nThis is a server made by HaroonGames on YouTube. It's pretty lonely so it would be nice if you joined!\nThis server also doubles up as the support server of EcoBOT! It's a discord bot that does economy, leveling, and more!\n\nSo why don't you join?",
  invite: "xfG3nyS"
})

// invite codes
app.get('/:vanityCode', function(req, res) {
  var serverinfo = require('quick.db').get(req.params.vanityCode)
  if (!serverinfo) {
    return res.end('Error: This vanity code does not exist.')
  }
  var html = `
  <meta property="og:title" content="You have been invited to a server" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://discord.com/invite/${serverinfo.invite}" />
  <meta property="og:image" content="${serverinfo.image}" />
  <meta property="og:description" content="${serverinfo.name}\n\n${serverinfo.description}" />
  <meta name="theme-color" content="#${serverinfo.color}">

  <!-- Include this to make the og:image larger -->
  <meta name="twitter:card" content="summary_large_image">

  <script>
    window.onload = () => window.location.replace("https://discord.com/invite/${serverinfo.invite}");
  </script>
  `

  res.writeHead(200, {"Content-Type": "text/html"})
  res.end(html)
});

app.get('/addserver', function(req, res) {
  res.render('addserver')
})

app.listen(8080);