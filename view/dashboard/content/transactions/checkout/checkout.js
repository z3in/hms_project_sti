$(document).ready(()=>{

    $("#datecheck_out").val(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date()) + ' (today)');

})