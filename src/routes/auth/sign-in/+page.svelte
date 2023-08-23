<script>
	import { supabase } from '$lib/supabase';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';

	let formData = {
		email: '',
		password: ''
	};

	let formIsSubmitting = false;

	const handleSignIn = async () => {
		formIsSubmitting = true;
		const { data, error } = await supabase.auth.signInWithPassword(formData);
		if (data?.user) {
			goto('/');
		} else {
			Swal.fire({
				title: 'Error!',
				text: error?.message ?? 'Insert unhelpful default error message',
				icon: 'error'
			});
		}
		formIsSubmitting = false;
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Sign in now!</h1>
			<p class="py-6">
				"Stay consistent, track your progress, and build unbreakable streaks. Log in to keep the
				momentum going!".
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form on:submit|preventDefault={handleSignIn}>
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							type="email"
							required={true}
							name="email"
							id="email"
							bind:value={formData.email}
							placeholder="Email"
							class="input input-bordered"
						/>
					</div>
					<div class="form-control">
						<label class="label" for="password">
							<span class="label-text">Password</span>
						</label>
						<input
							type="password"
							name="password"
							id="password"
							bind:value={formData.password}
							placeholder="password"
							class="input input-bordered"
						/>
						<span class="label">
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="javascript:alert('Now now now? 🙄');" class="label-text-alt link link-hover"
								>Forgot password?</a
							>
						</span>
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary" disabled={formIsSubmitting}>Sign In</button>
						<a href="/auth/sign-up" role="button" class="btn btn-secondary mt-3">Sign Up</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
