<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Swal from 'sweetalert2';

	let formIsSubmitting = false;

	let record = {
		id: 0,
		name: '',
		description: '',
		image_url: ''
	};

	const handleUpdateProject = async () => {
		formIsSubmitting = true;
		const { error } = await supabase
			.from('activity')
			.update({ name: record.name, description: record.description, image_url: record.image_url })
			.eq('id', $page.params.slug);
		goto(`/projects/view/${record.id}`);
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
	});
</script>

<section class="pb-10">
	<div class="text-sm mt-3 breadcrumbs">
		<ul>
			<li><a href="/">All Projects</a></li>
			<li>Edit Project</li>
		</ul>
	</div>
	<div class="flex justify-between">
		<h1 class="text-2xl font-semibold mt-3">Edit project</h1>
	</div>
</section>
{#if record?.id}
	<section>
		<form on:submit|preventDefault={handleUpdateProject}>
			<div class="form-control mb-3 w-full">
				<label class="label" for="name">
					<span class="label-text">Project name</span>
				</label>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Project name"
					bind:value={record.name}
					class="input input-bordered w-full"
					required={true}
				/>
			</div>
			<div class="form-control mb-3 w-full">
				<label class="label" for="image_url">
					<span class="label-text">Image URL (optional)</span>
				</label>
				<input
					type="url"
					id="image_url"
					name="image_url"
					bind:value={record.image_url}
					placeholder="https://example.com/card-image.jpg"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="form-control mb-3 w-full">
				<label class="label" for="description">
					<span class="label-text">Description (optional)</span>
				</label>

				<textarea
					id="description"
					name="description"
					bind:value={record.description}
					class="textarea textarea-bordered"
					placeholder="Project description"
				/>
			</div>
			<div class="form-control mt-6">
				<button class="btn btn-primary" disabled={formIsSubmitting}>Save Changes</button>
				<a href="/projects/view/{record.id}" role="button" class="btn btn-secondary mt-3">Cancel</a>
			</div>
		</form>
	</section>
{/if}
