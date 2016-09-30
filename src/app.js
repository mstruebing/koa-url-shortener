import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import mongo from 'koa-mongo';

const app = koa();
const router = koaRouter();
const bodyParser = koaBody();

const port = process.env.PORT || 8080;
const context = process.env.NODE_ENV || 'development';

app.use(mongo({
	uri: 'mongodb://shorty:shorty@db:27017/shorty',
	max: 100,
	min: 1,
	timeout: 3000,
	log: false
}));

router.get('/', function * (next) {
	this.body = '<h1>APP</h1><form action="/add" method="post"><input type="text" name="url" placeholder="url"><input type="submit"></form>';
	yield next;
})
.post('/add', bodyParser, function * (next) {
	yield this.mongo.db('shorty').collection('urls').insert({url: this.request.body.url});
	const x = this.mongo.db('shorty').collection('urls').find().limit(1).sort({$natural: -1});
	x.each((err, doc) => {
		if (err) {
			console.log(err);
		} else if (doc !== null) {
			console.log(doc);
		}
	});
	yield next;
})
.get('/:id', function * (next) {
	this.body = this.params.id;
	yield next;
});

app.use(router.routes());

app.listen(port, () => {
	console.log(`App is running in ${context} context on port ${port}`);
});
