/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 1
*/
//IIFE - Imediately Invoked Function Expression
(function(){
    function start()
    {
        console.log('App started....');
    }

    window.addEventListener("load",start);
})();
/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2
*/
(function(){
    function start()
    {
        console.log('App started....');
        let deleteButtons = document.querySelectorAll('.btn-danger');
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) =>{
                if(!confirm('Are you sure ?'))
                {
                    event.preventDefault();
                    window.location.assign('/businesscontacts');
                }

            });
        }
    }

    window.addEventListener("load",start);
})();