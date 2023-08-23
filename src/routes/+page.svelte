<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let records;

	onMount(async () => {
		let userData = await supabase.auth.getSession();

		if (!userData?.data?.session) {
			goto('/auth/login');
		}

		const { data, error } = await supabase
			.from('activity')
			.select()
			.eq('owner', userData?.data?.session?.user?.id);

		records = data;
	});
</script>

<section class="pb-10">
	<div class="text-sm mt-3 breadcrumbs">
		<ul>
			<li>Home</li>
		</ul>
	</div>
	<div class="flex justify-between">
		<h1 class="text-3xl font-bold underline">Projects</h1>
		<a href="/projects/create" class="btn btn-sm md:btn-md btn-accent">New Project</a>
	</div>
</section>
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
	{#if !records?.length}
		<p>You don't got no projects fam!</p>
	{:else}
		{#each records as entry}
			<div class="card w-full max-w-md bg-base-100 shadow-xl image-full">
				{#if entry.image_url !== ''}
					<figure>
						<img src={entry.image_url} alt={entry.name} />
					</figure>
				{/if}
				<div class="card-body">
					<h2 class="card-title text-3xl">{entry.name}</h2>
					<p>{entry.description}</p>
					<div class="card-actions justify-end">
						<a href="/projects/view/{entry.id}" class="btn btn-primary">View</a>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</section>
