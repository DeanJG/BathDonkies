/**  create authentication page
    when they move on from authenitcation page, set display : none

If unique id is contained in rejectArray or favoriteArray, do not display/repeat this restaurant 
When no is clicked: 
    Repeating original call function of generating random place 
    Pushes the current id to a rejectArray 
    Then generating a new restaurant with the math.floor function 
    Call a new Kanye quote 

When yes is clicked: 
    Add into favorites with +1 showing up 
    Pushes the liked restaurant/id to the favoriteArray 
    Then generate a new restuarant with the math.floor function
    Call a new Kanye quote 

When favorites is clicked:
    Generate list of favoriteArray restaurants 
    Create back button to go back button/find a swiping action to go back
    
When you click individual restaurants in favorites: 
    Generate the information page about the restaurant with the yelp API 
    Create back button to go back button/find a swiping action to go back

Ambitions: 
    Add in preferences for user to choose what type of restaurants they want to see/match with 
    Cool features with the Kanye West API 
**/

// Initialize Firebase
const config = {
    apiKey: "AIzaSyACZRFDd5HaZN_CloDFXSg1ILLZdWIrc8g",
    authDomain: "testproject1-39f23.firebaseapp.com",
    databaseURL: "https://testproject1-39f23.firebaseio.com",
    projectId: "testproject1-39f23",
    storageBucket: "testproject1-39f23.appspot.com",
    messagingSenderId: "629671921712"
};
firebase.initializeApp(config);

const db = firebase.firestore()
// const auth = firebase.auth()

//Variable Declaration//
let coordinates = {}
    city = ``


//Function Declaration//

// Function used for "x miles away" location tag
const distFunc = (lat1, lon1, lat2, lon2) => {
    let pi = Math.PI
    const toRadians = (numInDegrees) => {
        return numInDegrees * (pi / 180)
    }
    // barely modified formula from movable-type-scripts article
    const R = 3958.8
    let φ1 = toRadians(lat1)
    let φ2 = toRadians(lat2)
    let Δφ = toRadians((lat2 - lat1))
    let Δλ = toRadians((lon2 - lon1))

    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    let d = R * c

    return d
}

// Function for using coordinates to find nearby restaurants
const fetchNearbyBusinesses = (lat1, lon1) => {
    
    // to grab restaurant location from API
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${lat1}&longitude=${lon1}&limit=50&open_now=true`, {
        headers: {
            "Authorization": "Bearer CYpONbq3tuPRivns5oh_FenCfkuVArzigVu7ay4XjSaw1vOOZjWIgvQ7lPiyMRvXF2vlajmHLfHWqCUCBAKPVssu1NVAfDhuv9cHwFNwz8rgYI4W5FIg2DRY-CWcXHYx"
        }
    })
        .then(r => r.json())
        .then(r => {
            // random number generator for restaurant selection
            let randRest = Math.floor(Math.random() * r.businesses.length)
            console.log(randRest)
            // filter to display only 2.5+ rated restaraunts
            if (r.businesses[randRest].rating >= 2.5) {
                // pulling coordinates for destination
                let { latitude: lat2, longitude: lon2 } = r.businesses[randRest].coordinates

                // Function used for "x miles away" location tag
                const distance = distFunc(lat1, lon1, lat2, lon2)

                if (distance < 1) {
                    // shows distance in decimals if between 0 and 1
                    console.log(`${r.businesses[randRest].name} is ~ ${distance.toFixed(2)} Miles Away`)
                } else {
                    // shows rounded distance otherwise
                    console.log(`${r.businesses[randRest].name} is ~ ${Math.round(distance)} Miles Away`)
                }
                document.getElementById('restImage').src = `${r.businesses[randRest].image_url}`
                document.querySelector('.card-title').textContent = `${r.businesses[randRest].name}`
                document.querySelector('.card-price').textContent = `${r.businesses[randRest].price}`
                document.querySelector('.card-transaction').textContent = `${r.businesses[randRest].transactions}`

                // .map returns a new array for us 
                // .join(' ') joins array and separates with a space
                const categories = r.businesses[randRest].categories
                    .map(category => category.title)
                    .join(' ')

                document.querySelector('.card-type').textContent = `Type of food: ${categories}`

                document.getElementById("buttonUrl").onclick = function () {
                    location.href = (r.businesses[randRest].url)
                }
            }
        })
        .catch(e => console.error(e))
}

// function for searching nearby restaurants based on city text input
const fetchNearbyBusinessesCity = (city, lat1, lon1) => {
    // to grab restaurant location from API
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${city}&limit=50&open_now=true`, {
        headers: {
          Authorization:
            "Bearer CYpONbq3tuPRivns5oh_FenCfkuVArzigVu7ay4XjSaw1vOOZjWIgvQ7lPiyMRvXF2vlajmHLfHWqCUCBAKPVssu1NVAfDhuv9cHwFNwz8rgYI4W5FIg2DRY-CWcXHYx"
        }
      }
    )
    .then(r => r.json())
    .then(r => {
        // random number generator for restaurant selection
        let randRest = Math.floor(Math.random() * r.businesses.length)
        console.log(randRest);
        // filter to display only 2.5+ rated restaraunts
        if (r.businesses[randRest].rating >= 2.5) {
            // pulling coordinates for destination
            let { latitude: lat2, longitude: lon2 } = r.businesses[randRest].coordinates

            // Function used for "x miles away" location tag
            const distance = distFunc(lat1, lon1, lat2, lon2)

            if (distance < 1) {
                // shows distance in decimals if between 0 and 1
                console.log(`${r.businesses[randRest].name} is ~ ${distance.toFixed(2)} Miles Away`)
            } else {
                // shows rounded distance otherwise
                console.log(`${r.businesses[randRest].name} is ~ ${Math.round(distance)} Miles Away`)
            }
            document.getElementById("restImage").src = `${r.businesses[randRest].image_url}`
            document.querySelector(".card-title").textContent = `${r.businesses[randRest].name}`
            document.querySelector(".card-price").textContent = `${r.businesses[randRest].price}`
            document.querySelector(".card-transaction").textContent = `${r.businesses[randRest].transactions}`

            // .map returns a new array for us
            // .join(' ') joins array and separates with a space
            const categories = r.businesses[randRest].categories.map(category => category.title).join(" ")

            document.querySelector(".card-type").textContent = `Type of food: ${categories}`

            document.getElementById("buttonUrl").onclick = _ => {location.href = r.businesses[randRest].url}
        }
    })
    .catch(e => console.error(e))
}

//Page Functionality//

// current location coords generator
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    console.log('latitude: ', latitude, 'longitude: ', longitude)

    // user's location
    coordinates = {
        lat1: latitude,
        lon1: longitude
    }
    return coordinates
})



// prevents enter key default
document.querySelector(`#locationInput`).addEventListener(`keydown`, e => {
    if (e.keyCode === 13) {
        e.preventDefault()
    }
})

// differentiates which fetch request to run
document.querySelector('.search').addEventListener(`click`, e => {
    // // variable to house city input
    city = document.getElementById(`locationInput`).value

    if (city === ``) {
        console.log(`search coords`)
        console.log(coordinates)
        fetchNearbyBusinesses(coordinates.lat1, coordinates.lon1)
    }else {
        console.log(`search a city`)
        console.log(`city`)
        fetchNearbyBusinessesCity(city, coordinates.lat1, coordinates.lon1)
    }
})
// kanye west API key fetch
fetch(`https://api.kanye.rest`) 
.then(r => r.json())
.then(r => {
    // console log r to show random quote from kanye west
    // console.log(r)
    document.querySelector('#section').textContent = `Kanye's Food For Thought : ${r.quote}` 
})
