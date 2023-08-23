<script>
	import '../app.css';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let ready = false;

	const initApp = async () => {
		ready = false;
		const { data, error } = await supabase.auth.getSession();

		if (
			browser &&
			!data.session &&
			$page.url.pathname !== '/auth/sign-in' &&
			$page.url.pathname !== '/auth/sign-up' &&
			$page.url.pathname !== '/auth/verify'
		) {
			console.log(
				'we are running in the browser, not signed in, and not on the sign in page, we are going to the sign in page'
			);
			ready = false;
			goto('/auth/sign-in');
		} else if (
			browser &&
			data.session &&
			($page.url.pathname === '/auth/sign-in' ||
				$page.url.pathname === '/auth/sign-up' ||
				$page.url.pathname === '/auth/verify')
		) {
			console.log(
				'we are running in the browser, signed in, and on the sign in page, we are going to the home page'
			);
			goto('/');
		}
		ready = true;
	};

	onMount(async () => {
		initApp();
	});

	$: $page.url.pathname,
		() => {
			initApp();
		};
</script>

{#if ready}
	{#if !$page.url.pathname.includes('/auth') && ready}
		<Navbar />
	{/if}

	<div hidden={!ready} class:p-10={!$page.url.pathname.includes('/auth')}>
		<slot />
	</div>
{/if}
