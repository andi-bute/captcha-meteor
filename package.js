Package.describe({
  summary: "VisualCaptcha better integrated with meteor"
});

Npm.depends({
  "visualcaptcha" : "0.0.2"
})

Package.on_use(function (api, where) {
  //api.use('server');
  api.use(['deps','underscore', 'templating',
           'handlebars', 'spark', 'session', 'jquery'], 'client');
  api.use('iron-router','server')
  api.add_files('lib/index.js', 'server');
  api.add_files('client/visualcaptcha.jquery.js', 'client');
  api.add_files('client/captcha.css', 'client');
  api.add_files('client/captcha.html', 'client');
  api.add_files('client/captcha.js', 'client');
  api.add_files('images/img/refresh.png');
  api.add_files('images/img/refresh@2x.png');
  api.add_files('images/img/accessibility.png');
  api.add_files('images/img/accessibility@2x.png');
  api.add_files('server/captcha.js', 'server');
  api.export(['VisualCaptcha'], 'server');
  
});
