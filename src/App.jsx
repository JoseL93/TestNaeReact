import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

export function App() {
	const [posts, setPosts] = useState([]);
	const [columns, setColumns] = useState([
		{ field: 'userId', headerName: 'User ID', width: 200 },
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'title', headerName: 'Title', width: 600 },
		{ field: 'body', headerName: 'Body', width: 600 },		
	]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

	    fetch( 'https://jsonplaceholder.typicode.com/posts', { signal: signal }, { method: "GET" } )
	      	.then(res => res.json())
	      	.then(response => {
	        	setPosts(response);
	      	})
	      	.catch(error => console.log(error));

	      	return function cleanup() {
	      		abortController.abort();
	      	}
	  	}, []);
	return (
		<div style={{ height: '95vh', width: '100%' }}>
			<DataGrid rows={ posts } columns={ columns } pageSize={ 15 } />
		</div>
	);
}