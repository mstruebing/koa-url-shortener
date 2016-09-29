import koa from 'koa';
import koaRouter from 'koa-router';

const app = koa();
const router = koaRouter();

const port = process.env.PORT || 8080;
const context = process.env.NODE_ENV || 'development';

router.get('/', function * (next) {
	this.body = 'Hello World';
	yield next;
})
.get('/wha', function * (next) {
	this.body = 'whaaaa';
	yield next;
});

app.use(router.routes());

console.log(`App is running in ${context} context on port ${port}`);

app.listen(port);
