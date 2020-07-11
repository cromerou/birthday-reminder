
$('.datepicker').datepicker({
    weekStart: 1,
    orientation: 'bottom',
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
    language: 'es'
});
$('.datepicker').datepicker("setDate", new Date());