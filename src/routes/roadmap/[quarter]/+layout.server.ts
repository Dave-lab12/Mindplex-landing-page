import { PUBLIC_ROADMAP_URL } from '$env/static/public';
import type { LayoutServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
    const roadmap = await fetch(PUBLIC_ROADMAP_URL);
    const roadmapData = await roadmap.json();
    const { quarter }: any = params;

    // Sort roadmaps chronologically
    const roadmaps = roadmapData.roadmaps.sort((a: any, b: any) => {
        const [aQ, aY] = a.slug.split('_');
        const [bQ, bY] = b.slug.split('_');
        const yearDiff = Number(aY) - Number(bY);
        if (yearDiff !== 0) return yearDiff;
        return Number(aQ.replace('q', '')) - Number(bQ.replace('q', ''));
    });

    const currentIndex = roadmaps.findIndex(r => r.slug === quarter);
    if (!roadmaps.find(r => r.slug === quarter)) {
        throw redirect(307, `/roadmap/${roadmaps[roadmaps.length - 1].slug}`);
    }
    let navigationData = [];

    if (currentIndex <= 1) {
        navigationData = roadmaps.slice(0, 4);
    }
    else if (currentIndex >= roadmaps.length - 2) {
        navigationData = roadmaps.slice(-4);
    }
    else {
        navigationData = roadmaps.slice(currentIndex - 1, currentIndex + 3);
    }

    let contentData = [roadmaps[currentIndex]];
    const active = quarter;

    return { navigationData, contentData, active };
}) satisfies LayoutServerLoad;