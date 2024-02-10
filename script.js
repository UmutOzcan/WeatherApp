let weather = {
  apiKey: "API KEY GOES HERE",

  // fetch weather with city parameter
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey +
        "&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  // Display weather with data
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";

    // hide ersult when loading
    document.querySelector(".weather").classList.remove("loading");

    // change background image according to search
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },

  //search event
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// search button click listener
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// search Enter key listener
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// start with Istanbul
weather.fetchWeather("Istanbul");