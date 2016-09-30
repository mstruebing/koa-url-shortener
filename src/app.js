import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import mongo from 'koa-mongo';
import uuid from 'uuid';

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
	const id = uuid.v4();
	yield this.mongo.db('shorty').collection('urls').insert({_id: id, url: this.request.body.url});
	this.body = this.request.origin.concat('/', id);
	yield next;
})
.get('/:id', function * (next) {
	const url = yield this.mongo.db('shorty').collection('urls').findOne({_id: this.params.id});
	if (url) {
		this.redirect(url.url);
		this.mongo.db('shorty').collection('urls').remove({_id: this.params.id});
	}
	yield next;
});

app.use(router.routes());

app.listen(port, () => {
	console.log(`App is running in ${context} context on port ${port}`);
});
