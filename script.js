id=0
const course_form_ele=document.querySelector("form#courseForm")
const grade_points={
  A:5,B:4,
  C:3,D:2,
  E:1,F:0
}
const grade_upper_limits={
  "100":"A",
  "69":"B",
  "59":"C",
  "49":"D",
  "44":"E",
  "39":"F"
}
//for (let lower_point in //grade_lower_limits){
  //      console.log(lower_point,grade_lower_limits)
//}
const class_lower_limits={
  "4.5":"First Class",
  "3.5":"2nd Class Upper",
  "2.4":"2nd Class Lower",
  "1.5":"3rd Class",
  "1":"Pass","0":"Failed"
}
function gpa_calc(data,use_score=false) {
  let TGP=0
  let TCU=0
  const courses=Object.keys(data)
  
  for (let course in data){
    const {grade,units,score}=data[course]
    if(!use_score){
      TGP += grade_points[grade] * units
    }else{
      for (let lower_point in grade_upper_limits){
       // console.log(lower_point)
        if(score<=+lower_point){
          const gotten_grade=grade_upper_limits[lower_point]
          
          TGP += grade_points[gotten_grade] * units
          break
        } else if (score >100) {
          TGP += grade_points["A"] * units
          break
        }
      }
    }
    TCU += units
  }
  const GPA = TGP/TCU
  
  //console.log("Your Total Grade Point is",TGP)
  //console.log("Your Total Credit Unit is",TCU)
  console.log("Your GP is",GPA)
  return "Your GP is "+GPA
  
  //.forEach(each=>console.log(each))
  
}
let test={
    "gst 112":{grade:"A",units:2,score:95},
    "STA 111":{grade:"B",units:3,score:68},
    "PHY 117":{grade:"A",units:2,score:83},
    "PHY 111":{grade:"B",units:2,score:68},
    "CHM 111":{grade:"B",units:2,score:67},
    "MTH 112":{grade:"B",units:2,score:68},
    "COS 111":{grade:"A",units:3,score:85},
    "CSC 112":{grade:"A",units:2,score:84}
  }
let data={}
//document.querySelector("p").innerText=gpa_calc(data,1)
// Add course
const score_elem = document.getElementById('score')
const grade_elem = document.getElementById('grade')
document.getElementById('addCourse').addEventListener('click', function() {
  
  if (course_form_ele.classList.contains("edit")) {
    //might do other things in here
  this.innerText="Add Course"
  course_form_ele.classList.remove("edit")
  }
    const courseName = document.getElementById('courseName').value
    const grade = grade_elem.value
    const units = parseInt(document.getElementById('units').value)
    const score = parseInt(score_elem.value)
  
    if (courseName && grade && units && !isNaN(score)) {
        // Update courses object
      
          const course_toedit_ele=document.querySelector("li.editing")
        if(course_toedit_ele){
          const course_id =course_toedit_ele.id
          course_toedit_ele.querySelector("p").innerText=courseName
          
          course_toedit_ele.querySelector("ul p.grade").innerText=`Grade: ${grade}`
          course_toedit_ele.querySelector("ul p.unit").innerText=`Units: ${units}`
          course_toedit_ele.querySelector("ul p.score").innerText=`Score: ${score}`
          data[course_id] = { grade, units, score }
          course_toedit_ele.classList.remove("editing")
        }else{
          const course_id=courseName+"fucduhfrv"+id
        data[course_id] = { grade, units, score }

        // Update course list
        const courseList = document.getElementById('courseList')
        const listItem = document.createElement('li')
        listItem.id=course_id
        listItem.classList.add("course-build")
        listItem.innerHTML = `
            
        <div class="course">
          <p>${courseName}</p>
          <ul>
            <p class="grade"> Grade: ${grade}</p>
            <p class="unit"> Units: ${units}</p>
            <p class="score">Score: ${score}</p>
          </ul>
        </div>
            <button onclick="editCourse(this)" class="edit">Edit</button>
            <button onclick="deleteCourse(this)">Delete</button>
       
        `
        
        courseList.appendChild(listItem)
       }
      
        document.getElementById('courseForm').reset()
        id +=1
    } else {
        alert("Please fill out all fields.")
    }
});

score_elem.addEventListener("input",function () {
  const score=parseFloat(this.value)
  if(!isNaN(score)){
      for (let lower_point in grade_upper_limits){
        if(score<=+lower_point){
          const gotten_grade=grade_upper_limits[lower_point]
          document.querySelector(`select#grade option[value="${gotten_grade}"]`). selected=true 
          break 
        } else if (score >100) {
          document.querySelector(`select#grade option[value="A"]`).selected = true
          break
        }
      }
  }
})

document.getElementById('calculateGPA').addEventListener('click', function() {
    const result = gpa_calc(data, true)
    document.getElementById('gpaResult').innerText = result
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

function editCourse(ele){
const par=ele.closest('.course-build')
 const course_name =par.querySelector(".course p").innerText
 const course=data[par.id]
  document.getElementById('courseName').value = course_name
  document.getElementById('grade').value = course.grade
  document.getElementById('units').value = course.units
  document.getElementById('score').value = course.score
  document.getElementById('addCourse').innerText = 'Update Course'
  course_form_ele.classList.add("edit")
  par.classList.add("editing")
}

function deleteCourse(ele) { 
  const par=ele.closest('.course-build')
  const course_name =par.id
  delete data[course_name]
  par.remove()
}

