var express = require('express');
var router = express.Router();
//var query = require('../../course/query');
var query = require('../../../db/msql');
var csrf = require('csurf');
var csrfProtection = csrf();


router.post('/assistants/project/ProResearchList',csrfProtection, function(req, res){
    if(req.session.profile){
    //req.body.grade = '04';
    //req.body.semester = 'all';
	query.ShowTeacherInfoResearchCnt(function(err, ID_list){
        if(err){
            throw err;
            res.redirect('/');
        }
        if(!ID_list)
            res.redirect('/');
		else{
			var group = [];
			var Count = 0;
			var Index = [];
			ID_list = JSON.parse(ID_list);
           // console.log(ID_list);
			for(var i=0; i<ID_list.length; i++){
				var list ={
					professor_name:ID_list[i].tname,
                    gradeCnt:0,
					accepted:{
						projects:[]
					},
					pending:{
						projects:[]
					}
				}
                for(var j=0; j<ID_list[i].gradeCnt.length;j++){
                    if(ID_list[i].gradeCnt[j].grade == req.body.grade){
                         
                        list.gradeCnt = parseInt(ID_list[i].gradeCnt[j].scount);
                    //    console.log(ID_list[i].tname);
                     //   console.log(ID_list[i].gradeCnt[j].scount);
                        break;
                    }
                }

				Index[ID_list[i].teacher_id] = Count;
				Count ++;
				group.push(list);
			}
			for(var i=0; i<ID_list.length; i++){
				query.ShowGradeTeacherResearchStudent(ID_list[i].teacher_id,req.body.grade, function(err, result){
					if(err){
						throw err;
						return;
					}
					if(!result)
						return;
					else{
						result = JSON.parse(result);
                       // console.log(result);
                       	if(req.body.semester == 'all'){
                     		var index = [];
							var count = 0;
							var index_sid = [];
							var count_sid = 0;
							for(var j = 0; j<result.length; j++){
								
								if(index[result[j].research_title] == null){
									var project = {
											title: '',
											students : []
											
									}
									project.title = result[j].research_title;
									var Id = Index[result[j].teacher_id];
									group[Id].accepted.projects.push(project);
									index[result[j].research_title] = count;
									count++;
								}  
							}
							for(var j = 0; j<result.length; j++){
							
                        		    var student = {
										id: '',
										name: '',
										program: '',
										semester:'',
                        		        first_second:'',
                        		        status: null	
									//	score: null,
									}
									if(index_sid[result[j].student_id] == null){
										student.id = result[j].student_id;
										student.name = result[j].sname;
										student.program = result[j].class_detail;
										student.semester = result[j].semester;
										student.first_second = result[j].first_second;
										student.status = result[j].status;
										var id = index[result[j].research_title];
										var Id = Index[result[j].teacher_id];
								    	group[Id].accepted.projects[id].students.push(student);
								    	index_sid[result[j].student_id] = count_sid;
								    	count_sid++;
									}
									else{
										var id = index[result[j].research_title];
										var Id = Index[result[j].teacher_id];
										var flag = 1;
										for(var k =0 ;k < group[Id].accepted.projects[id].students.length ; k++){
											if(result[j].student_id == group[Id].accepted.projects[id].students[k].id){
												group[Id].accepted.projects[id].students[k].name = result[j].sname;
												group[Id].accepted.projects[id].students[k].program = result[j].class_detail;
												group[Id].accepted.projects[id].students[k].semester = result[j].semester;
												group[Id].accepted.projects[id].students[k].first_second = result[j].first_second;
												group[Id].accepted.projects[id].students[k].status = result[j].status;
												flag = 0;
												break;
											}
											else
												flag = 1;
						
										}
										if(flag){
											student.id = result[j].student_id;
											student.name = result[j].sname;
											student.program = result[j].class_detail;
											student.semester = result[j].semester;
											student.first_second = result[j].first_second;
											student.status = result[j].status;
											group[Id].accepted.projects[id].students.push(student);
										}						

									}

								}		
	
                       	}  	
                       else{
							var index = [];
							var count = 0;
							for(var j = 0; j<result.length; j++){
								
								if((index[result[j].research_title] == null)&& (result[j].semester == req.body.semester )){
									var project = {
											title: '',
											students : []
											
									}
									project.title = result[j].research_title;
									var Id = Index[result[j].teacher_id];
									group[Id].accepted.projects.push(project);
									index[result[j].research_title] = count;
									count++;
								}  
							}
							for(var j = 0; j<result.length; j++){
							
								if((result[j].semester == req.body.semester)){

                        		    var student = {
										id: '',
										name: '',
										program: '',
										semester:'',
                        		        first_second:'',
                        		        status: null	
									//	score: null,
									}
									student.id = result[j].student_id;
									student.name = result[j].sname;
									student.program = result[j].class_detail;
									student.semester = result[j].semester;
									student.first_second = result[j].first_second;
									student.status = result[j].status;
									var id = index[result[j].research_title];
									var Id = Index[result[j].teacher_id];
								    group[Id].accepted.projects[id].students.push(student);
								}
							}
						}
					}
				});
			}
			for(var i=0; i<ID_list.length; i++){
				
				query.ShowTeacherResearchApplyFormList(ID_list[i].teacher_id, function(err, result){
					if(err){
						throw err;
						return;
					}
					if(!result)
						return;
					else{
						
						result = JSON.parse(result);
						var index = [];
						var count = 0;
						for(var j = 0; j<result.length; j++){
							
							if(index[result[j].research_title] == null){
								var project = {
										title: '',
										students : [],
										
								}
								project.title = result[j].research_title;
								var Id = Index[result[j].teacher_id];
								group[Id].pending.projects.push(project);
								index[result[j].research_title] = count;
								count++;
							}  
						}
						for(var j = 0; j<result.length; j++){	
							var student = {
								id: '',
								name: '',
								program: '',
								first_second:'',
                                status: null	
							}
							student.id = result[j].student_id;
							student.name = result[j].sname;
							student.program = result[j].program;
							student.first_second = result[j].first_second;
							student.status = result[j].status;
							var id = index[result[j].research_title];
							var Id = Index[result[j].teacher_id];
							group[Id].pending.projects[id].students.push(student);
									
						}	
					}
				});
			}
			setTimeout(function(){
						res.send(group);
			},1000);
		}
	});	
    }
    else
        res.redirect('/');
});

module.exports = router;

