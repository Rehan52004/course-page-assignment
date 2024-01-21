import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

//from firestore
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

//authentication purpose
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo2suyc_8xFKa5lvG0E4Qo22A6HpMYeWk",
  authDomain: "alemeno-assignment-feea0.firebaseapp.com",
  projectId: "alemeno-assignment-feea0",
  storageBucket: "alemeno-assignment-feea0.appspot.com",
  messagingSenderId: "479807391503",
  appId: "1:479807391503:web:e103fb0e2cb313af9c207a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//auth instence
const auth = getAuth(app);

//creating context for firebase
const firebaseContext = createContext();

//creating custom hook to use context
export const useFirebase = () => useContext(firebaseContext);

//context provider
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [enrolledCourse, setEnrolledCourse] = useState([]);

  //db instence
  const db = getFirestore(app);
  //getting all courses from database
  const fetchAllCourses = async () => {
    let courses = [];
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
      });
      return courses;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //creating user
  function createUser(name, email, password) {
    console.log("working");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  // login or signin user
  function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  //sign out user
  function logoutUser() {
    signOut(auth)
      .then(() => {
        console.log("Succesfully Logout");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //getting student details and there enrolled course details
  const getStudentDetails = async () => {
    if (user) {
      try {
        const studentRef = collection(db, "student");
        const q = query(studentRef, where("std_id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          let courses = [];
          console.log(doc.data());
          doc.data().enrolled_courses.forEach(async (courseId) => {
            console.log(courseId);
            const courseRef = collection(db, "courses");
            const courseQuery = query(
              courseRef,
              where("course_id", "==", courseId)
            );
            const course = await getDocs(courseQuery);
            course.forEach((doc) => {
              courses.push(doc.data());
              console.log(doc.data());
            });
          });
          console.log(courses);
          setEnrolledCourse(courses);
        });
        return enrolledCourse;
      } catch (err) {
        console.log(err);
      }
    }
  };

  //getting current user
  function getLoggedInUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        setUser(null);
        console.log("user is sign out");
      }
    });
  }

  useEffect(() => {
    getLoggedInUser();
  }, [user]);

  return (
    <>
      <firebaseContext.Provider
        value={{
          current: user,
          fetchAllCourses,
          createUser,
          signInUser,
          getLoggedInUser,
          logoutUser,
          getStudentDetails,
          enrolledCourse,
        }}
      >
        {props.children}
      </firebaseContext.Provider>
    </>
  );
};
