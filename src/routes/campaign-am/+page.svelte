<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import content from './content.md?raw';
</script>

<!-- <img src="/campaign/banner-1.png" alt="" /> -->
<div class="prose prose-invert prose-a:text-cyan-700 lg:prose-xl mx-auto mb-10">
	{@html marked(content)}
</div>
