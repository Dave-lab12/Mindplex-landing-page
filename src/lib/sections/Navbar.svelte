<script>
	import GlowingBtn from '$lib/ui/GlowingBtn.svelte';
	import { page } from '$app/stores';
	import { Dialog, Separator, Label } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/Modal/ModalForm.svelte';
</script>

<nav class="flex justify-between items-center gap-6 p-4 flex-col lg:flex-row">
	<div class="mindplex__logo">
		<a href="/">
			<img src="/logo.svg" alt="Mindplex" class="w-36 md:w-64" />
		</a>
	</div>
	<div class="navbar_center flex flex-wrap flex-1 max-w-2xl justify-between items-center gap-4">
		<a href="/#about" class="font-bold text-sm uppercase">About</a>
		<a href="/#ourAi" class="font-bold text-sm uppercase">Our Ai</a>
		<a href="/roadmap" class="font-bold text-sm uppercase active:underline"> Roadmap</a>
		<a href="/#mindplexTokens" class="font-bold text-sm uppercase"> Mindplex Tokens </a>
		<a href="/blog" class="font-bold text-sm uppercase">Blog</a>
		<a href="/#team" class="font-bold text-sm uppercase">Team</a>
		<a href="https://docs.mindplex.ai" target="_blank" class="font-bold text-sm uppercase">
			White paper
		</a>
	</div>
	<div class="navbar_right flex justify-between items-center gap-4">
		<Dialog.Root>
			<Dialog.Trigger
				class="navbar_right_contact rounded-full text-sm px-4 w-52 py-2 outline outline-2 outline-white uppercase"
				>Contact us</Dialog.Trigger
			>
			<Modal />
		</Dialog.Root>

		<GlowingBtn
			text="Join Mindplex"
			href="https://magazine.mindplex.ai/?type=register&source=landingPage"
			fontSize="text-sm"
		/>
	</div>
</nav>
