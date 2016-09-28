import koa from 'koa';

const app = koa();

app.use(function * (next) {
	this.response.body = 'hello world';
	yield * next;
});

app.listen(3000);
