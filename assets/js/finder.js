/**  create authentication page
    when they move on from authenitcation page, set display : none
    
Move on to location page: set display of entering location/city  
    Add in an enter button, with onclick even listener function to fetch the API information about places to eat 
    Add in: user current location option function: 

        navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        });

Add in instructions page that explains swipe right/left/up/down actions

Move on to main page where you view the randomized restaurants 
    Use the math.floor function to randomize restaurants near the location entered 
    Create two buttons for yes (on the right) or no (on the left)   
        Add in swiping function from javascript library, swipe right for yes, left for no 
    On the displayed card, dynamically add in information: 
        1. Restaurant name
        2. Restaurant image 
        3. Restaurant description 
        4. Restaurant distance 

Kanye West is going to always be on this main page sitting on top of the restaurant card (almost like he is a mascot/static)
    Always generating a random quote
    Will always be there regardless of swiping left or right 


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