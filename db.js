// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3qg6qYP21jIb5UsNG_dLPCf24vpXtWfI",
  authDomain: "loveclub-2642a.firebaseapp.com",
  projectId: "loveclub-2642a",
  storageBucket: "loveclub-2642a.appspot.com",
  messagingSenderId: "726638261389",
  appId: "1:726638261389:web:595640cfa91c153b421ec4",
  measurementId: "G-7ZE48GM4QC",
  databaseURL: "https://loveclub-2642a-default-rtdb.firebaseio.com/" // Add this line for Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const db = getDatabase(app);

// Add event listener to the form
document.getElementById("girlProfileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const profilePic = document.getElementById("profilePic").value;
  const name = document.getElementById("name").value;
  const language = document.getElementById("language").value;
  const rate = document.getElementById("rate").value;
  const location = document.getElementById("location").value;
  const expertise = document.getElementById("expertise").value;
  const introduction = document.getElementById("introduction").value;
  const question1 = document.getElementById("question1").value;
  const question2 = document.getElementById("question2").value;
  const question3 = document.getElementById("question3").value;

  // Create a unique ID for the profile using push()
  const profileRef = ref(db, "profiles");
  const newProfileRef = push(profileRef);

  // Prepare profile data
  const profileData = {
    profilePic,
    name,
    language,
    rate,
    location,
    expertise,
    introduction,
    questions: {
      question1,
      question2,
      question3
    }
  };

  // Save profile data to Firebase Realtime Database
  set(newProfileRef, profileData)
    .then(() => {
      // Show success message
      document.getElementById("successMessage").classList.remove("d-none");
      document.getElementById("girlProfileForm").reset();
    })
    .catch((error) => {
      console.error("Error adding profile: ", error);
    });
});
