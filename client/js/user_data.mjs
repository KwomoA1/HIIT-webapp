/* eslint-disable quotes */
// Stores all the data the use requires during the session
const userSessionData = {
  workouts: [],
};

// Obtains all the workouts stored in the session data for the user.
export function getAllUserWorkouts() {
  return userSessionData.workouts;
}

// Get workout data using the index.
export function getWorkout(index) {
  return userSessionData.workouts.index;
}

// Add a new workout to the obj.
export function addWorkout(workoutObj) {
  userSessionData.workouts.push(workoutObj);
}

// Remove a workout from the obj
export function removeWorkout(index) {
  delete userSessionData.workouts[index];
}

// Save workout data to session storage
export function saveData() {
  sessionStorage.setItem("session", JSON.stringify(userSessionData));
}
