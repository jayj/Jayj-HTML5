<?php

/**
 * Contact form PHP
 * Credits: http://dev-tips.com/featured/ajax-and-php-contact-form
 */

// If the form have been submitted and the spam check field is empty
if ( isset( $_POST['name'] ) && empty( $_POST['s_check'] ) ) :

	// Enter your email
	$mail = 'name@example.com';

	// Declare our $errors variable we will be using later to store any errors.
	$errors = array();

	$name = strip_tags( utf8_decode( $_POST['name'] ) );
	$emailfrom = strip_tags( $_POST['email'] );
	$subject = strip_tags( utf8_decode( $_POST['subject'] ) );
	$message = strip_tags( utf8_decode( $_POST['message'] ) ); // Use uft8_decode to make special characters æ, ø, å, ü and é work

	// We'll check and see if any of the required fields are empty.
	// We use an array to store the required fields.
	$required = array( 'Email' => 'email', 'Message' => 'message' );

	// Set a default subject
	if ( empty( $subject ) )
		$subject = 'Default subject';

	// Set a default name
	if ( empty( $name ) )
		$name = 'Anonymous person';

	// Loops through each required $_POST value
	// Checks to ensure it is not empty.
	foreach ( $required as $key => $value ) {
		if ( isset( $_POST[$value] ) && $_POST[$value] !== '' )
			continue;
		else
			$errors[] = $key . ' cannot be left blank';
	}

	// Make sure the email is valid.
    if ( !filter_var( $emailfrom, FILTER_VALIDATE_EMAIL ) )
           $errors[] = 'Email address is invalid';

	// Now check to see if there are any errors
	if ( empty( $errors ) ) {

		// No errors, send mail using conditional to ensure it was sent.
		if ( mail( $mail, "$subject", $message, "From: $emailfrom" ) )
			echo '<p class="success">Your email has been sent</p>';
		else
			echo '<p class="error">There was a problem sending your email. Please try again</p>';

	} else {

		// Errors were found, output all errors to the user.
		echo '<p class="error">';
			echo implode( '<br />', $errors );
		echo '</p>';

	}

else :

	// The user have tried to access thid page directly or this a spambot
	echo "You're not allowed to access this page directly";

endif;
