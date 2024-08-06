# Features explained

The concept of a feature is to encompass all GraphQL into a single location, rather then having a bunch of different directories to get each file and make sure you have what you need to complete a feature, the idea is to pull all things into a collection, aka a feature. Each feature should have a type def and a resolver. However it could expand to including services, DAOs and other things as you need. 

For example suppose you have an email feature, this feature takes user input from the UI, saves to the database then generates an email. There are several steps that this thing can take from saving the email to integrating into the email sender provider. As features grow you tend to stick on more things, services, data layers, logging and much more. Containing all of that into individual components allows you to keep your code more organized and testable. It also allows you to quickly see all the places XYZ query or mutation triggers and results. 

