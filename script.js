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
  console.log("Your GP is",GPA")
  return "Your GP is "+GPA
  
  //.forEach(each=>console.log(each))
  
}
let data={
    "gst 112":{grade:"A",units:2,score:95},
    "STA 111":{grade:"B",units:3,score:68},
    "PHY 117":{grade:"A",units:2,score:83},
    "PHY 111":{grade:"B",units:2,score:68},
    "CHM 111":{grade:"B",units:2,score:67},
    "MTH 112":{grade:"B",units:2,score:68},
    "COS 111":{grade:"A",units:3,score:85},
    "CSC 112":{grade:"A",units:2,score:84}
  }
document.querySelector("p").innerText=gpa_calc(data,1)
