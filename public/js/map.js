data_actual = [];



function getdata() {
	fetch('http://localhost:3001/map')
	  .then(function (response) {
		return response.text();
	  })
	  .then(function (data) {
		dataUsar = [];
		data_real = JSON.parse(data);
		dataUsar = data_real.data;
		data_actual = dataUsar;
		pintarMapa(dataUsar);
		$(".loading").removeClass("show");
		$(".loading").removeClass("loading");
	  })
	  .catch(function (err) {
		console.error(err);
		$(".loading").removeClass("show");
		$(".loading").removeClass("loading");
	  });

  }


  function pintarMapa(data) {

	for (let i = 1; i <= data.length; i++) {

	  colorcasos = "";
	  provincia = data[i - 1].provincia;
	  infectados = data[i - 1].infectado;
	  muertos = data[i - 1].fallecidos;
	  poblacion = data[i - 1].poblacion;
	  // sin casos
	  if (infectados == 0) {
		colorcasos = "#549E2F";
	  } else {
		if (infectados <= 10) {
		  colorcasos = "#0FA9FF";
		}
		else {
		  if (infectados <= 100) {
			colorcasos = "#f0b915";
			
		  } else {
			if (infectados <= 500) {
			  colorcasos = "#EF4E17";
			} else {
			  if (infectados > 500) {
				colorcasos = "#EF9E18";
			  }

			}
		  }

		}
	  }


	  
	  
	  tippy(`#DO-${i}`, {
		content: ` <center><b>${provincia}</b></center> <br> Infectados: ${infectados} Muertos: ${muertos}`,
		followCursor: true,
		allowHTML: true,
	  });

	  $(`#DO-${i}`).css("fill", colorcasos);
	
	}


  }

  $(".DO").click(function(){

	var provincia=  $(this).attr("title");

	var codigo = $(this).attr("id");

   const id = codigo.split("-");


   var muertos, infectados, poblacion =0;

  var data_real1 = data_real.data;
   
   muertos = data_real1[id[1]-1].fallecidos;
   infectados = data_real1[id[1]-1].infectado;
   poblacion = data_real1[id[1]-1].poblacion;


   if (infectados == 0) {
	colorcasos = "#549E2F";
  } else {
	if (infectados <= 10) {
	  colorcasos = "#0FA9FF";
	}
	else {
	  if (infectados <= 100) {
		colorcasos = "#f0b915";
		
	  } else {
		if (infectados <= 500) {
		  colorcasos = "#EF4E17";
		} else {
		  if (infectados > 500) {
			colorcasos = "#EF9E18";
		  }

		}
	  }

	}
  }

 
   $(".card-header").css("background-color", colorcasos);




   $("#name_province").html(provincia);

  });