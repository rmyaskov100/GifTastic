$(document).ready(function() {
    //Array for searched gifs
    var topics = [];
    
        //Function with AJAX call to GIPHY; Q parameter for API link set to search term for 10 results limit
      //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
         function displayGifs() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=YVNMtQUSEGQib7c6sSsNZ6jERbJDOJvV&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var r = 0; r < results.length; r++) {
                
                var showDiv = $("<div class='col-md-4'>");
    
                var rating = results[r].rating;
                var defaultAnimatedSrc = results[r].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("actorsGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);
    
            }
        });
    }
    
      //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#addGifs").on("click", function(event) {
            event.preventDefault();
            var newActor = $("#giphyInput").val().trim();
            topics.push(newActor);
            console.log(topics);
            $("#giphyInput").val('');
            displayButtons();
          });
    
      //Function iterates through topics array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#myButtons").empty();
        for (var r = 0; r < topics.length; r++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "show");
          a.attr("data-search", topics[r]);
          a.text(topics[r]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      //Click event for button with id of "show" executes displayActors function
      $(document).on("click", "#show", displayActors);
    
      //Click event for gifs with class of "actorsGiphy" initiates pausePlayGifs function
      $(document).on("click", ".actorsGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });
    