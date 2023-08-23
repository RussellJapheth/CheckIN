<script>
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	(async () => {
		const { error } = await supabase.auth.signOut();
		goto('/auth/sign-in');
	})();
</script>
