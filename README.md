# UI Components using Module.js

Define auto-discoverable HTML UI components.

## Usage

Load `module.js`, `module-component.js` and `jquery.js`.

```html
<script src="jquery.js"></script>
<script src="module.js"></script>
<script src="module-component.js"></script>
```

Boot your application.

```javascript
$(function(){
  Module.run("MyApp.Application");
});
```

Create your application and initialize the components discovery.

```javascript
Module("MyApp.Application", function(Application){
  Application.fn.initialize = function() {
    Component.setup(document.body, MyApp.UI);
  };
});
```

The components must be defined within the `MyApp.UI` namespace. You can call `Component.setup` several times using different namespaces.

Now, let's create a simple component which displays the current time.

```javascript
Module("MyApp.UI.Clock", function(Clock){
  Clock.fn.initialize = function(container, dataset) {
    // The container object is always passed when
    // initializing the component.
    this.container = container;

    // All data attributes are returned as the dataset.
    // This will use the jQuery.fn.data function, which
    // means that some serialization is performed.
    this.dataset = dataset;
  };

  // The `setup` function is called when initializing the component.
  Clock.fn.setup = function() {
    var date = new Date();
    var format = this.pad(date.getHours()) + ":" + this.pad(date.getMinutes());

    this.container.text(format);
  };
});
```

Now, you can define your HTML. Just create a element with the attribute `data-component` or `data-components`. They do the same thing: define which components must be applied to your element.

```html
<div data-component="clock"></div>
```

Notice that the component's name is lowercased dash/underscore-separated. So, you can define names like `hello`, `hello-there` or `hello_there`.

Now, just reload the page and you're done! The current hour must be displayed! You can check this and other examples on the [examples directory](https://github.com/fnando/module-component/tree/master/examples).

## Maintainer

- Nando Vieira - <http://nandovieira.com.br>

## Contributing

Once you've made your great commits:

1. [Fork](http://help.github.com/forking/) module-component
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. [Create an Issue](http://github.com/fnando/module-component/issues) with a link to your branch
5. That's it!

Please respect the indentation rules and code style.
And use 2 spaces, not tabs. And don't touch the versioning thing.

## Running tests

Just open the file `test/tests.html` in your target browser.

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
