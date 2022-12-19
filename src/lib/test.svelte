<script>
	import {onMount} from 'svelte'
	import {data} from './store'
	let name = 'world';
	let x= ['rw','re','gr','fds']
	onMount(() =>{
		for (each w of x){
		data.update(data =>{
			data.w = 'gf'+w;
			return data
		})}
	})
</script>
