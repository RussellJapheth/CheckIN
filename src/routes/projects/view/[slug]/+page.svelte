<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Calendar from './Calendar.svelte';
	import { writable } from 'svelte/store';
	import Swal from 'sweetalert2';

	/**
	 * @type {{image_url: string, name: string, description: string, id: number}}
	 */
	let record;

	let isMarking = false;
	let todayCompleted = false;
	let today = new Date().toISOString().split('T')[0];
	let dates = writable([]);

	const handleDeleteProject = async () => {
		Swal.fire({
			title: 'Delete project',
			text: 'Are you sure you want to delete this project?',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel'
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase.from('activity').delete().eq('id', $page.params.slug);
				if (!error) {
					goto('/');
				}
			}
		});
	};

	onMount(async () => {
		let userData = await supabase.auth.getSession();

		if (!userData?.data?.session) {
			goto('/auth/login');
			return;
		}

		let res = await supabase
			.from('activity')
			.select()
			.eq('id', $page.params.slug)
			.eq('owner', userData?.data?.session?.user?.id);

		if (!res?.data?.length) {
			goto('/');
			return;
		}

		record = res.data[0];

		let log_res = await supabase
			.from('activity_log')
			.select('stamp')
			.eq('activity', $page.params.slug);

		if (log_res?.data?.length) {
			$dates = log_res.data.map((entry) => entry.stamp);
			todayCompleted = $dates[$dates.length - 1] === today;
		}
	});
</script>

<section class="pb-10">
	<div class="text-sm mt-3 breadcrumbs">
		<ul>
			<li><a href="/">All Projects</a></li>
			<li>View Project</li>
		</ul>
	</div>
	<div class="flex justify-between">
		<h1 class="text-2xl font-semibold mt-3">View project</h1>
	</div>
</section>
{#if record}
	<section>
		<div class="card w-full bg-base-100 shadow-xl image-full">
			{#if record.image_url !== ''}
				<figure>
					<img src={record.image_url} alt={record.name} />
				</figure>
			{/if}
			<div class="card-body">
				<h2 class="card-title text-3xl">{record.name}</h2>
				<p>{record.description}</p>
				<div class="card-actions justify-between">
					<a
						href="/projects/archive/{record.id}"
						on:click|preventDefault={handleDeleteProject}
						class="btn btn-sm md:btn-md btn-warning">Delete</a
					>
					<a href="/projects/edit/{$page.params.slug}" class="btn btn-sm md:btn-md btn-primary"
						>Edit Project</a
					>
				</div>
			</div>
		</div>
	</section>
	<Calendar {dates} />
	<section class="mt-10 grid justify-end items-end">
		<button
			on:click={async () => {
				isMarking = true;
				const res = await supabase
					.from('activity_log')
					.upsert({ stamp: today, activity: $page.params.slug });
				$dates.push(today);
				$dates = $dates;
				todayCompleted = true;
			}}
			class="btn btn-primary"
			disabled={isMarking || todayCompleted}
			>{todayCompleted ? 'Today Completed' : 'Mark today completed'}</button
		>
	</section>
{/if}
