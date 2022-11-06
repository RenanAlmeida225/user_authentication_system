import app from '.';
const port = process.env.PORT || 5000;
app.listen(port, () =>
	console.log(`Open on port ${port}|| http://localhost:${port}/api/v1/`)
);
