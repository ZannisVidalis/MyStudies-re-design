import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Bar from '../../components/bar/Bar';
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Chart } from "react-google-charts";

import { PiBooks } from "react-icons/pi";
import { PiCertificate } from "react-icons/pi";
import { SiSemanticscholar } from "react-icons/si";
import { GiPapers } from "react-icons/gi";
import { LuCheckCheck } from "react-icons/lu";
import { IoBookSharp } from "react-icons/io5";

import { Link } from 'react-router-dom'


async function fetchDataFromFirebase(db, userEmail) {
  const q = query(collection(db, "users"), where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  const data = [];
  console.log('data', data);

  if (querySnapshot.size === 0) {
    console.log('No documents found for email:', userEmail);
    return data;
  }

  querySnapshot.forEach((doc) => {
    const courses = doc.data().courses;
    

    if (courses) {
      const { averageGrade, totalECTS } = calculateAverageAndTotalECTS(courses);
      const { CoursesPassed, CoursesFailed, CoursesWithout } = countCoursesByGrade(courses);

      data.push({
        id: doc.id,
        ...doc.data(),
        averageGrade,
        totalECTS,
        CoursesPassed,
        CoursesFailed,
        CoursesWithout,
      });
    }
  });

  return data;
}

const calculateAverageAndTotalECTS = (courses) => {
  if (!courses || courses.length === 0) {
    return { averageGrade: 0, totalECTS: 0 };
  }

  const totalGrades = courses.reduce((sum, course) => {
    const grade = parseFloat(course.grade);
    return grade >= 5 ? sum + grade : sum;
  }, 0);  
  console.log('grades', totalGrades)
  console.log('cour', courses.length)
  const totalECTS = courses.reduce((sum, course) => sum + course.ects, 0);
  const averageGrade = totalGrades / courses.length;
  console.log('userav', averageGrade)

  return { averageGrade, totalECTS };
};

const countCoursesByGrade = (courses) => {
  const CoursesPassed = courses.filter(course => course.grade >= 5).length;
  const CoursesFailed = courses.filter(course => course.grade < 5 && course.grade >= 1).length;
  const CoursesWithout = courses.filter(course => course.grade === 0).length;

  return { CoursesPassed, CoursesFailed, CoursesWithout };
};

export default function Myhome({ db }) {
  const [userData, setUserData] = useState([]);
  const userEmail = localStorage.getItem('email');
  const [isAuthenticated, setUserAuthenticated] = useState(false);
  const user_role = localStorage.getItem('role');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase(db, userEmail);
        console.log('Fetched data:', data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    }
    fetchData();
  }, [db, userEmail]);

  useEffect(() => {
    // Check localStorage for authentication status
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    if (storedAuthStatus === 'true') {
    setUserAuthenticated(true);
    }
}, []);

  return (
    <div>
      <Navbar />
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <ol>
              <li><a href="/"><i className="icofont-home"></i></a></li>
              <li>Η αρχική μου</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
      {isAuthenticated && user_role === 'student' ? (
                  <section>
                    <div>
                    {userData.map((user) => (
                      <div className='charts' key={user.id}>
                        <div className="chart-container" style={{display:'flex', justifyContent: 'space-between', margin: '0 300px',  padding: '5px' }}>
                          <div className="chart" >
                            <Chart 
                              chartType="PieChart"
                              data={[
                                ["Courses", "Count"],
                                ["Passed", user.CoursesPassed],
                                ["Failed", user.CoursesFailed],
                                ["Without Grade", user.CoursesWithout],
                              ]}
                              options={{
                                title: "Οι βαθμοί μου"
                              }}
                              width={"500px"}
                              height={"400px"}
                            />
                          </div>
                          <div className="chart" style={{marginTop: '30px'}}>
                              <Bar averageGrade={user.averageGrade} />
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="content">
                    <div className="content-row">

                        <div className="content-stud-grades">
                            <SiSemanticscholar className="icon"/>
                            <h4 className="title"><Link to="/grades">Βαθμολογία</Link></h4>
                            <p className="description">Εδώ θα βρείτε έναν κατάλογο με την βαθμολογία των μαθημάτων που έχετε εξεταστεί.</p>
                        </div>
                        <div className="content-stud-dec">
                            <PiBooks className="icon"/>
                            <h4 className="title"><Link to="/declaration">Δηλώσεις</Link></h4>
                            <p className="description">Εδώ μπορείτε να πραγματοποιήσετε την δήλωση των μαθημάτων σας.</p>
                        </div>
                        <div className="content-stud-cert">
                            <PiCertificate className="icon"/>
                            <h4 className="title"><Link to="/certificates">Πιστοποιητικά</Link></h4>
                            <p className="description">Εδώ μπορείτε να αιτηθείτε για την έκδοση πιστοποιητικού.</p>
                        </div>

                        </div>
                    </div>


                  </div> 
                  </section>
      ):(
          <section>
              <div className='charts-prof' style={{ display: 'flex', justifyContent:'space-between' }}>
              <div className='charts'>

              <div className="chart-container" style={{display:'flex',  padding: '5px' }}>
                <div className="chart" >
                  <Chart 
                    chartType="PieChart"
                    data={[
                      ["Courses", "Count"],
                      ["Passed", 80],
                      ["Failed", 20],
                    ]}
                    options={{
                      title: "Εισαγωγή στην Πληροφορική και στις Τηλεπικoινωνίες",
                      colors: ["#4CAF50", "#FF5733"]
                    }}
                    width={"500px"}
                    height={"400px"}
                  />
                  </div>  
                </div>
              </div>
              <div className='charts'>

              <div className="chart-container" style={{display:'flex',  padding: '5px' }}>
                <div className="chart" >
                  <Chart 
                    chartType="PieChart"
                    data={[
                      ["Courses", "Count"],
                      ["Passed", 60],
                      ["Failed", 40],
                    ]}
                    options={{
                      title: "Σχεδίαση και Χρήση Βάσεων Δεδομένων",
                      colors: ["#3498db", "#e74c3c"]
                    }}
                    width={"500px"}
                    height={"400px"}
                  />
                  </div>  
                </div>
              </div>
              <div className='charts'>

              <div className="chart-container" style={{display:'flex',  padding: '5px' }}>
                <div className="chart" >
                  <Chart 
                    chartType="PieChart"
                    data={[
                      ["Courses", "Count"],
                      ["Passed", 75],
                      ["Failed", 25],
                    ]}
                    options={{
                      title: "Επικοινωνία Ανθρώπου Μηχανής",
                      colors: ["#e67e22", "#ff69b4"]
                    }}
                    width={"500px"}
                    height={"400px"}
                  />
                  </div>  
                </div>
              </div>
              </div>
            
            <div className="content">
                <div className="content-row">

                    <div className="content-prof-classes">
                        <IoBookSharp  className="icon"/>
                        <h4 className="title"><Link to="/classes">Μαθήματα</Link></h4>
                        <p className="description">Εδώ θα βρείτε έναν κατάλογο με τα μαθήματα που διδάσκετε.</p>
                    </div>
                    <div className="content-prof-rating">
                        <LuCheckCheck className="icon"/>
                        <h4 className="title"><Link to="/ratings">Βαθμολόγιο</Link></h4>
                        <p className="description">Εδώ μπορείτε καταχώρήσετε την βαθμολογία σας.</p>
                    </div>
                    <div className="content-prof-history">
                        <GiPapers className="icon"/>
                        <h4 className="title"><Link to="/myhistory">Το ιστορικό μου</Link></h4>
                        <p className="description">Εδώ μπορείτε να ελέξγετε το ιστορικό σας.</p>
                    </div>

                    </div>

                </div>

          </section>
      )}
      </section>
      <div>

        <ScrollToTop/>
        <Footer />
      </div>
    </div>
  );
}