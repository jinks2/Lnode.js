var express = require('express');
var Sequelize = require('sequelize');

app = express.createServer();

//注意格式
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


app.set('view engine', 'jade');
app.set('views','views');
app.set('view option', {layout: false});

//首页路由
app.get('/', function (req, res, next) {
	Project.findAll()
	.success( function (projects) {
		res.render('index', {projects: projects});
	})
	.error(next);
});
//删除项目路由
app.del('/project/:id', function (req, res, next) {
	Project.find(Number(req.params.id)).success(function (proj) {
		proj.destroy()
		.success(function () {
			res.rend(200);
		})
		.error(next);
	}).error(next);
});
//创建项目路由
app.post('/projects', function (req, res, next) {
	Project.build(req.body).save()
	.success(function (obj) {
		res.send(obj);
	})
	.error(next);
});
//展示指定项目路由
app.get('/project/:id/tasks', function (req, res, next) {
	Project.find(Number(req.params.id))
	.success(function (project) {
		project.getTasks().on('success', function (tasks) {
			res.render('tasks', {project: project, tasks: tasks});
		})
	})
	.error(next);

});
//为指定项目添加任务
app.post('/project/:id/tasks', function (req, res, next) {
	res.body.ProjectId = req.params.id;
	Task.build(req.body).save()
	.success(function (obj) {
		res.send(obj);
	})
	.error(next);
});
//删除任务路由
app.del('/task/:id', function (req, res, next) {
	Task.find(Number(req.params.id)).success(function (task) {
		task.destroy()
		.success(function () {
			res.send(200);
		})
		.error(err);
	}).error(next);
});

app.listen(3000, function() {
	console.log(' - listening on http://*3000');
});

//初始化，处于对结构清晰的考虑，在应用设置后做;
var sequelize = new Sequelize('todo-example', 'root','123');

//定义任务模型
var Project = sequelize.define('Project', {
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	created: Sequelize.DATE
})

var Task = sequelize.define('Task', {
	title: Sequelize.STRING
});

//设置联合
Task.belongsTo(Project);
Project.hasMany(Task);

//同步
sequelize.sync();

