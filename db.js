// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3qg6qYP21jIb5UsNG_dLPCf24vpXtWfI",
  authDomain: "loveclub-2642a.firebaseapp.com",
  projectId: "loveclub-2642a",
  storageBucket: "loveclub-2642a.appspot.com",
  messagingSenderId: "726638261389",
  appId: "1:726638261389:web:595640cfa91c153b421ec4",
  measurementId: "G-7ZE48GM4QC",
  databaseURL: "https://loveclub-2642a-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app);

// Add event listener to the form
document
  .getElementById("girlProfileForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Show the loading bar
    document.getElementById("loadingBar").classList.remove("d-none");

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
    const voiceRecording = document.getElementById("voiceRecording").files[0];

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
        question3,
      },
    };

    // Function to save profile data
    const saveProfileData = (voiceURL = "") => {
      profileData.voiceURL = voiceURL; // Add voiceURL to the profile data
      set(newProfileRef, profileData)
        .then(() => {
          // Hide loading bar and show success message
          document.getElementById("loadingBar").classList.add("d-none");
          document.getElementById("successMessage").classList.remove("d-none");
          document.getElementById("girlProfileForm").reset();
        })
        .catch((error) => {
          // Hide loading bar and log error
          document.getElementById("loadingBar").classList.add("d-none");
          console.error("Error adding profile: ", error);
        });
    };

    // If a voice recording is uploaded, upload to Firebase Storage
    if (voiceRecording) {
      const voiceRef = storageRef(
        storage,
        `voices/${newProfileRef.key}/${voiceRecording.name}`
      );
      uploadBytes(voiceRef, voiceRecording)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            // Save profile data with the voice recording URL
            saveProfileData(downloadURL);
          });
        })
        .catch((error) => {
          console.error("Error uploading voice recording: ", error);
          saveProfileData(); // Save profile without voice recording if upload fails
        });
    } else {
      // Save profile without voice recording
      saveProfileData();
    }
  });
