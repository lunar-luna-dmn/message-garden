window.addEventListener('load', ()=> {
    //STEP 1. Make a fetch request of type POST so that we can send info to the server
    document.getElementById('msg-submit').addEventListener('click', ()=>{
        let inputName = document.getElementById('name-input').value;
        let inputMsg = document.getElementById('msg-input').value;
        let inputDate = new Date();
        let inputDateString = inputDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })

        //1.1 create an object and turn into JSON format
        let msgObj = {
            "name": inputName,
            "message": inputMsg,
            "date": inputDate
        }
        let msgObjJSON = JSON.stringify(msgObj);

        //1.2 make a fetch request
        fetch('/new-message', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: msgObjJSON
        })
        .then (response => response.json())
        .then (data => {console.log(data)})

        // STEP 3. Add the new message data to the page and clear the input box
        let feed = document.getElementById('feed');
        let inputEle = document.createElement('p');
        inputEle.innerHTML = inputName + ": " + inputMsg + " (" + inputDateString + ")"
        feed.appendChild(inputEle);

        inputName = ''; // why doesn't this clear the input boxes?
        inputMsg = '';
        // console.log(inputName);
    })

    //STEP 4 Display data on index.html
    //4.1 Make a request to get the data
    fetch('/messages')
    .then(response => response.json())
    .then(data => {
    console.log(data);

    let theData = data.messages; //what is "messages"?
    
    //4.2 Select for element on the page
    let feed = document.getElementById('feed');
    //4.3 Loop through data and append to the page
    for (let i = 0; i < theData.length; i++) {
        let currentName = theData[i].name;
        let currentMessage = theData[i].message;
        let currentDateObj = new Date(theData[i].date); //ensure the date is an obj before using toLocaleString()
        let currentDate = currentDateObj.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })

        let currentEl = document.createElement('p');
        currentEl.innerHTML = currentName + ": " + currentMessage + " (" + currentDate + ")";

        feed.appendChild(currentEl);
    }
    })
    .catch(error => {
    console.log(error)
    });
})