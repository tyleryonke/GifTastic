// Initial array of TV shows
	var tvShows = ['Atlanta', 'Always Sunny', '30 Rock', 'Veep', 'Silicon Valley', 'Parks and Recreation', 'Curb Your Enthusiasm'];

	// function for generating gifs

	function renderShowGifs(){
		
		// required information for API call

        var clickedShow = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedShow + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

            	//store response in a variable

                var results = response.data;

                //delete any previously generated gifs

                $('#gifsView').empty();

                //generate 10 gifs

                for (var i = 0; i < results.length; i++) {

                    var showDiv = $('<div>');

                    showDiv.addClass('gifZone');

                    var p = $('<p>').text('Rating: ' + results[i].rating);

                    var showImage = $("<img data-state='still'>");

                    showImage.addClass('showGif');

                    //set paused and active states for each gif

                    showImage.data('still', results[i].images.fixed_height_still.url);

                    showImage.data('animate', results[i].images.fixed_height.url);

                    showImage.attr('src', results[i].images.fixed_height_still.url);

                    showDiv.append(p);

                    showDiv.append(showImage);

                    $('#gifsView').prepend(showDiv);

                }

                //function to alternate between paused and active states of clicked gif

                $('.showGif').on('click', function(){

        			var state = $(this).attr('data-state');

        			if ( state == 'still'){
            			$(this).attr('src', $(this).data('animate'));
        			    $(this).attr('data-state', 'animate');
      			  	}
       			 	else{
       			       $(this).attr('src', $(this).data('still'));
     			       $(this).attr('data-state', 'still');
   			        }
			    });

            });
   
	}

	// ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Delete all buttons before adding new button from input
		$('#buttonsView').empty();

		// Loop through array
		for (var i = 0; i < tvShows.length; i++){

			// Generate a button for each show in the array

		    var a = $('<button>') // Create the button
		    a.addClass('tvShow'); // Add a class 
		    a.attr('data-name', tvShows[i]); // Add a data-attribute
		    a.text(tvShows[i]); // Provide the button text
		    $('#buttonsView').append(a); // Add the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addShow').on('click', function(){

		// Grab the input from the textbox
		var show = $('#show-input').val().trim();

		// Add movie from the textbox to array
		tvShows.push(show);
		
		// Run button generating function
		renderButtons();
		return false;
	})


	// Listener to generate Gifs when button is clicked
	$(document).on('click', '.tvShow', renderShowGifs);


	// Run button generating function with initial array
	renderButtons();