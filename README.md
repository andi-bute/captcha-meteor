# visualCaptcha Meteor (new version)

A wrapper package to use visualCaptcha with Meteor
Better integrated into meteor


```
mrt add captcha
```

Create any form, and add

```
{{>captcha}}
```

anywhere inside it, then

```
'submit form': function (event) {
		event.preventDefault();
		VisualCaptcha.validateCaptcha(function(){
			//do your form parsing, meteor calls, whatever you would normaly have done
		});
	}
```

This work is based on emotionLoop's initial work

