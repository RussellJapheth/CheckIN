<script>
	import { onMount } from 'svelte';

	import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';

	// Basic styles
	import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

	// Additional styles
	import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
	// import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';
	import { writable } from 'svelte/store';

	export let dates = writable([]);
	const initCalendar = () => {
		const calendar = new VanillaCalendar('#calendar', {
			type: 'default',
			settings: {
				visibility: {
					theme: 'light'
				},
				selected: {
					dates: [...$dates]
				}
			}
		});
		calendar.init();
	};

	onMount(() => {
		initCalendar();
	});

	$: $dates, initCalendar();
</script>

<section class="mt-10 w-full">
	<div style="min-width: 100% !important;" id="calendar" />
</section>
