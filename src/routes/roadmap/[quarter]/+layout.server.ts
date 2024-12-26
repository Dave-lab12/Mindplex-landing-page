import { PUBLIC_ROADMAP_URL } from '$env/static/public'
import type { LayoutServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
    const roadmap = await fetch(PUBLIC_ROADMAP_URL)
    const roadmapData = await roadmap.json()
    const { quarter }: any = params

    const roadmaps = roadmapData.roadmaps.sort((a: any, b: any) => {
        // Extract year and quarter
        const [aQ, aY] = a.slug.split('_').reverse()
        const [bQ, bY] = b.slug.split('_').reverse()

        // Compare years first
        if (aY !== bY) return Number(bY) - Number(aY)

        // If same year, compare quarters
        return Number(aQ.replace('q', '')) - Number(bQ.replace('q', ''))
    });


    let contentData = roadmaps.filter((item: { slug: string | undefined }) =>
        item.slug && item.slug.includes(quarter)
    );

    // If no roadmap found for the requested quarter, find the nearest past roadmap
    if (!contentData.length) {
        const [q, y] = quarter.split('_').reverse();
        const targetYear = Number(y);
        const targetQuarter = Number(q.replace('q', ''));

        // Sort roadmaps by year and quarter in descending order
        const sortedRoadmaps = [...roadmaps].sort((a, b) => {
            const [aQ, aY] = a.slug.split('_').reverse();
            const [bQ, bY] = b.slug.split('_').reverse();
            const yearDiff = Number(bY) - Number(aY);
            if (yearDiff !== 0) return yearDiff;
            return Number(bQ.replace('q', '')) - Number(aQ.replace('q', ''));
        });

        // Find the first roadmap that's before our target date
        const nearestRoadmap = sortedRoadmaps.find(item => {
            const [itemQ, itemY] = item.slug.split('_').reverse();
            const itemYear = Number(itemY);
            const itemQuarter = Number(itemQ.replace('q', ''));

            return (itemYear < targetYear) ||
                (itemYear === targetYear && itemQuarter < targetQuarter);
        });

        if (nearestRoadmap) {
            throw redirect(307, `/roadmap/${nearestRoadmap.slug}`);
        } else {
            // If no past roadmap found, redirect to the oldest available roadmap
            const oldestRoadmap = sortedRoadmaps[sortedRoadmaps.length - 1];
            throw redirect(307, `/roadmap/${oldestRoadmap.slug}`);
        }
    }


    let navigationData = roadmaps.slice(0, 3).map((item: any) => {
        if (item.slug.includes('2023')) {
            return {
                ...item,
                background_color: '#83E9FF',
                color: '#83E9FF'
            };
        } else if (item.slug.includes('2024')) {
            return {
                ...item,
                background_color: '#EE83FF',
                color: '#EE83FF'
            };
        } else if (item.slug.includes('2025')) {
            return {
                ...item,
                background_color: '#5BFFB0',
                color: '#5BFFB0'
            };
        } else {
            return {
                ...item,
                background_color: '#5BFFB0',
                color: '#5BFFB0'
            };
        }
    });


    const active = contentData[0].slug;

    return { navigationData, contentData, active };
}) satisfies LayoutServerLoad;