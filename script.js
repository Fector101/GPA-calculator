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
    const courseName = document.getElementById('courseName').value
    const grade = grade_elem.value
    const units = parseInt(document.getElementById('units').value)
    const score = parseInt(score_elem.value)
  
    if (courseName && grade && units && !isNaN(score)) {
        // Update courses object
        data[courseName] = { grade, units, score }

        // Update course list
        const courseList = document.getElementById('courseList')
        const listItem = document.createElement('li')
        listItem.textContent = `${courseName} - Grade: ${grade}, Units: ${units}, Score: ${score}`
        courseList.appendChild(listItem)

        // Reset inputs
        document.getElementById('courseForm').reset()
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
