/*
** Wrapper for whatever logging system we use.
*/

Log = new Mongo.Collection("log");

logger = function ( level, ...msg ) {
  console.log( level.toUpperCase() + ":", ...msg );
}
