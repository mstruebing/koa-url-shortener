import koa from 'koa';

const app = koa();
const port = process.env.PORT || 3000;
const context = process.env.NODE_ENV || 'Development';

app.use(function * (next) {
	this.response.body = 'hello world';
	yield * next;
});

console.log(`App is running in ${context} context on port ${port}`);

app.listen(port);
