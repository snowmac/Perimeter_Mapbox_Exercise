# Mapbox Exercise (Senior)

## Goal

Create a React web app with mapping functionality using Mapbox, focused on the creation/manipulation of polygons. 

## Frontend

* Should be able to view and move around map
* Should be able to add a minimum of 3 points on the map to create a polygon. example image below
* Should be able to save this polygon, and input a name for it in a form
* Should have button to clear all points during creation/editing
* Should be able to edit previously created polygon, being able to move/adjust polygon anchor points 
* change the name that was given to the polygon on creation

## Backend

* Implement a Node.JS backend (using a framework like AdonisJs or similar is acceptable)
* Expose REST APIs (Bonus points for GraphQL)
* Implement some database interfaces
* Save and Retrieve data from a database of your choice (Bonus points for Postgres)
* Implement a unit test framework and write at least one test

### Implement the following APIs:
* Should validate polygon being saved
* Add ability to save created polygon info
* Should return list of all created polygons to be viewed on Frontend

## Bonus
* Implement Redis caching
* Implement seed database and cache strategy
* Add e2e tests to confirm polygon create/edit/delete flow is working