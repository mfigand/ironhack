// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$('.ctrl-tournaments.actn-index').ready(tournamentsIndex)

$('.ctrl-tournaments.actn-index').on('click', '[data-hook~=tourney-delete]', deleteTournament)
$('.ctrl-tournaments.actn-index').on('click', '[data-add~=tourney-add]', addPlayer)
$('[data-hook~=tourney-add]').on('click', showTournamentForm)
$('[data-hook~=tourney-form]').on('submit', createTournament)
