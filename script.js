const apiKey="26cd02655e5022d9b9b8cca4b6f61b8a"; 
async function getWeather(){
	const city=document.getElementById("cityInput").value;
	const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	try{
		const response=await fetch (url);
		if(!response.ok)throw new Error("City not found");
		const data=await response.json();
		displayWeather(data);

	}
	catch(error){
		document.getElementById("weatherResult").innerHTML=`<p>${error.message}</p>`;
	}
}

async function getWeatherByLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(async (position)=>{
			const lat=position.coords.latitude;
			const lon=position.coords.longitude;
			const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
			try{
				const response=await fetch(url);
				if(!response.ok)throw new Error("Location not Found");
				const data=await response.json();
				displayWeather(data);

			}
			catch(error){
				document.getElementById("weatherResult").innerHTML=`<p>${error.message}</p>`;
			}
		},  (error)=>{
			document.getElementById("weatherResult").innerHTML=`<p>Location access denied.</p>`;

		
		});
	} else{
		document.getElementById("weatherResult").innerHTML=`<p>Geolocation not supported.</p>`;
	}
	}
	function displayWeather(data){
		const iconCode=data.weather[0].icon;
		const iconUrl=`http://openweathermap.org/img/wn/${iconCode}@2x.png`;
		const weatherHTML=`
		<h2>${data.name},${data.sys.country}</h2>
		<img class ="weather-icon" src="${iconUrl}" alt="Weather icon">
		<p><strong>Temperature:</strong> ${data.main.temp} °C</p>
		<p><strong>Weather:</strong> ${data.weather[0].main}</p>
		<p><strong>Humidity:</strong> ${data.main.humidity} %</p>
		<p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
		`;
		document.getElementById("weatherResult").innerHTML=weatherHTML;
	}
