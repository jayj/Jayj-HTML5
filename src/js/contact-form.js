( function( $ ) {

    /**
     * Send AJAX request to the server when
     * the contact form is submitted.
     */
    $( '.contact-form' ).submit( function(e) {

        var form = $( this ),
            response  = form.find( '.contact-response' );

        // Hide any previous response text
        response.hide();

        response.html( 'Loading...' ).show();

        // Make the AJAX request
        $.post( 'sendmail.php',

            // Form data
            form.serialize(),

            // Response from the server
            function( data ) {
                response.html( data );
            }

        );

        // Prevent page refresh on submit
        e.preventDefault();
    });

} )( jQuery );
