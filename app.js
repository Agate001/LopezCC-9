let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastname"); 
let codestackEmail = document.getElementById("csemail");
let email = document.getElementById("email");
let summonBtn = document.getElementById("randomBtn");

let previousFive = []; // Stores the last 5 generated names
let lastGenerated = null; // so the previouslist doesnt show the current name

function getData() {
  return fetch("../Data/data.json") 
    .then((response) => response.json())
    .then((data) => data.students);
}

function randomizeData(students) {
  let randomIndex = Math.floor(Math.random() * students.length);
  return students[randomIndex];
}

function previousList() {
  const previousList = document.getElementById("previous");
  previousList.innerHTML = "";

  previousFive.forEach((name) => { // I like forEach :)
    const p = document.createElement("p"); //creates a new p element for the previous names
    p.textContent = name;
    previousList.appendChild(p);
  });
}

summonBtn.addEventListener("click", () => {
  getData().then((students) => {
    let randomStudent = randomizeData(students);

    if (lastGenerated !== null) { // this adds to the list after 
      const prevName = `${lastGenerated.firstName} ${lastGenerated.lastName} | ${lastGenerated.csemail} | ${lastGenerated.email}`; // Back tick will keep the code displayed exactly how you type it so need for the + " " just use the back tick and add space like a doc
      
      
      previousFive.unshift(prevName); //unshift is the oppisite of push it basically send all the new arrays to the front instead of just pusing old ones to the back
      if (previousFive.length > 5) previousFive.pop(); //pop() is doing all the work here by deleting the last element from the array unless empty cause then it wont modify anything
    }

    firstName.textContent = randomStudent.firstName;
    lastName.textContent = randomStudent.lastName;
    codestackEmail.textContent = randomStudent.csemail;
    email.textContent = randomStudent.email;

    // Back tick will keep the code displayed exactly how you type it so need for the + " " just use the back tick and add space like a doc
    

    lastGenerated = randomStudent;

    previousList(); // this is updating the list of previous students after the fact

    console.log("Last 5:", previousFive);
  })
});