<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import Navbar from '$lib/sections/Navbar.svelte';
</script>

<section id="layout" class="">
	<div>
		<Navbar />
		<!-- <ModalForm /> -->
		<main>
			<slot />
		</main>
		<Footer />
	</div>
</section>

<style is:global>
	:root {
		--accent: 73, 255, 179;
		--accent-gradient: linear-gradient(45deg, rgb(var(--accent)), #052f46 30%, white 60%);
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	html {
		font-family: 'Montserrat', sans-serif;
		background: linear-gradient(180deg, #052f46 0%, #1e253d 100%), #302c42;
		color: #fff;
		scroll-behavior: smooth;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	code {
		font-family:
			Menlo,
			Monaco,
			Lucida Console,
			Liberation Mono,
			DejaVu Sans Mono,
			Bitstream Vera Sans Mono,
			Courier New,
			monospace;
	}
	main {
		margin: 21px;
	}

	@media screen and (min-width: 600px) {
		main {
			margin: 81px;
			max-width: 1655px;
		}
	}
	@media screen and (min-width: 1800px) {
		main {
			margin: auto;
		}
	}
</style>
