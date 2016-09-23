// Using an object literal for a jQuery feature
var posteos = (function() {

	var postList = [];
	var id = 0;

	function IsValidImageUrl(url, callback) {
	    var s = document.createElement("IMG");
	    s.src = url;
	    s.onerror = function(){
	  		callback(false);
	    }
	    s.onload = function(){
	        callback(true);
	    }
	}


	return {		
	    init: function() {
	    	$('.modal-trigger').leanModal();
	    	
	    	$('#posting').click(function() {
	    		posteos.crearPost();
	    	});

	    	$('#grillaLista').click(function() {
	    		posteos.grillaLista();
	    	});

	    	$('#posts').on('click', '.favear', function(event) {
	    		event.preventDefault();
	    		posteos.favear($(this).attr('id'));		
	    	});
	    },

	   crearPost: function() {
	        var posteo = {};
	        id++;
			posteo.id = id;
			posteo.fav = false;

			$(":input").each(function() {
	    		posteo[$(this).attr("name")] = $(this).val();
			});

			IsValidImageUrl(posteo.imagen, function(response){
				if (!response) {
					posteo.imagen = 'images/no-image-available.png';
				}
				postList.push(posteo);
				posteos.renderPost(postList.length - 1);
			});
		
	    },

	    renderPost: function(id){

	    	var largeHtml = "<div><div class='card large'><div class='card-image'><img src='"+ postList[id].imagen + "'><span class='card-title'>" + postList[id].titulo + "</span></div><div class='card-content'><p>" + postList[id].texto + "</p></div><div class='card-action'><p class='col s6'>" + postList[id].descripcion + "</p><p class='right-align'><a id='favID-" + id + "' class='favear' href='#'><i class='material-icons'>star</i></a></p></div></div></div>";

	    	var e = $( document.createElement('div') );
	    	var gridOrList = $( "div#posts" ).find('div').attr('class') || "col s6 offset-s3"; 
	    	e.attr('id', 'postID-' + id);
	    	e.attr('class', gridOrList);
	    	e.append(largeHtml);

	    	$( "#posts" ).prepend( e );
	    },

	    favear: function(element) {
	    	var separados = element.split('-');
			var id = separados[1];
			
			postList[id].fav = !postList[id].fav;
			posteos.renderFav(element);
	    },

	    renderFav: function(element) {
	  
	    	$('#' + element).children('i').toggleClass('indigo');
	    },

	    grillaLista: function() {
	  		var el = $('#posts').children('div');	
	    	el.toggleClass('s6 offset-s3');
	    	el.toggleClass('s3');
	    },

	    postList: postList
	}
})();
 
$( document ).ready( posteos.init );