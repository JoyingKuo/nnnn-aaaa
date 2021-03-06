var stdin = process.openStdin();
var query = require('./msql')

var getStudentlist = function(callback){
    query.studentGraduateList('0316201', function(err, list){
        callback(JSON.parse(list));

    });
}


var resetOneStudent = function(studentId){
  query.setStudentGraduate(studentId, '0');
  getStudentlist(function(list){
      for(let i = 0; i < list.length; i++){
          if(list[i].student_id == studentId){
              console.log(list[i]);
              console.log("Finished resetting "  + studentId + "s' graduate state.");
              process.exit();
          }
      }
  });
}

var resetAllStudent = function(list){
    
    for(let i = 0; i < list.length ; i++){
        query.setStudentGraduate(list[i].student_id, '0');
    }
    console.log(list);
    console.log("Finished resetting all students' graduate state.");
    process.exit();
}

var opening = function(){
    console.log("Type Y to reset all students' graduate state or type student id to reset a specific student's graduate state.");
    stdin.addListener("data", function(d) {
        if(d.toString().trim() == "Y")
            getStudentlist(resetAllStudent);
        else
            resetOneStudent(d.toString().trim());
  });

};
opening();
