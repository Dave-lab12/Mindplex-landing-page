<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const roadmap = data.navigationData;
	const roadmapContent = data.contentData;
	const filteredContent = roadmapContent[0]?.steps;
	const active = data.active;

	const colorMapping = {
		'2023': {
			text: '#83E9FF',
			bg: '#83E9FF',
			boxColors: ['#529890', '#62AABA']
		},
		'2024': {
			text: '#EE83FF',
			bg: '#EE83FF',
			boxColors: ['#904490', '#A562BA']
		},
		'2025': {
			text: '#5BFFB0',
			bg: '#5BFFB0',
			boxColors: ['#529062', '#62BA90']
		},
		'2026': {
			text: '#FFB05B',
			bg: '#FFB05B',
			boxColors: ['#905290', '#BA62AA']
		}
	};

	const getYear = (slug: string) => slug.split('_')[1];
</script>

<section class="roadmap my-32 mx-6">
	<div class="relative w-full">
		<img alt="line" src="/3-version-line.svg" class="w-full" />
		<div class="absolute -top-10 flex flex-row justify-evenly w-full md:-top-14">
			{#each roadmap as { slug, name }}
				{@const year = getYear(slug)}
				{@const colors = colorMapping[year]}
				<div class="flex flex-col items-center">
					<div>
						<h3 class="text-xs w-full sm:text-sm md:text-3xl" style:color={colors?.text}>
							{name}
						</h3>
					</div>
					<a href={`/roadmap/${slug}`} rel="external">
						<div
							class="w-14 h-14 rounded-full opacity-20 relative"
							style:background-color={colors?.bg}
						></div>
						<div
							class="w-8 h-8 absolute top-7 ml-3 rounded-full md:top-12"
							style:background-color={colors?.bg}
							style:opacity={slug === active ? '1' : '0.25'}
						></div>
					</a>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<h1 class="text-4xl mt-20 text-center" style:color={colorMapping[getYear(active)]?.text}>
			{roadmapContent[0].description?.trim()}
		</h1>
	</div>

	{#each filteredContent as { content_title, desc }, index}
		<div class="flex flex-row mb-6 w-full mt-12 gap-4 md:gap-28 lg:gap-36">
			<div
				class="py-5 px-2 rounded-xl text-center text-xs sm:px-8 sm:text-sm w-[251px] lg:w-[985px] md:text-2xl lg:px-20"
				style:background-color={colorMapping[getYear(active)]?.boxColors[index % 2]}
			>
				{content_title}
			</div>

			<div class="w-full flex flex-row gap-4 lg:gap-10">
				<div
					class="min-w-[8px] rounded-2xl sm:min-w-[15px]"
					style:background-color={colorMapping[getYear(active)]?.text}
				></div>
				<p class="w-full text-xs sm:text-sm sm:w-fit md:text-2xl">
					{@html desc}
				</p>
			</div>
		</div>
	{/each}
</section>
