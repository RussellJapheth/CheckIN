<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	let formIsSubmitting = false;

	const formData = {
		name: '',
		description: '',
		owner: '',
		image_url: ''
	};

	const handleSubmit = async () => {
		formIsSubmitting = true;

		let userData = await supabase.auth.getSession();

		if (!userData?.data?.session) {
			goto('/auth/login');
		}

		formData.owner = userData?.data?.session?.user?.id ?? '';

		const { data, error } = await supabase.from('activity').insert([formData]).select();
		goto('/');
	};
</script>

<section class="pb-10">
	<div class="text-sm mt-3 breadcrumbs">
		<ul>
			<li><a href="/">Home</a></li>
			<li>New Project</li>
		</ul>
	</div>
	<div class="flex justify-between">
		<h1 class="text-2xl font-semibold mt-3">Add new project</h1>
	</div>
</section>
<section>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-control mb-3 w-full">
			<label class="label" for="name">
				<span class="label-text">Project name</span>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="Project name"
				bind:value={formData.name}
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
				bind:value={formData.image_url}
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
				bind:value={formData.description}
				class="textarea textarea-bordered"
				placeholder="Project description"
			/>
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-primary" disabled={formIsSubmitting}>Create Project</button>
			<a href="/" role="button" class="btn btn-secondary mt-3">Cancel</a>
		</div>
	</form>
</section>
