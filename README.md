GouvCamp Mobile
===============

GouvCamp mobile is an OpenSource [Appcelerator Titanium Mobile](www.appcelerator.com) application built by the guys at [JoliCode](http://jolicode.com/) in the occasion of the [first French GouvCamp](parlement-et-citoyens.fr) which will be held on tuesday, April 10th 2012.


Install and run
---------------

The project has been tested along with Titanium 1.8.2. Just grab the source:

    $ https://github.com/jolicode/GouvCamp-mobile

and import it in Titanium Studio. The application runs smoothly on both iOs and Android.


Architecture concepts
---------------------

The application tries to do the best use of the [CommonJS module pattern](http://www.commonjs.org/), and is divided in three layers - controllers, views and models. It has a dependancy to the ORM [joli.js](https://github.com/xavierlacot/joli.js).

The application fetches several json webservice endpoints, particularly the one of EventBrite, through a proxy called joli.api.js, which uses a local database as a caching engine.

We believe some developers could find interesting ideas in the code, so don't hesitate to go on and look at the source!


Demonstration
-------------

Would you like to test it, the application is available in both stores:

*   Google Play: https://play.google.com/store/apps/details?id=com.jolicode.gouvcamp2012
*   Apple Store: Application currently in review (aka. "we are crossing fingers")



**Share the love!**