/*
** Wrapper for whatever logging system we use.
*/

logger = function ( level, ...msg ) {
  console.log( level.toUpperCase() + ":", ...msg );
}
