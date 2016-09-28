import koa from 'koa';

const app = koa();
const port = process.env.PORT || 3000;

app.use(function * (next) {
	this.response.body = 'hello world';
	yield * next;
});

console.log(process.env.NODE_ENV || 'Development');

app.listen(port);
