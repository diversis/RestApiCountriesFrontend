<script lang="ts">
	export let country;
</script>

<div class="relative w-full h-[22.75rem]">
	<a
		class="absolute bg-any-white dark:bg-dark-mode-dark-blue transition-all duration-300 
	bg-opacity-50 dark:bg-opacity-30 active:scale-[97%] backdrop-blur-[3px] 
	
	sm:hover:mt-[-1em] sm:hover:h-[26.5em] sm:focus:h-[26.5em] sm:focus:mt-[-1em]
	hover:mt-[-0.5em] hover:h-[27em] focus:h-[27em] focus:mt-[-0.5em]
	 
	 text-left pb-[1em] grid grid-cols-1 gap-y-3
	 shadow-card-light dark:shadow-card-dark rounded-lg
	 w-full h-[26em] overflow-hidden text-sm justify-between"
		href="/countries/{country.cca3}"
	>
		<div class="relative w-full h-min">
			<img
				src={country?.flags?.png}
				alt={'' + country?.name?.common + ' flag'}
				class="mx-auto  transition-colors duration-700 border-b-[1px]
			 border-b-light-mode-dark-gray border-opacity-20 dark:border-opacity-20 dark:border-b-any-white 
			 object-top object-fit w-full h-auto max-h-[12em] aspect-[13/8]"
			/>
		</div>
		<!-- Info -->
		<h1
			class=" px-4 text-left text-lg max-h-[2.5em] align-bottom md:leading-[1.125] xl:leading-normal"
		>
			{country?.name?.common || 'None'}
		</h1>
		<!-- Column 1 -->
		<ul class="grid grid-col-1 px-4">
			<li>
				<span>Population: </span>
				{'' + country?.population || 'None'}
			</li>
			<li>
				<span>Region: </span>
				{'' + country?.region || 'None'}
			</li>
			<li>
				<span>Capital: </span>
				{'' + country?.capital || 'None'}
			</li>
		</ul>
	</a>
</div>

<style>
	span {
		font-weight: 800;
	}
	h1 {
		font-weight: 800;
	}
</style>
