<script>
	import md5 from 'blueimp-md5';
	import { supabase } from '$lib/supabase';
</script>

<div class="navbar bg-secondary">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-secondary-content text-xl">CheckIN</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div tabindex="0" class="btn btn-ghost btn-circle avatar">
				{#await supabase.auth.getSession() then res}
					<div class="w-10 rounded-full">
						<img
							alt="Your gravatar"
							src="https://www.gravatar.com/avatar/{md5(res.data?.session?.user?.email)}.jpg"
						/>
					</div>
				{/await}
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-secondary-content rounded-box w-52"
			>
				<li><a href="/auth/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>
