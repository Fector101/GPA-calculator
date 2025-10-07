id = 0
const course_form_ele = document.querySelector("form#courseForm")
const grade_points = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0
}
const grade_upper_limits = {
  "100": "A",
  "69": "B",
  "59": "C",
  "49": "D",
  "44": "E",
  "39": "F"
}
const grade_lower_limits = {
  "A": "70+",
  "B": "60+",
  "C": "50+",
  "D": "45+",
  "E": "38+",
  "F": "-37"
}
//for (let lower_point in //grade_lower_limits){
//      console.log(lower_point,grade_lower_limits)
//}
const class_lower_limits = {
  "4.5": "First Class",
  "3.5": "2nd Class Upper",
  "2.4": "2nd Class Lower",
  "1.5": "3rd Class",
  "1": "Pass",
  "0": "Failed"
}

function gpa_calc(data, use_score = false) {
  let TGP = 0
  let TCU = 0
  const courses = Object.keys(data)
  if (courses.length === 0) return "You need to Enter a Course."
  for (let course in data) {
    //const {grade,units,score}=data[course]
    const { grade, units } = data[course]
    if (!use_score) {
      TGP += grade_points[grade] * units
    }
    
    
    TCU += units
  }
  const GPA = TGP / TCU
  
  //console.log("Your Total Grade Point is",TGP)
  //console.log("Your Total Credit Unit is",TCU)
  console.log("Your GP is", GPA)
  //myTraffic(GPA)
  return "Your GP is " + GPA.toFixed(2)
  
  //.forEach(each=>console.log(each))
  
}
let test = {
  "gst 112": { grade: "A", units: 2, score: 95 },
  "STA 111": { grade: "B", units: 3, score: 68 },
  "PHY 117": { grade: "A", units: 2, score: 83 },
  "PHY 111": { grade: "B", units: 2, score: 68 },
  "CHM 111": { grade: "B", units: 2, score: 67 },
  "MTH 112": { grade: "B", units: 2, score: 68 },
  "COS 111": { grade: "A", units: 3, score: 85 },
  "CSC 112": { grade: "A", units: 2, score: 84 }
}
let data = {}
const grade_elem = document.getElementById('grade')



const scoreElem = document.getElementById('score');
const pointsNeededElem = document.getElementById('pointsNeeded');

// Show how many points are needed to reach an A
scoreElem.addEventListener('input', () => {
  const score = parseFloat(scoreElem.value);
  if (isNaN(score)) {
    pointsNeededElem.textContent = '';
    return;
  }
  
  const gradeBoundaries = {
    A: 70,
    B: 60,
    C: 50,
    D: 45,
    E: 40,
    F: 0
  };
  
  if (score >= gradeBoundaries.A) {
    pointsNeededElem.textContent = 'You already have an A! 🎉';
  } else {
    const diff = gradeBoundaries.A - score;
    pointsNeededElem.textContent = `You need ${diff} more point${diff !== 1 ? 's' : ''} to get an A.`;
  }
});

function insert_in_obj(course_id, dict) {
  data[course_id] = dict
}


function getScoreRemarkHTML(score) {
  if (isNaN(score)) return score+""; // No score → no output
  
  const A_cutoff = 70;
  const diff = A_cutoff - score;
  console.log(diff,'ttgg')
  if (diff <= 0) {
    text = "Already an A 🎉"
    type = "good"; // dark green
  } else if (diff <= 10) {
    text = `${diff} points left to A`
    type = "warn"
  } else if (diff <= 17) {
    text = `${diff} points left to A`
    type = "warn1"
  } else {
    type = "bad"; // deep red
    text=''
  }
  
  return `
    <p style='width:max-content' class="remark ${type}">${text}</p>
  `;
}

document.getElementById('addCourse').addEventListener('click', function() {
  
  if (course_form_ele.classList.contains("edit")) {
    //might do other things in here
    this.innerText = "Add Course"
    course_form_ele.classList.remove("edit")
  }
  const courseName = document.getElementById('courseName').value
  const grade = grade_elem.value
  const units = parseInt(document.getElementById('units').value)
  let score = parseInt(document.getElementById('score').value);
  
  let remark = "";
  if (!isNaN(score)) {
    const A_cutoff = 70; // Adjust if your grading system differs
    if (score >= A_cutoff) {
      remark = "You already have an A 🎉";
    } else {
      const pointsLeft = A_cutoff - score;
      remark = `${pointsLeft} more point${pointsLeft !== 1 ? 's' : ''} to get an A`;
    }
  }else{
    score=grade_lower_limits[grade]
  }
  
  if (courseName && grade && units) {
    // Update courses object
    
    const course_toedit_ele = document.querySelector("li.editing")
    if (course_toedit_ele) {
      const course_id = course_toedit_ele.id
      course_toedit_ele.querySelector("h3").innerText = courseName
      
      course_toedit_ele.querySelector("ul p.grade").innerText = `Grade: ${grade}`
      course_toedit_ele.querySelector("ul p.unit").innerText = `Units: ${units}`
      course_toedit_ele.querySelector("ul p.score").innerText=`Score: ${score}`
      course_toedit_ele.querySelector("ul .remark").outerHTML=getScoreRemarkHTML(score)
      
      insert_in_obj(course_id, { grade, units, score, remark })
      course_toedit_ele.classList.remove("editing")
    } else {
      const course_id = courseName + "fucduhfrv" + id

      // Update course list
      const courseList = document.getElementById('courseList')
      const listItem = document.createElement('li')
      listItem.id = course_id
      listItem.classList.add("course-build")
      
      listItem.innerHTML = `
      <div class="course course-info">
    <h3 class='courseName'>${courseName}</h3>
    <p>Score: ${score}</p>
    <p class="grade">Grade: ${grade}</p>
        <p class="unit">Units: ${units}</p>
    ${getScoreRemarkHTML(get_number(score))}
  </div>
  <div class="card-actions">
    <button class="edit" onclick="editCourse(this)">Edit</button>
    <button class="delete" onclick="deleteCourse(this)">Delete</button>
  </div>`
      ;
      insert_in_obj(course_id, { grade, units, score, remark })
      //<p class="score">Score: ${score}
      courseList.appendChild(listItem)
    }
    
    document.getElementById('courseForm').reset()
    setCoursesHeader()
    id += 1
    document.getElementById('gpaResult').innerText = gpa_calc(data, 0)
    localStorage.setItem("gpaData", JSON.stringify(data))
    
  } else {
    alert("Please fill out all fields.")
  }
});

document.getElementById('calculateGPA').addEventListener('click', function() {
  const result = gpa_calc(data, 0)
  document.getElementById('gpaResult').innerText = result
  
  // Save to localStorage
  localStorage.setItem("gpaData", JSON.stringify(data))
  
});


//hamburger Menu
const hamburger_btn = document.getElementById('hamburger')
const menuModal = document.getElementById('menuModal')

hamburger_btn.addEventListener('click', function() {
  menuModal.classList.toggle("display-none")
});


window.addEventListener('click', function(event) {
  
  if (!event.target.closest('.navbar')) {
    menuModal.classList.add("display-none")
  }
})

function editCourse(ele) {
  const par = ele.closest('.course-build')
  const course_name = par.querySelector('.courseName').innerText
  const course = data[par.id]
  document.getElementById('courseName').value = course_name
  document.getElementById('grade').value = course.grade
  document.getElementById('units').value = course.units
  document.getElementById('score').value = course.score
  document.getElementById('addCourse').innerText = 'Update Course'
  course_form_ele.classList.add("edit")
  par.classList.add("editing")
}

function deleteCourse(ele) {
  const par = ele.closest('.course-build')
  const course_name = par.id
  delete data[course_name]
  par.remove()
  setCoursesHeader()
  document.getElementById('gpaResult').innerText = gpa_calc(data, 0)
  localStorage.setItem("gpaData", JSON.stringify(data))
}
async function myTraffic(GPA) {
  try {
    const data1 = Object.entries(data)
      .map(([course, value]) =>
        `($ { course.replace("fucduhfrv", " -") }, Grade: $ { value.grade }, Units: $ { value.units })`
      )
      .join(', ')
    const userVisit = {
      timestamp: new Date(),
      data: data1,
      GPA
    }
    
    const res = await fetch('/traffic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userVisit)
    })
    //const data = await res.json()
    // console.log(data)
  } catch (e) { // Pass}
  }
}

async function setCoursesHeader() {
  const len = document.querySelectorAll("#courseList li:not(.loading)").length
  const header = document.getElementById("course-info-head")
  
  if (len) {
    header.innerText = len > 1 ? "Added Courses:" : "Added Course:"
    header.style.color = "#333"
  } else {
    header.innerText = "No Course Added"
    header.style.color = "rgb(100,100,100)"
  }
}

function get_number(input) {
  
  if (typeof input !== "string") input = String(input);
  // Remove + and - signs, spaces
  const cleaned = input.replace(/[+\-\s]/g, "");
  
  // Convert to number
  const num = Number(cleaned);
  
  // Return as int if no decimal, else float
  return Number.isInteger(num) ? parseInt(num) : parseFloat(num);

}
window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem("gpaData")
  if (savedData) {
    data = JSON.parse(savedData)
    for (const course_id in data) {
      
      const { grade, units, score, remark } = data[course_id];
      
      // Render back to HTML
      const courseList = document.getElementById('courseList')
      const listItem = document.createElement('li')
      listItem.id = course_id
      listItem.classList.add("course-build")
      const courseName = course_id.split("fucduhfrv")[0]
      console.log(score, "to rrr")
      listItem.innerHTML = `      <div class="course course-info">
    <h3 class='courseName'>${courseName}</h3>
    <p class='score'>Score: ${score||grade_lower_limits[grade]}</p>
    <p class="grade">Grade: ${grade}</p>
        <p class="unit">Units: ${units}</p>
    ${getScoreRemarkHTML(get_number(score)
     )}
  </div>
  <div class="card-actions">
    <button class="edit" onclick="editCourse(this)">Edit</button>
    <button class="delete" onclick="deleteCourse(this)">Delete</button>
  </div>`;
  
  
      
      courseList.appendChild(listItem)
    }
    
    setCoursesHeader()
    document.getElementById('gpaResult').innerText = gpa_calc(data, false)
    
  }
})