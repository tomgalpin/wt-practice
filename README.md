# Tom's Name Game

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Tom's Angular Practice

## Overview

This is a practice [AngularJS][angularjs] (version "1.5.11") application.

# Goals:
- Ingest WT API and create Name Memorization Games
- Set parsed API data to localstorage to avoid bloat of call.
- Set scoring to localstorage to persist between browser sessions.
- Make responsive (more-or-less).
- Write Unit tests (FAIL!)
- Write End-to-End tests (FAIL!).

# Notes:
- Angular structure was adopted from: [yo angular generator](https://github.com/yeoman/generator-angular)

# Areas of improvement:
1. Write tests (always)
    + Still learning to regularly encorporate tests/have a long way to improve.
    + In other words, admittedly I'm still a rookie here.
    + I ended up moving on from my tests, as I was running out of time and energy to push.  :(
2. Refactor:
    + Functions do one thing.
    + Abstract out GET request to a model/factory.
    + Create a view for each for each 'module': navbar, scoring bar, name game, reverse game
    + Create controllers for each view
    + Take logic out of template and put in views and/or directives
    + Create Angualr directives for HTML manipulation (e.g. strike throughs).
    + Clean up CSS

# Structure:
```

wt-practice/
    .sass-cache/                --> Scafolding/Sass stuff
    .tmp/                       --> temp folder
    app/                        -->
        images/                     --> My favicon
        scripts/                    --> main.js and main controller
            controllers/                --> where I wrote most of my JS
        styles/                     --> written styles
        views (and such)            --> main view(s)
    bower_components/           --> bower stuff
    dist/                       --> not sure what this is
    node/                       --> node stuff
    test/                       --> where I should write my tests (but didn't)



app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> native Angular Stuff
  view/                --> the view template and logic
    view.html            --> the partial template
    view.js              --> the controller logic
    view_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests that don't work yet.

```
