# visualCaptcha for Meteor (new version)

A wrapper package to use visualCaptcha with Meteor


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
			//callback called only on success; if it fails captcha will display a message informing the user why validation has failed
			//do your form parsing, meteor calls, whatever you would normaly have done
		});
	}
```

Styling could use some redoing, anyone wants to pitch in?

Initial release. Will cleanup later.

This work is based on emotionLoop's initial work

