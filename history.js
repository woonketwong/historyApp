$( document ).ready( function(){
	var contentEl = $( '#content' ),
		photoEl = $( '#photo' ),
		linkEls = $( 'a' ),
		cats = {
			fluffy: {
				content: 'Fluffy!',
				photo: 'http://placekitten.com/200/200'
			},
			socks: {
				content: 'Socks!',
				photo: 'http://placekitten.com/280/280'
			},
			whiskers: {
				content: 'Whiskers!',
				photo: 'http://placekitten.com/350/350'
			},
			bob: {
				content: 'Just Bob.',
				photo: 'http://placekitten.com/320/270'
			}
		};

	function updateContent( data ) {
		if ( data == null )
			return;

		contentEl.text( data.content );
		photoEl.attr( 'src', data.photo );
	}

	function clickHandler( event ) {
		event.preventDefault();

		var cat = $( event.target ).attr( 'href' ).split( '/' ).pop(),
			data = cats[ cat ] || null;

		updateContent( data );

		// Add an item to the history log
		history.pushState( data, event.target.textContent, event.target.href );
	}

	// Attach event listeners
	for ( var i = 0, l = linkEls.length; i < l; i++ ) {
		$( linkEls[ i ] ).on( 'click', clickHandler );
	}

	// Revert to a previously saved state
	$( window ).on( 'popstate', function( event ) {
		updateContent( event.originalEvent.state );
	});

	// Initial state
	history.replaceState({
		content: contentEl.text(),
		photo: photoEl.attr( 'src' ),
	}, document.title, document.location.href );
});
